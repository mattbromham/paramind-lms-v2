-- Migration: Core Schema for Paramind LMS
-- Tables: users, lessons, nodes, attempts, sr_cards, badges
-- Features: Proper constraints, foreign keys, indexes, triggers, RLS enabled

-- Enable pgcrypto extension (no-op if exists)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

-- ====================================
-- Shared trigger function for updated_at
-- ====================================
CREATE OR REPLACE FUNCTION _core_timestamps() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

-- ====================================
-- 1. users table
-- ====================================
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE NOT NULL,
  display_name text NOT NULL CHECK (length(display_name) BETWEEN 3 AND 60),
  role text DEFAULT 'learner' CHECK (role IN ('learner', 'tutor', 'admin')),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  
  -- Foreign key to auth.users
  CONSTRAINT fk_users_auth_id FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add trigger for automatic updated_at
CREATE TRIGGER users_updated_at_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION _core_timestamps();

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 2. lessons table
-- ====================================
CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL CHECK (length(slug) <= 60),
  title text NOT NULL,
  duration_estimate_min integer CHECK (duration_estimate_min > 0),
  content_md text,
  last_updated timestamptz DEFAULT NOW(),
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Add trigger for automatic updated_at
CREATE TRIGGER lessons_updated_at_trigger
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION _core_timestamps();

-- Enable RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 3. nodes table
-- ====================================
CREATE TABLE nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  lesson_id uuid UNIQUE,
  cluster_slug text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  
  -- Foreign key to lessons (1-to-1 relationship)
  CONSTRAINT fk_nodes_lesson_id FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Add indexes
CREATE INDEX idx_nodes_cluster_slug ON nodes (cluster_slug);
CREATE INDEX idx_nodes_lesson_id ON nodes (lesson_id);

-- Add trigger for automatic updated_at
CREATE TRIGGER nodes_updated_at_trigger
  BEFORE UPDATE ON nodes
  FOR EACH ROW
  EXECUTE FUNCTION _core_timestamps();

-- Enable RLS
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 4. attempts table
-- ====================================
CREATE TABLE attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id uuid NOT NULL,
  score numeric(5,2) CHECK (score BETWEEN 0 AND 1),
  passed boolean GENERATED ALWAYS AS (score >= 0.80) STORED,
  completed_at timestamptz DEFAULT NOW(),
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  
  -- Foreign keys
  CONSTRAINT fk_attempts_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_attempts_lesson_id FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Add indexes
CREATE INDEX idx_attempts_user_lesson ON attempts (user_id, lesson_id);
CREATE INDEX idx_attempts_lesson_id ON attempts (lesson_id);

-- Add trigger for automatic updated_at
CREATE TRIGGER attempts_updated_at_trigger
  BEFORE UPDATE ON attempts
  FOR EACH ROW
  EXECUTE FUNCTION _core_timestamps();

-- Enable RLS
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 5. sr_cards table
-- ====================================
CREATE TABLE sr_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  node_id uuid NOT NULL,
  front text NOT NULL,
  back text NOT NULL,
  ease float4 DEFAULT 2.5,
  stability float4 DEFAULT 0,
  due_at timestamptz,
  suspended boolean DEFAULT FALSE,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  
  -- Foreign keys
  CONSTRAINT fk_sr_cards_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_sr_cards_node_id FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
);

-- Add indexes
CREATE INDEX idx_sr_cards_user_due ON sr_cards (user_id, due_at);
CREATE INDEX idx_sr_cards_node_id ON sr_cards (node_id);

-- Add trigger for automatic updated_at
CREATE TRIGGER sr_cards_updated_at_trigger
  BEFORE UPDATE ON sr_cards
  FOR EACH ROW
  EXECUTE FUNCTION _core_timestamps();

-- Enable RLS
ALTER TABLE sr_cards ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 6. badges table
-- ====================================
CREATE TABLE badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Add trigger for automatic updated_at
CREATE TRIGGER badges_updated_at_trigger
  BEFORE UPDATE ON badges
  FOR EACH ROW
  EXECUTE FUNCTION _core_timestamps();

-- Enable RLS
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- ====================================
-- 7. Utility functions
-- ====================================
-- Ping function for health checks
CREATE OR REPLACE FUNCTION ping() RETURNS TEXT
LANGUAGE SQL STABLE AS $$
  SELECT 'pong';
$$;

COMMIT;

-- ====================================
-- DOWN MIGRATION (for rollback)
-- ====================================
-- 
-- BEGIN;
-- DROP TABLE IF EXISTS badges CASCADE;
-- DROP TABLE IF EXISTS sr_cards CASCADE;
-- DROP TABLE IF EXISTS attempts CASCADE;
-- DROP TABLE IF EXISTS nodes CASCADE;
-- DROP TABLE IF EXISTS lessons CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP FUNCTION IF EXISTS _core_timestamps();
-- COMMIT; 