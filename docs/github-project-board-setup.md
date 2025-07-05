# GitHub Projects Board Setup Guide

This guide provides the complete setup for the Paramind LMS project board based on the roadmap phases.

## Board Structure

### Columns

1. **📋 Backlog** - All tickets not yet started
2. **🔄 In Progress** - Currently active tickets (limit 3)
3. **👀 Review** - Completed tickets awaiting review
4. **✅ Done** - Completed and merged tickets

### Labels

- `phase-0` to `phase-11` - Phase identification
- `priority-high` - Critical path items
- `priority-medium` - Important but not blocking
- `priority-low` - Nice to have
- `bug` - Issues found during development
- `enhancement` - Improvements to existing features

## Ticket Creation Script

Copy and paste each ticket below into GitHub Issues:

### Phase 0 - Kick-off & Scope Freeze

```markdown
**[PHASE 0] Read & Clarify Brief**

- **Phase**: 0
- **Estimate**: 2h
- **Priority**: High
- **Description**: Summarise open questions, risk log; freeze MVP scope
- **Acceptance Criteria**:
  - [ ] Stakeholders sign scope baseline
  - [ ] Implementation brief document created
  - [ ] Risk assessment completed
```

```markdown
**[PHASE 0] Project Board Setup**

- **Phase**: 0
- **Estimate**: 30m
- **Priority**: High
- **Description**: Create GitHub Projects columns and populate with roadmap tickets
- **Acceptance Criteria**:
  - [ ] All tickets created and ordered
  - [ ] Project board configured with proper columns
```

### Phase 1 - Environment & CI/CD Skeleton

```markdown
**[PHASE 1] Repo Bootstrap**

- **Phase**: 1
- **Estimate**: 1h
- **Priority**: High
- **Description**: Init Vite-React-TS, Tailwind, Radix/Shadcn, ESLint/Prettier, Vitest, Lefthook
- **Acceptance Criteria**:
  - [ ] `pnpm dev` & `pnpm test` pass locally + CI
  - [ ] All linting and formatting tools configured
```

```markdown
**[PHASE 1] Supabase Client Setup**

- **Phase**: 1
- **Estimate**: 30m
- **Priority**: High
- **Dependencies**: Repo Bootstrap
- **Description**: `src/lib/supabase.ts` typed, env vars, SSR-safe
- **Acceptance Criteria**:
  - [ ] Import client in `main.tsx`; build OK
  - [ ] Environment variables configured
```

```markdown
**[PHASE 1] Auth Provider**

- **Phase**: 1
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Supabase Client Setup
- **Description**: Wrap app in `<SessionContextProvider>`; Sign-in/out buttons
- **Acceptance Criteria**:
  - [ ] Browser shows session state change
  - [ ] Login/logout functionality working
```

```markdown
**[PHASE 1] CI Baseline**

- **Phase**: 1
- **Estimate**: 30m
- **Priority**: High
- **Dependencies**: Auth Provider
- **Description**: GitHub Action: lint → test → vite build → Axe dummy page
- **Acceptance Criteria**:
  - [ ] Green tick on PR
  - [ ] All CI checks passing
```

### Phase 2 - Data Layer & Core Schema

```markdown
**[PHASE 2] DB Migrations**

- **Phase**: 2
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Auth Provider
- **Description**: Tables `users`, `nodes`, `lessons`, `attempts`, `sr_cards`, `badges`
- **Acceptance Criteria**:
  - [ ] `supabase db diff` clean
  - [ ] All required tables created
```

```markdown
**[PHASE 2] Row-Level Security**

- **Phase**: 2
- **Estimate**: 45m
- **Priority**: High
- **Dependencies**: DB Migrations
- **Description**: Add "minimum safe set" policies for role `authenticated`
- **Acceptance Criteria**:
  - [ ] Playwright: unauth user denied `/nodes`
  - [ ] RLS policies working correctly
```

