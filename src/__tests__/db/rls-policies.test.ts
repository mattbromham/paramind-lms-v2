import { Client } from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Row-Level Security (RLS) Policies Tests', () => {
  let db: Client;
  let testUserId: string;
  let testLessonId: string;

  beforeAll(async () => {
    // Initialize database connection
    const dbUrl =
      process.env.SUPABASE_DB_URL ||
      'postgresql://postgres:postgres@localhost:54322/postgres';
    db = new Client({
      connectionString: dbUrl,
    });

    try {
      await db.connect();
      console.log('Connected to database for RLS testing');

      // Setup test data
      await setupTestData();
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  });

  afterAll(async () => {
    // Cleanup test data
    await cleanupTestData();
    if (db) {
      await db.end();
    }
  });

  async function setupTestData() {
    // Create test auth user
    await db.query(`
      INSERT INTO auth.users (id, email) VALUES 
      ('550e8400-e29b-41d4-a716-446655440001', 'test-user@example.com')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Create test user
    const userResult = await db.query(`
      INSERT INTO users (auth_id, display_name) 
      VALUES ('550e8400-e29b-41d4-a716-446655440001', 'Test User')
      ON CONFLICT (auth_id) DO NOTHING
      RETURNING id;
    `);
    testUserId = userResult.rows[0]?.id;

    // Create test lesson
    const lessonResult = await db.query(`
      INSERT INTO lessons (slug, title) 
      VALUES ('test-lesson-rls', 'Test Lesson RLS')
      ON CONFLICT (slug) DO NOTHING
      RETURNING id;
    `);
    testLessonId = lessonResult.rows[0]?.id;

    // Create test node
    await db.query(
      `
      INSERT INTO nodes (slug, title, lesson_id) 
      VALUES ('test-node-rls', 'Test Node RLS', $1)
      ON CONFLICT (slug) DO NOTHING;
    `,
      [testLessonId]
    );
  }

  async function cleanupTestData() {
    try {
      // Clean up in reverse order due to foreign key constraints
      await db.query(`DELETE FROM sr_cards WHERE user_id = $1`, [testUserId]);
      await db.query(`DELETE FROM attempts WHERE user_id = $1`, [testUserId]);
      await db.query(`DELETE FROM nodes WHERE slug = 'test-node-rls'`);
      await db.query(`DELETE FROM lessons WHERE slug = 'test-lesson-rls'`);
      await db.query(
        `DELETE FROM users WHERE auth_id = '550e8400-e29b-41d4-a716-446655440001'`
      );
      await db.query(
        `DELETE FROM auth.users WHERE id = '550e8400-e29b-41d4-a716-446655440001'`
      );
    } catch (error) {
      console.warn('Cleanup failed:', error);
    }
  }

  describe('RLS Policy Existence', () => {
    it('should have RLS policies defined for all tables', async () => {
      const result = await db.query(`
        SELECT schemaname, tablename, policyname, cmd
        FROM pg_policies 
        WHERE schemaname = 'public'
        ORDER BY tablename, policyname;
      `);

      type PolicyInfo = { name: string; cmd: string };
      const policies: Record<string, PolicyInfo[]> = result.rows.reduce(
        (acc, row) => {
          if (!acc[row.tablename]) acc[row.tablename] = [];
          acc[row.tablename].push({ name: row.policyname, cmd: row.cmd });
          return acc;
        },
        {} as Record<string, PolicyInfo[]>
      );

      // Verify users policies
      expect(policies.users).toHaveLength(2);
      expect(
        policies.users.some(
          (p: PolicyInfo) => p.name === 'users_select_own' && p.cmd === 'SELECT'
        )
      ).toBe(true);
      expect(
        policies.users.some(
          (p: PolicyInfo) => p.name === 'users_update_own' && p.cmd === 'UPDATE'
        )
      ).toBe(true);

      // Verify nodes policies
      expect(policies.nodes).toHaveLength(1);
      expect(
        policies.nodes.some(
          (p: PolicyInfo) => p.name === 'nodes_read' && p.cmd === 'SELECT'
        )
      ).toBe(true);

      // Verify lessons policies
      expect(policies.lessons).toHaveLength(1);
      expect(
        policies.lessons.some(
          (p: PolicyInfo) => p.name === 'lessons_read' && p.cmd === 'SELECT'
        )
      ).toBe(true);

      // Verify attempts policies
      expect(policies.attempts).toHaveLength(2);
      expect(
        policies.attempts.some(
          (p: PolicyInfo) =>
            p.name === 'attempts_owner_read' && p.cmd === 'SELECT'
        )
      ).toBe(true);
      expect(
        policies.attempts.some(
          (p: PolicyInfo) =>
            p.name === 'attempts_owner_insert' && p.cmd === 'INSERT'
        )
      ).toBe(true);

      // Verify sr_cards policies
      expect(policies.sr_cards).toHaveLength(3);
      expect(
        policies.sr_cards.some(
          (p: PolicyInfo) =>
            p.name === 'sr_cards_owner_read' && p.cmd === 'SELECT'
        )
      ).toBe(true);
      expect(
        policies.sr_cards.some(
          (p: PolicyInfo) =>
            p.name === 'sr_cards_owner_insert' && p.cmd === 'INSERT'
        )
      ).toBe(true);
      expect(
        policies.sr_cards.some(
          (p: PolicyInfo) =>
            p.name === 'sr_cards_owner_update' && p.cmd === 'UPDATE'
        )
      ).toBe(true);

      // Verify badges policies
      expect(policies.badges).toHaveLength(1);
      expect(
        policies.badges.some(
          (p: PolicyInfo) => p.name === 'badges_read' && p.cmd === 'SELECT'
        )
      ).toBe(true);
    });
  });

  describe('Anonymous User Access (Should be Blocked)', () => {
    it('should block anonymous access to all tables', async () => {
      const tables = [
        'users',
        'nodes',
        'lessons',
        'attempts',
        'sr_cards',
        'badges',
      ];

      for (const table of tables) {
        try {
          await db.query(`SET ROLE anon`);
          await expect(
            db.query(`SELECT COUNT(*) FROM ${table}`)
          ).rejects.toThrow('permission denied');
        } finally {
          await db.query(`RESET ROLE`);
        }
      }
    });

    it('should block anonymous insert attempts', async () => {
      const insertTests = [
        {
          table: 'users',
          query: `INSERT INTO users (auth_id, display_name) VALUES ('550e8400-e29b-41d4-a716-446655440099', 'Anon User')`,
        },
        {
          table: 'lessons',
          query: `INSERT INTO lessons (slug, title) VALUES ('anon-lesson', 'Anon Lesson')`,
        },
        {
          table: 'nodes',
          query: `INSERT INTO nodes (slug, title) VALUES ('anon-node', 'Anon Node')`,
        },
      ];

      for (const test of insertTests) {
        try {
          await db.query(`SET ROLE anon`);
          await expect(db.query(test.query)).rejects.toThrow();
        } finally {
          await db.query(`RESET ROLE`);
        }
      }
    });
  });

  describe('Policy Configuration', () => {
    it('should have auth.uid() function available', async () => {
      // Test that the auth.uid() function exists and can be called
      const result = await db.query(`SELECT auth.uid() as uid`);
      expect(result.rows).toHaveLength(1);
      // In local testing without proper JWT, auth.uid() returns null
      expect(result.rows[0].uid).toBeNull();
    });

    it('should have auth.role() function available', async () => {
      // Test that the auth.role() function exists and can be called
      const result = await db.query(`SELECT auth.role() as role`);
      expect(result.rows).toHaveLength(1);
      // In local testing, auth.role() returns null without proper JWT context
      expect(result.rows[0].role).toBeNull();
    });

    it('should block authenticated role without proper JWT context', async () => {
      try {
        await db.query(`SET ROLE authenticated`);
        await expect(db.query(`SELECT COUNT(*) FROM users`)).rejects.toThrow(
          'permission denied'
        );
      } finally {
        await db.query(`RESET ROLE`);
      }
    });
  });

  describe('RLS Policy Behavior', () => {
    it('should validate policy expressions contain proper auth functions', async () => {
      const result = await db.query(`
        SELECT policyname, qual, with_check
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'users'
        ORDER BY policyname;
      `);

      expect(result.rows).toHaveLength(2);

      // Check that policies reference auth.uid()
      const selectPolicy = result.rows.find(
        (r) => r.policyname === 'users_select_own'
      );
      expect(selectPolicy?.qual).toContain('auth.uid()');

      const updatePolicy = result.rows.find(
        (r) => r.policyname === 'users_update_own'
      );
      expect(updatePolicy?.qual).toContain('auth.uid()');
      expect(updatePolicy?.with_check).toContain('auth.uid()');
    });

    it('should validate global read policies use auth.role()', async () => {
      const result = await db.query(`
        SELECT policyname, qual
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'nodes'
        ORDER BY policyname;
      `);

      expect(result.rows).toHaveLength(1);
      const readPolicy = result.rows[0];
      expect(readPolicy.policyname).toBe('nodes_read');
      expect(readPolicy.qual).toContain('auth.role()');
      expect(readPolicy.qual).toContain('authenticated');
    });
  });

  describe('Database Security Configuration', () => {
    it('should have proper privilege revocation', async () => {
      // Test that the REVOKE statements in the migration worked
      const result = await db.query(`
        SELECT grantee, privilege_type, is_grantable
        FROM information_schema.table_privileges
        WHERE table_schema = 'public' AND table_name = 'users'
        AND grantee IN ('anon', 'authenticated')
        ORDER BY grantee, privilege_type;
      `);

      // Should have no explicit grants since we revoked all
      expect(result.rows).toHaveLength(0);
    });
  });
});
