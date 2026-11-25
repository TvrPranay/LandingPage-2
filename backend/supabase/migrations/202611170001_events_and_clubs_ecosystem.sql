-- ============================================================================
-- TEKLOZY EVENTS & PROGRAMS AND STUDENT CLUBS ECOSYSTEM MIGRATION
-- Migration: 202611170001_events_and_clubs_ecosystem.sql
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. EVENTS TABLES
-- ----------------------------------------------------------------------------

create table if not exists public.events (
  id text primary key,
  slug text unique not null,
  title text not null,
  tagline text not null default '',
  category text not null check (category in ('Hackathon', 'Workshop', 'Webinar', 'Bootcamp', 'Competition')),
  dates text not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  duration text not null,
  mode text not null check (mode in ('Online', 'Hybrid', 'In-person')),
  location text not null,
  banner_url text,
  registration_status text not null default 'Open' check (registration_status in ('Open', 'Closed', 'Coming Soon')),
  registration_deadline text not null,
  capacity integer default 200,
  current_registrations integer default 0,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  about text not null,
  themes jsonb not null default '[]'::jsonb,
  eligibility text[] not null default '{}',
  team_config jsonb not null default '{"minTeamSize": 1, "maxTeamSize": 4, "allowIndividual": true}'::jsonb,
  rules text[] not null default '{}',
  faqs jsonb not null default '[]'::jsonb,
  placeholders jsonb not null default '{"venue": "To be announced", "prizes": "To be announced", "sponsors": "To be announced", "finalProblems": "To be announced"}'::jsonb,
  provisional_schedule jsonb not null default '[]'::jsonb,
  announcements jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_slug_idx on public.events(slug);
create index if not exists events_category_idx on public.events(category);
create index if not exists events_is_published_idx on public.events(is_published);

-- Event Schedules (normalized details)
create table if not exists public.event_schedules (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.events(id) on delete cascade,
  day_label text not null,
  schedule_date date not null,
  is_provisional boolean not null default true,
  time_start text not null,
  time_end text,
  title text not null,
  description text not null default '',
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists event_schedules_event_id_idx on public.event_schedules(event_id);

-- Event Registrations
create table if not exists public.event_registrations (
  id text primary key, -- e.g. TK-EVT-2026-10492
  event_id text not null references public.events(id) on delete cascade,
  event_title text not null,
  student_id uuid references auth.users(id) on delete set null,
  full_name text not null check (char_length(trim(full_name)) >= 2),
  email text not null check (email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'),
  phone text not null,
  college text not null,
  degree text not null,
  branch text not null,
  current_year text not null,
  location text not null,
  participation_type text not null check (participation_type in ('Individual', 'Team')),
  team_name text,
  team_size integer not null default 1,
  team_members jsonb not null default '[]'::jsonb,
  preferred_domain text not null,
  technical_skills text[] not null default '{}',
  experience_level text not null,
  github_url text,
  linkedin_url text,
  portfolio_url text,
  project_highlight text,
  motivation text not null,
  status text not null default 'Submitted' check (status in ('Submitted', 'Under Review', 'Confirmed', 'Waitlisted', 'Rejected', 'Cancelled')),
  submission_url text,
  reviewer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint event_registrations_email_event_unique unique(event_id, email)
);

create index if not exists event_registrations_event_id_idx on public.event_registrations(event_id);
create index if not exists event_registrations_email_idx on public.event_registrations(email);
create index if not exists event_registrations_status_idx on public.event_registrations(status);

-- Event Teams (Detailed team entity)
create table if not exists public.event_teams (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.events(id) on delete cascade,
  team_name text not null,
  team_code text unique,
  leader_registration_id text references public.event_registrations(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Event Team Members
create table if not exists public.event_team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.event_teams(id) on delete cascade,
  member_name text not null,
  member_email text not null,
  member_phone text,
  member_college text,
  role_in_team text default 'Member',
  created_at timestamptz not null default now()
);

-- Event Announcements
create table if not exists public.event_announcements (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.events(id) on delete cascade,
  title text not null,
  content text not null,
  is_important boolean not null default false,
  published_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 2. CLUBS TABLES
-- ----------------------------------------------------------------------------

create table if not exists public.clubs (
  id text primary key, -- e.g. 'dev-club'
  slug text unique not null,
  name text not null,
  tagline text not null default '',
  description text not null,
  icon_name text not null default 'Code2',
  accent_color text not null default '#0088E0',
  banner_gradient text not null default 'from-blue-600 to-indigo-700',
  category text not null,
  is_published boolean not null default true,
  is_application_open boolean not null default true,
  application_deadline text not null default '15 December 2026',
  mission text not null,
  objectives text[] not null default '{}',
  key_focus_areas text[] not null default '{}',
  skills_developed text[] not null default '{}',
  example_activities jsonb not null default '[]'::jsonb,
  sample_projects jsonb not null default '[]'::jsonb,
  expected_participation text not null,
  membership_requirements text[] not null default '{}',
  announcements jsonb not null default '[]'::jsonb,
  active_members_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clubs_slug_idx on public.clubs(slug);
create index if not exists clubs_is_published_idx on public.clubs(is_published);

-- Club Interests dictionary
create table if not exists public.club_interests (
  id uuid primary key default gen_random_uuid(),
  club_id text not null references public.clubs(id) on delete cascade,
  interest_name text not null,
  description text,
  created_at timestamptz not null default now()
);

-- Club Applications (8-Step complete record)
create table if not exists public.club_applications (
  id text primary key, -- e.g. TK-CLB-2026-84920
  club_id text not null references public.clubs(id) on delete cascade,
  club_name text not null,
  student_id uuid references auth.users(id) on delete set null,

  -- Step 1: Personal
  full_name text not null,
  email text not null check (email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'),
  phone text not null,
  date_of_birth text,
  college text not null,
  degree text not null,
  branch text not null,
  current_year text not null,
  graduation_year text not null,
  location text not null,

  -- Step 2: Academic
  current_course text not null,
  specialization text not null,
  relevant_coursework text not null,
  cgpa_or_percentage text,
  academic_projects_summary text not null,
  certifications text not null,

  -- Step 3: Interests
  club_specific_interests text[] not null default '{}',
  primary_interest text not null,
  secondary_interests text[] not null default '{}',
  reason_for_joining text not null,
  learning_goals text not null,
  expected_contributions text not null,

  -- Step 4: Skills
  skills jsonb not null default '[]'::jsonb,

  -- Step 5: Projects
  projects jsonb not null default '[]'::jsonb,
  hackathon_experience text not null,
  community_experience text,
  leadership_experience text,

  -- Step 6: Resume
  resume_file_name text,
  resume_file_size integer,
  resume_storage_path text, -- Private path in Supabase Storage

  -- Step 7: Availability & Commitment
  hours_per_week text not null,
  preferred_days text[] not null default '{}',
  work_mode_preference text not null,
  willingness_meetings boolean not null default true,
  willingness_collaboration boolean not null default true,
  availability_notes text,

  -- Step 8: Meta & Status
  status text not null default 'Submitted' check (
    status in ('Draft', 'Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Waitlisted', 'Rejected', 'Withdrawn')
  ),
  consent_given boolean not null default true,
  reviewer_notes jsonb not null default '[]'::jsonb,
  membership_id text,
  membership_issued_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint club_applications_email_club_unique unique(club_id, email)
);

create index if not exists club_applications_club_id_idx on public.club_applications(club_id);
create index if not exists club_applications_email_idx on public.club_applications(email);
create index if not exists club_applications_status_idx on public.club_applications(status);
create index if not exists club_applications_created_at_idx on public.club_applications(created_at desc);

-- Club Application Skills (Normalized lookup for filtering)
create table if not exists public.club_application_skills (
  id uuid primary key default gen_random_uuid(),
  application_id text not null references public.club_applications(id) on delete cascade,
  skill_name text not null,
  proficiency text not null check (proficiency in ('Beginner', 'Intermediate', 'Advanced')),
  created_at timestamptz not null default now()
);

create index if not exists club_app_skills_name_idx on public.club_application_skills(skill_name);

-- Club Application Projects (Normalized lookup)
create table if not exists public.club_application_projects (
  id uuid primary key default gen_random_uuid(),
  application_id text not null references public.club_applications(id) on delete cascade,
  title text not null,
  description text not null,
  technologies text not null,
  project_type text not null default 'Individual',
  github_url text,
  live_demo_url text,
  created_at timestamptz not null default now()
);

-- Club Memberships (Official member roster)
create table if not exists public.club_memberships (
  id uuid primary key default gen_random_uuid(),
  membership_id text unique not null, -- e.g. TK-MBR-DEV-2026-1042
  club_id text not null references public.clubs(id) on delete cascade,
  club_name text not null,
  student_id uuid references auth.users(id) on delete set null,
  student_name text not null,
  student_email text not null,
  college text not null,
  role text not null default 'Core Member',
  joined_at timestamptz not null default now(),
  status text not null default 'Active' check (status in ('Active', 'Alumni', 'Inactive'))
);

create index if not exists club_memberships_club_id_idx on public.club_memberships(club_id);
create index if not exists club_memberships_email_idx on public.club_memberships(student_email);

-- Club Reviewer Notes
create table if not exists public.club_reviewer_notes (
  id uuid primary key default gen_random_uuid(),
  application_id text not null references public.club_applications(id) on delete cascade,
  reviewer_id uuid references auth.users(id) on delete set null,
  author_name text not null default 'Admissions Reviewer',
  note text not null,
  created_at timestamptz not null default now()
);

-- Club Announcements
create table if not exists public.club_announcements (
  id uuid primary key default gen_random_uuid(),
  club_id text not null references public.clubs(id) on delete cascade,
  title text not null,
  content text not null,
  is_important boolean not null default false,
  published_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 3. STORAGE BUCKET CONFIGURATION FOR RESUMES
-- ----------------------------------------------------------------------------

-- Insert private bucket if not exists
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('club-resumes', 'club-resumes', false, 5242880, array['application/pdf']::text[])
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['application/pdf']::text[];

-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

alter table public.events enable row level security;
alter table public.event_schedules enable row level security;
alter table public.event_registrations enable row level security;
alter table public.event_teams enable row level security;
alter table public.event_team_members enable row level security;
alter table public.event_announcements enable row level security;

alter table public.clubs enable row level security;
alter table public.club_interests enable row level security;
alter table public.club_applications enable row level security;
alter table public.club_application_skills enable row level security;
alter table public.club_application_projects enable row level security;
alter table public.club_memberships enable row level security;
alter table public.club_reviewer_notes enable row level security;
alter table public.club_announcements enable row level security;

-- Events: Everyone can read published events
drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
  on public.events for select
  using (is_published = true);

-- Event Registrations: Anyone/Authenticated can insert
drop policy if exists "Anyone can submit event registration" on public.event_registrations;
create policy "Anyone can submit event registration"
  on public.event_registrations for insert
  to anon, authenticated
  with check (
    status = 'Submitted'
    and char_length(trim(full_name)) >= 2
    and char_length(trim(email)) >= 5
  );

-- Event Registrations: Users can select their own
drop policy if exists "Users can view own event registrations" on public.event_registrations;
create policy "Users can view own event registrations"
  on public.event_registrations for select
  using (
    auth.uid() = student_id
    or email = (auth.jwt() ->> 'email')
  );

-- Clubs: Everyone can view published clubs
drop policy if exists "Public can view published clubs" on public.clubs;
create policy "Public can view published clubs"
  on public.clubs for select
  using (is_published = true);

-- Club Applications: Students can submit applications
drop policy if exists "Anyone can submit club application" on public.club_applications;
create policy "Anyone can submit club application"
  on public.club_applications for insert
  to anon, authenticated
  with check (
    status = 'Submitted'
    and char_length(trim(full_name)) >= 2
    and char_length(trim(email)) >= 5
  );

-- Club Applications: Students can read only their own application
drop policy if exists "Students can read own club applications" on public.club_applications;
create policy "Students can read own club applications"
  on public.club_applications for select
  using (
    auth.uid() = student_id
    or email = (auth.jwt() ->> 'email')
  );

-- Management role check helper function
create or replace function public.is_management()
returns boolean
language sql
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'management'
  );
$$;

-- Management policies (full access)
drop policy if exists "Management full access events" on public.events;
create policy "Management full access events"
  on public.events for all
  using (public.is_management());

drop policy if exists "Management full access event registrations" on public.event_registrations;
create policy "Management full access event registrations"
  on public.event_registrations for all
  using (public.is_management());

drop policy if exists "Management full access clubs" on public.clubs;
create policy "Management full access clubs"
  on public.clubs for all
  using (public.is_management());

drop policy if exists "Management full access club applications" on public.club_applications;
create policy "Management full access club applications"
  on public.club_applications for all
  using (public.is_management());

drop policy if exists "Management full access club memberships" on public.club_memberships;
create policy "Management full access club memberships"
  on public.club_memberships for all
  using (public.is_management());

-- Storage RLS: Resumes are private
drop policy if exists "Applicants can upload resume" on storage.objects;
create policy "Applicants can upload resume"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'club-resumes'
  );

drop policy if exists "Applicants read own resume" on storage.objects;
create policy "Applicants read own resume"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'club-resumes'
    and (
      storage.foldername(name))[1] = 'applicants'
      and (auth.uid()::text = (storage.foldername(name))[2] or public.is_management())
  );

-- Grants
grant select on public.events to anon, authenticated;
grant insert, select on public.event_registrations to anon, authenticated;
grant select on public.clubs to anon, authenticated;
grant insert, select on public.club_applications to anon, authenticated;
grant select on public.club_memberships to anon, authenticated;