```markdown
**[PHASE 2] React-Query Setup**

- **Phase**: 2
- **Estimate**: 45m
- **Priority**: High
- **Dependencies**: CI Baseline
- **Description**: TanStack Query provider, default stale times
- **Acceptance Criteria**:
  - [ ] Cache visible in dev-tools
  - [ ] Query provider configured
```

```markdown
**[PHASE 2] Data Hooks**

- **Phase**: 2
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: React-Query Setup
- **Description**: `useNodes()`, `useLesson(slug)` reading via RLS
- **Acceptance Criteria**:
  - [ ] Vitest mocks + live fetch succeed
  - [ ] Hooks working with proper types
```

### Phase 3 - Navigation, Settings & Search UX

```markdown
**[PHASE 3] Layout Shell**

- **Phase**: 3
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: CI Baseline
- **Description**: Navbar, footer, `<Outlet>`, light/dark responsive
- **Acceptance Criteria**:
  - [ ] Home route loads w/out 404
  - [ ] Theme switching works
```

```markdown
**[PHASE 3] Static Routes**

- **Phase**: 3
- **Estimate**: 30m
- **Priority**: High
- **Dependencies**: Layout Shell
- **Description**: `/`, `/review`, `/lesson/:slug`, `/settings`, `/glossary`
- **Acceptance Criteria**:
  - [ ] Navigation works
  - [ ] All routes accessible
```

```markdown
**[PHASE 3] Command Palette**

- **Phase**: 3
- **Estimate**: 45m
- **Priority**: Medium
- **Dependencies**: Static Routes
- **Description**: Shadcn Command (`Ctrl/⌘ K`), dummy data
- **Acceptance Criteria**:
  - [ ] Opens/closes; returns mock items
  - [ ] Keyboard shortcuts working
```

```markdown
**[PHASE 3] Settings Shell**

- **Phase**: 3
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Static Routes
- **Description**: Render `/settings` tabs (Account, Preferences, Notifications, Data). Persist user prefs table
- **Acceptance Criteria**:
  - [ ] Tabs load; toggles save
  - [ ] User preferences persisted
```

```markdown
**[PHASE 3] Glossary Index**

- **Phase**: 3
- **Estimate**: 45m
- **Priority**: Medium
- **Dependencies**: Static Routes
- **Description**: Build `/glossary` page list, search filter, hover-card component
- **Acceptance Criteria**:
  - [ ] Glossary page displays sample terms
  - [ ] Search and filter working
```

```markdown
**[PHASE 3] Search API & Palette**

- **Phase**: 3
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: Glossary Index
- **Description**: Supabase RPC search; wire into command palette
- **Acceptance Criteria**:
  - [ ] Palette returns live results ≤ 150ms
  - [ ] Search API functional
```

### Phase 4 - Skill-Tree Dashboard

```markdown
**[PHASE 4] Canvas Scaffold**

- **Phase**: 4
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Data Hooks
- **Description**: `<SkillTreeCanvas>` with React-Flow; static colours
- **Acceptance Criteria**:
  - [ ] Shows 10 seeded nodes
  - [ ] React Flow rendering correctly
```

```markdown
**[PHASE 4] Unlock Utility**

- **Phase**: 4
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Canvas Scaffold
- **Description**: `isUnlocked(node, completedSet)` + cluster logic
- **Acceptance Criteria**:
  - [ ] Vitest green
  - [ ] Prerequisite logic working
```

```markdown
**[PHASE 4] Node Click Navigation**

- **Phase**: 4
- **Estimate**: 30m
- **Priority**: High
- **Dependencies**: Unlock Utility
- **Description**: Click node → `/lesson/:slug`
- **Acceptance Criteria**:
  - [ ] Lesson renders slug
  - [ ] Navigation working
```

```markdown
**[PHASE 4] Progress Drawer**

- **Phase**: 4
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: Node Click Navigation
- **Description**: Per-branch % bars
- **Acceptance Criteria**:
  - [ ] Numbers update on mock
  - [ ] Progress visualization working
```

