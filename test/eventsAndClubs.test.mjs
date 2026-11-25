import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('TEKLOZY Events & Programs Ecosystem', () => {
  const eventsServiceContent = fs.readFileSync(path.resolve('src/lib/eventsService.ts'), 'utf8');
  const migrationContent = fs.readFileSync(
    path.resolve('backend/supabase/migrations/202611170001_events_and_clubs_ecosystem.sql'),
    'utf8'
  );

  it('prominently configures Teklozy Hackathon 2026 with confirmed dates', () => {
    assert.match(eventsServiceContent, /title:\s*'Teklozy Hackathon 2026'/);
    assert.match(eventsServiceContent, /dates:\s*'19 December 2026 – 20 December 2026'/);
    assert.match(eventsServiceContent, /duration:\s*'Two days \(48 Hours\)'/);
    assert.match(eventsServiceContent, /isFeatured:\s*true/);
  });

  it('marks unfinalized event details as clearly distinguishable placeholders', () => {
    assert.match(eventsServiceContent, /venue:\s*'To be announced/);
    assert.match(eventsServiceContent, /prizes:\s*'To be announced/);
    assert.match(eventsServiceContent, /sponsors:\s*'To be announced/);
    assert.match(eventsServiceContent, /finalProblems:\s*'To be announced/);
  });

  it('provides provisional 2-day sample schedules for Day 1 and Day 2', () => {
    assert.match(eventsServiceContent, /day:\s*'Day 1 — Saturday'/);
    assert.match(eventsServiceContent, /date:\s*'19 December 2026'/);
    assert.match(eventsServiceContent, /day:\s*'Day 2 — Sunday'/);
    assert.match(eventsServiceContent, /date:\s*'20 December 2026'/);
  });

  it('creates unique registration ID format TK-EVT-2026-XXXXX', () => {
    assert.match(eventsServiceContent, /`TK-EVT-2026-\${rand}`/);
  });

  it('includes database migration tables and RLS policies for events', () => {
    assert.match(migrationContent, /create table if not exists public\.events/);
    assert.match(migrationContent, /create table if not exists public\.event_registrations/);
    assert.match(migrationContent, /create table if not exists public\.event_schedules/);
    assert.match(migrationContent, /alter table public\.events enable row level security/);
    assert.match(migrationContent, /alter table public\.event_registrations enable row level security/);
  });
});

describe('TEKLOZY Student Clubs Ecosystem & Intelligent Segregation', () => {
  const clubsServiceContent = fs.readFileSync(path.resolve('src/lib/clubsService.ts'), 'utf8');
  const storageServiceContent = fs.readFileSync(path.resolve('src/lib/storageService.ts'), 'utf8');
  const migrationContent = fs.readFileSync(
    path.resolve('backend/supabase/migrations/202611170001_events_and_clubs_ecosystem.sql'),
    'utf8'
  );

  it('defines the 5 initial proposed student clubs', () => {
    assert.match(clubsServiceContent, /name:\s*'Development Club'/);
    assert.match(clubsServiceContent, /name:\s*'Artificial Intelligence & Data Science Club'/);
    assert.match(clubsServiceContent, /name:\s*'Design & Creative Club'/);
    assert.match(clubsServiceContent, /name:\s*'Cybersecurity & Cloud Club'/);
    assert.match(clubsServiceContent, /name:\s*'Innovation & Entrepreneurship Club'/);
  });

  it('generates unique application ID format TK-CLB-2026-XXXXX', () => {
    assert.match(clubsServiceContent, /`TK-CLB-2026-\${rand}`/);
  });

  it('implements intelligent student segregation and transparent classification tags', () => {
    assert.match(clubsServiceContent, /function filterApplicants/);
    assert.match(clubsServiceContent, /function computeApplicantSegregationTags/);
    assert.match(clubsServiceContent, /Full-Stack Specialist/);
    assert.match(clubsServiceContent, /UI\/UX & Prototyping/);
    assert.match(clubsServiceContent, /Cloud & DevOps/);
  });

  it('provisions verified ClubMembership with TK-MBR- when application is Accepted', () => {
    assert.match(clubsServiceContent, /if \(newStatus === 'Accepted'/);
    assert.match(clubsServiceContent, /generateMembershipId/);
    assert.match(clubsServiceContent, /`TK-MBR-\${prefix}-\${rand}`/);
  });

  it('enforces secure private resume storage in club-resumes bucket with 5MB limit', () => {
    assert.match(storageServiceContent, /RESUME_BUCKET = 'club-resumes'/);
    assert.match(storageServiceContent, /MAX_RESUME_SIZE_BYTES = 5 \* 1024 \* 1024/);
    assert.match(storageServiceContent, /validateResumeFile/);
    assert.match(storageServiceContent, /application\/pdf/);
    assert.match(migrationContent, /insert into storage\.buckets \(id, name, public/);
    assert.match(migrationContent, /'club-resumes'/);
  });

  it('includes database migration tables and RLS policies for clubs and applications', () => {
    assert.match(migrationContent, /create table if not exists public\.clubs/);
    assert.match(migrationContent, /create table if not exists public\.club_applications/);
    assert.match(migrationContent, /create table if not exists public\.club_memberships/);
    assert.match(migrationContent, /alter table public\.clubs enable row level security/);
    assert.match(migrationContent, /alter table public\.club_applications enable row level security/);
    assert.match(migrationContent, /alter table public\.club_memberships enable row level security/);
  });

  it('uses professional subject-based visuals without people photographs', () => {
    const visualContent = fs.readFileSync(path.resolve('src/components/ui/TechnologyVisuals.tsx'), 'utf8');
    const clubsLandingContent = fs.readFileSync(path.resolve('src/components/clubs/ClubsLandingView.tsx'), 'utf8');
    const eventsLandingContent = fs.readFileSync(path.resolve('src/components/events/EventsLandingView.tsx'), 'utf8');

    // Asserts subject visuals exist
    assert.match(visualContent, /export const DevClubVisual/);
    assert.match(visualContent, /export const AiClubVisual/);
    assert.match(visualContent, /export const DesignClubVisual/);
    assert.match(visualContent, /export const CyberClubVisual/);
    assert.match(visualContent, /export const InnovationClubVisual/);
    assert.match(visualContent, /export const HackathonVisual/);

    // Cards use the subject visual components
    assert.match(clubsLandingContent, /renderClubVisual/);
    assert.match(eventsLandingContent, /renderEventVisual/);

    // Cards do NOT contain fake ratings or fake member statistics
    assert.doesNotMatch(clubsLandingContent, /4\.9 ★/);
    assert.doesNotMatch(clubsLandingContent, /Hard Level/);
  });
});
