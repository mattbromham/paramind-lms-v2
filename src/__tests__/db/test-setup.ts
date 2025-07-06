import { Client } from 'pg';

export async function setupTestDb() {
  const dbUrl =
    process.env.SUPABASE_DB_URL ||
    'postgresql://postgres:postgres@localhost:54322/postgres';
  const db = new Client({
    connectionString: dbUrl,
  });

  try {
    await db.connect();
    console.log('✅ Database connection successful');

    // Test basic query
    const result = await db.query('SELECT version()');
    console.log('✅ Database version:', result.rows[0].version);

    // Check if core schema migration has been applied
    const tablesResult = await db.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema='public' AND table_name IN ('users', 'lessons', 'nodes', 'attempts', 'sr_cards', 'badges')
      ORDER BY table_name;
    `);

    console.log(
      '✅ Core tables found:',
      tablesResult.rows.map((r) => r.table_name)
    );

    return db;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

export async function teardownTestDb(db: Client) {
  if (db) {
    await db.end();
    console.log('✅ Database connection closed');
  }
}