```markdown
**[PHASE 4] Dashboard A11y/Perf**

- **Phase**: 4
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Progress Drawer
- **Description**: 100 node render ≤ 120ms, contrast AA
- **Acceptance Criteria**:
  - [ ] Lighthouse ≥ 85 perf
  - [ ] Accessibility requirements met
```

### Phase 5 - Lesson Viewer Pipeline

```markdown
**[PHASE 5] Markdown Render**

- **Phase**: 5
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Node Click Navigation
- **Description**: `react-markdown`, code, image, glossary hover
- **Acceptance Criteria**:
  - [ ] Lesson MD renders
  - [ ] All content types supported
```

```markdown
**[PHASE 5] TOC Sidebar**

- **Phase**: 5
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Markdown Render
- **Description**: Generate from AST; live highlight
- **Acceptance Criteria**:
  - [ ] Scroll sync ≤ 5px drift
  - [ ] TOC navigation working
```

```markdown
**[PHASE 5] Inline Knowledge Checks**

- **Phase**: 5
- **Estimate**: 3h
- **Priority**: High
- **Dependencies**: TOC Sidebar
- **Description**: MCQ shuffle, scroll-lock until correct
- **Acceptance Criteria**:
  - [ ] State persists reload
  - [ ] All question types working
```

```markdown
**[PHASE 5] Progress Bar Stripe**

- **Phase**: 5
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: Inline Knowledge Checks
- **Description**: 3px sticky bar gated by completed checks
- **Acceptance Criteria**:
  - [ ] Jest DOM test
  - [ ] Progress tracking accurate
```

```markdown
**[PHASE 5] Completion Quiz Modal**

- **Phase**: 5
- **Estimate**: 3h
- **Priority**: High
- **Dependencies**: Progress Bar Stripe
- **Description**: ≥ 80% passes, stores `lesson_completed`
- **Acceptance Criteria**:
  - [ ] Playwright scenario passes
  - [ ] Quiz completion logic working
```

```markdown
**[PHASE 5] MediaPlayer Skin**

- **Phase**: 5
- **Estimate**: 2h
- **Priority**: Medium
- **Dependencies**: Markdown Render
- **Description**: Custom controls, captions, autoplay toggle
- **Acceptance Criteria**:
  - [ ] Axe passes
  - [ ] Media player accessible
```

```markdown
**[PHASE 5] Drag-and-Drop & Cloze Questions**

- **Phase**: 5
- **Estimate**: 1h 30m
- **Priority**: Medium
- **Dependencies**: Inline Knowledge Checks
- **Description**: Implement extra block types with accessible fallback
- **Acceptance Criteria**:
  - [ ] Playwright DnD & Cloze tests pass
  - [ ] Accessibility fallbacks working
```

```markdown
**[PHASE 5] Keyboard Shortcuts Layer**

- **Phase**: 5
- **Estimate**: 45m
- **Priority**: Medium
- **Dependencies**: Markdown Render
- **Description**: Add `N`, `P`, `K`, `Q`, `?` hotkeys & help modal
- **Acceptance Criteria**:
  - [ ] Axe + Jest shortcut tests pass
  - [ ] All shortcuts documented
```

### Phase 6 - Spaced-Repetition & Badges

```markdown
**[PHASE 6] FSRS Core**

- **Phase**: 6
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Completion Quiz Modal
- **Description**: Port algorithm; persist `srs_state`
- **Acceptance Criteria**:
  - [ ] Unit schedule test
  - [ ] FSRS algorithm working
```

```markdown
**[PHASE 6] Review Screen UI**

- **Phase**: 6
- **Estimate**: 4h
- **Priority**: High
- **Dependencies**: FSRS Core
- **Description**: Flip animation, hotkeys 1-4, confetti summary
- **Acceptance Criteria**:
  - [ ] Playwright hotkey test
  - [ ] Review interface complete
```

```markdown
**[PHASE 6] Badge Engine**

- **Phase**: 6
- **Estimate**: 2h
- **Priority**: Medium
- **Dependencies**: Review Screen UI
- **Description**: Edge cron awards streak/node/branch badges
- **Acceptance Criteria**:
  - [ ] Rows in `user_badges`
  - [ ] Badge awarding logic working
```

