-- Migration: Row-Level Security Policies for Core Tables
-- Implements minimum safe set policies for authenticated users
-- Revokes all access from anon role

BEGIN;

-- ====================================
-- Revoke all existing privileges to prevent privilege creep
-- ====================================
REVOKE ALL ON public.users FROM anon, authenticated;
REVOKE ALL ON public.nodes FROM anon, authenticated;
REVOKE ALL ON public.lessons FROM anon, authenticated;
REVOKE ALL ON public.attempts FROM anon, authenticated;
REVOKE ALL ON public.sr_cards FROM anon, authenticated;
REVOKE ALL ON public.badges FROM anon, authenticated;

-- ====================================
-- USERS TABLE POLICIES
-- ====================================
-- Users can select and update their own profile
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (id = auth.uid())
            WITH CHECK (id = auth.uid());

-- ====================================
-- NODES TABLE POLICIES
-- ====================================
-- Authenticated users can read all nodes (global content)
CREATE POLICY "nodes_read" ON public.nodes
  FOR SELECT USING (auth.role() = 'authenticated');

-- ====================================
-- LESSONS TABLE POLICIES
-- ====================================
-- Authenticated users can read all lessons (global content)
CREATE POLICY "lessons_read" ON public.lessons
  FOR SELECT USING (auth.role() = 'authenticated');

-- ====================================
-- ATTEMPTS TABLE POLICIES
-- ====================================
-- Users can only read and insert their own attempts
CREATE POLICY "attempts_owner_read" ON public.attempts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "attempts_owner_insert" ON public.attempts
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- ====================================
-- SR_CARDS TABLE POLICIES
-- ====================================
-- Users can read, insert, and update their own spaced repetition cards
CREATE POLICY "sr_cards_owner_read" ON public.sr_cards
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "sr_cards_owner_insert" ON public.sr_cards
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "sr_cards_owner_update" ON public.sr_cards
  FOR UPDATE USING (user_id = auth.uid())
            WITH CHECK (user_id = auth.uid());

-- ====================================
-- BADGES TABLE POLICIES
-- ====================================
-- Authenticated users can read all badges (global content)
CREATE POLICY "badges_read" ON public.badges
  FOR SELECT USING (auth.role() = 'authenticated');

COMMIT;
