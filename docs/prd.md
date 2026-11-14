# Student Sync — Product Requirements Document (PRD)

**Status:** Draft (initial scaffolding)
**Version:** 0.1

## 1. Purpose

College students juggle assignments from several classes alongside jobs, appointments, and
personal commitments. These are usually tracked in different places (a learning platform,
a phone calendar, sticky notes), which makes it easy to miss deadlines or double-book time.

**Student Sync** is a mobile-first web application that brings academic assignments and
personal responsibilities together in one place, so a student can see what is due and what
is happening today at a glance.

## 2. Target Users

- **Primary:** College students who manage coursework across multiple classes.
- **Especially:** Students who also work part-time jobs or have recurring personal
  appointments and need one daily view of everything.
- **Device:** Primarily smartphones; the app should also work on tablets and laptops.

## 3. Accepted User Stories (Level 1 Specification)

| #  | User Story                                                         |
| -- | ------------------------------------------------------------------ |
| 1  | As a student, I can add assignments with due dates.                |
| 2  | As a student, I can edit assignments.                              |
| 3  | As a student, I can organize assignments by class.                 |
| 4  | As a student, I can mark assignments complete.                     |
| 5  | As a student, I can add personal events, appointments, and work shifts. |
| 6  | As a student, I can view a daily schedule combining school and personal events. |
| 7  | As a student, I can view upcoming assignments and deadlines.       |
| 8  | As a student, I can set assignment reminders.                      |
| 9  | As a student, I can set personal event reminders.                  |

Development tasks for each story are listed in [`tasks.md`](./tasks.md).

## 4. Proposed Architecture

```
┌──────────────────────┐   HTTP/JSON   ┌──────────────────────┐    SQL     ┌──────────────────────┐
│  Client (React/Vite) │ ────────────▶ │  API (Node/Express)  │ ─────────▶ │  Supabase (Postgres) │
│  /client             │ ◀──────────── │  /api                │ ◀───────── │  /supabase           │
└──────────────────────┘               └──────────────────────┘            └──────────────────────┘
```

- **Client (`/client`)** — A React single-page app built with Vite. Mobile-first layouts
  and the screens for assignments, classes, personal events, the daily schedule, upcoming
  deadlines, and reminders.
- **API (`/api`)** — A Node.js + Express REST API. Validates input and reads/writes data in
  Supabase. Endpoints are grouped by resource (`/api/assignments`, `/api/classes`,
  `/api/events`, `/api/schedule`, `/api/reminders`).
- **Database (`/supabase`)** — Supabase-hosted PostgreSQL. Schema changes are tracked as SQL
  migration files. Supabase Auth is proposed for student sign-in so each student only sees
  their own data.

### Planned data model (initial)

| Entity           | Key fields                                                         |
| ---------------- | ------------------------------------------------------------------ |
| `classes`        | id, user_id, name                                                  |
| `assignments`    | id, user_id, class_id, title, description, due_at, is_complete     |
| `personal_events`| id, user_id, title, type (`event` / `appointment` / `work_shift`), starts_at, ends_at |
| `reminders`      | id, user_id, assignment_id **or** personal_event_id, remind_at     |

This architecture is the **initial proposal** and may be refined during development.

## 5. Tools

| Area            | Tool                                    |
| --------------- | --------------------------------------- |
| Frontend        | React, Vite                             |
| Backend         | Node.js (LTS), Express                  |
| Database / Auth | Supabase (PostgreSQL, Supabase Auth)    |
| Version control | Git, GitHub (branches + pull requests)  |
| Package manager | npm                                     |
| Documentation   | Markdown files in `/docs`               |

## 6. Constraints

- **Mobile-first:** Every screen must be usable on a 375px-wide phone screen before
  larger layouts are considered.
- **Simple scope:** Only the nine accepted user stories are in scope.
- **One reminder per item:** Each assignment or personal event can have at most one reminder.
- **Reminder delivery:** Reminders are shown as in-app/browser notifications. No email,
  SMS, or push-notification service is planned for the initial scope.
- **Daily view only:** The schedule shows one day at a time.
- **Secrets:** API keys and database credentials live in `.env` files that are never committed.
- **Student project:** Limited time and budget; prefer free tiers and well-known libraries.

## 7. Initial Scope

### In scope

- Creating, editing, and completing assignments with due dates.
- Creating classes and organizing assignments by class.
- Creating personal events, appointments, and work shifts.
- A daily schedule that combines assignments due that day with personal events.
- An upcoming list of incomplete assignments sorted by due date.
- A single reminder per assignment and per personal event.

### Out of scope (rejected features)

These were considered and **rejected** for this project:

- Canvas (or other LMS) integration
- Weekly or monthly calendar views
- Assignment priorities
- Multiple reminders per item
- Personal calendar integration (e.g., Google Calendar, Apple Calendar, Outlook)

## 8. Success Criteria

- All nine user stories are implemented and meet the acceptance criteria in `tasks.md`.
- The app is usable on a phone-sized screen without horizontal scrolling.
- A student's data is visible only to that student.