```markdown
**[PHASE 6] Review Slider & Streak Counter**

- **Phase**: 6
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: Review Screen UI
- **Description**: Add review-intensity slider and daily streak logic
- **Acceptance Criteria**:
  - [ ] Slider persists; streak badge ticks
  - [ ] Streak tracking accurate
```

```markdown
**[PHASE 6] Email Digest & Toggles**

- **Phase**: 6
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: Settings Shell, Review Screen UI
- **Description**: Daily reviews-due email via Postmark; user toggles
- **Acceptance Criteria**:
  - [ ] Scheduled job logs; opt-out works
  - [ ] Email system functional
```

### Phase 7 - Tutor Messaging & Instructor Analytics

```markdown
**[PHASE 7] Ask-Tutor Threads**

- **Phase**: 7
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Auth Provider
- **Description**: `/ask` button, thread list, reply form
- **Acceptance Criteria**:
  - [ ] Msg appears for tutor user
  - [ ] Messaging system working
```

```markdown
**[PHASE 7] Learner Analytics**

- **Phase**: 7
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Completion Quiz Modal
- **Description**: Node grid, attempt chart
- **Acceptance Criteria**:
  - [ ] Queries ≤ 500ms
  - [ ] Analytics dashboard functional
```

```markdown
**[PHASE 7] Aggregate Heat-map**

- **Phase**: 7
- **Estimate**: 2h
- **Priority**: Medium
- **Dependencies**: Learner Analytics
- **Description**: SQL view + d3 heatmap; cron refresh
- **Acceptance Criteria**:
  - [ ] Cron job logs success
  - [ ] Heat-map visualization working
```

```markdown
**[PHASE 7] CSV/Excel Data Export**

- **Phase**: 7
- **Estimate**: 45m
- **Priority**: Medium
- **Dependencies**: Learner Analytics
- **Description**: Instructor download of pseudonymised progress data
- **Acceptance Criteria**:
  - [ ] Downloaded file hashes verified
  - [ ] Export functionality working
```

### Phase 8 - Observability & Monitoring

```markdown
**[PHASE 8] Error Tracking**

- **Phase**: 8
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: CI Baseline
- **Description**: Sentry FE/BE; release tags
- **Acceptance Criteria**:
  - [ ] Events visible in dashboard
  - [ ] Error tracking operational
```

```markdown
**[PHASE 8] Structured Logs**

- **Phase**: 8
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Error Tracking
- **Description**: Pino JSON logs → CloudWatch
- **Acceptance Criteria**:
  - [ ] Log entry visible
  - [ ] Structured logging working
```

```markdown
**[PHASE 8] Grafana Dashboards**

- **Phase**: 8
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: Structured Logs
- **Description**: Uptime, p95 latency, CPU
- **Acceptance Criteria**:
  - [ ] Dashboard shared link live
  - [ ] Monitoring dashboards functional
```

```markdown
**[PHASE 8] Media Optimisation Pipeline**

- **Phase**: 8
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: CI Baseline
- **Description**: FFmpeg compress step in CI, upload size checks
- **Acceptance Criteria**:
  - [ ] ≥95% videos ≤ 50MB; CI passes
  - [ ] Media optimization working
```

### Phase 9 - Polish, QA & Compliance

```markdown
**[PHASE 9] Axe + Lighthouse Budgets**

- **Phase**: 9
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Badge Engine, Aggregate Heat-map
- **Description**: ≥ 90 a11y, ≥ 75 perf
- **Acceptance Criteria**:
  - [ ] CI budgets pass
  - [ ] Performance and accessibility targets met
```

```markdown
**[PHASE 9] Keyboard Audit**

- **Phase**: 9
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Axe + Lighthouse Budgets
- **Description**: Playwright tab-flow script
- **Acceptance Criteria**:
  - [ ] No focus traps
  - [ ] Keyboard navigation working
```

```markdown
**[PHASE 9] Error & Empty States**

- **Phase**: 9
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Axe + Lighthouse Budgets
- **Description**: 404, offline banner, 429 toast, no-due confetti
- **Acceptance Criteria**:
  - [ ] Manual QA passes
  - [ ] All error states handled
```

```markdown
**[PHASE 9] Data Purge Script**

- **Phase**: 9
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: DB Migrations
- **Description**: Cron job purges inactive >4y accounts; on-demand delete
- **Acceptance Criteria**:
  - [ ] Dry-run logs rows; manual test passes
  - [ ] Data purge system working
```

### Phase 10 - Pilot Beta

```markdown
**[PHASE 10] Seed Data**

- **Phase**: 10
- **Estimate**: 1h
- **Priority**: High
- **Dependencies**: Completion Quiz Modal
- **Description**: Insert 5 lessons + nodes
- **Acceptance Criteria**:
  - [ ] Canvas shows 5 start nodes
  - [ ] Sample content available
```

```markdown
**[PHASE 10] Feedback Capture**

- **Phase**: 10
- **Estimate**: 1h
- **Priority**: Medium
- **Dependencies**: Seed Data
- **Description**: Enable Sentry Session Replay; link Google Form
- **Acceptance Criteria**:
  - [ ] Events visible
  - [ ] Feedback system working
```

```markdown
**[PHASE 10] Triage Fixes**

- **Phase**: 10
- **Estimate**: 2h
- **Priority**: High
- **Dependencies**: Feedback Capture
- **Description**: Label `beta-fix`, close critical issues
- **Acceptance Criteria**:
  - [ ] All P0 bugs closed
  - [ ] Critical issues resolved
```

### Phase 11 - Launch Readiness & GA

```markdown
**[PHASE 11] DNS + SSL**

- **Phase**: 11
- **Estimate**: 30m
- **Priority**: High
- **Dependencies**: Grafana Dashboards
- **Description**: Point `app.paramindlms.com`, enable HTTPS
- **Acceptance Criteria**:
  - [ ] Browser green lock
  - [ ] Domain configuration complete
```

```markdown
**[PHASE 11] Legal Docs**

- **Phase**: 11
- **Estimate**: 30m
- **Priority**: High
- **Dependencies**: DNS + SSL
- **Description**: Replace `/privacy`, `/terms` stubs
- **Acceptance Criteria**:
  - [ ] Links 200 OK
  - [ ] Legal documents complete
```

```markdown
**[PHASE 11] Robots & Sitemap**

- **Phase**: 11
- **Estimate**: 30m
- **Priority**: Medium
- **Dependencies**: Legal Docs
- **Description**: Lessons `noindex`; marketing allow
- **Acceptance Criteria**:
  - [ ] Verified via robots tester
  - [ ] SEO configuration complete
```

```markdown
**[PHASE 11] Tag & Deploy**

- **Phase**: 11
- **Estimate**: 30m
- **Priority**: High
- **Dependencies**: Robots & Sitemap
- **Description**: Git tag `v1.0.0`; merge to `main`
- **Acceptance Criteria**:
  - [ ] Supabase prod shows banner
  - [ ] Production deployment complete
```

## Board Setup Instructions

1. **Create Project Board**
   - Go to GitHub repository
   - Click "Projects" tab
   - Click "New project"
   - Choose "Board" template
   - Name: "Paramind LMS Development"

2. **Configure Columns**
   - Add columns as specified above
   - Set Work in Progress limit for "In Progress" (3 items)

3. **Create Issues**
   - Copy each ticket template above
   - Create as GitHub Issues
   - Apply appropriate labels (phase, priority)
   - Add to project board in "Backlog" column

4. **Set Up Automation**
   - Configure auto-move rules:
     - When issue is assigned → move to "In Progress"
     - When PR is created → move to "Review"
     - When PR is merged → move to "Done"

5. **Configure Views**
   - Create filtered views by phase
   - Create priority-based views
   - Set up timeline view for milestone tracking

This setup provides complete traceability from roadmap to implementation with proper dependency tracking and progress visibility.
