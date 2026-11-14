# Student Sync — Development Tasks

Each task lists a **description**, the **linked user story**, and **acceptance criteria**
that can be checked by a tester. Task IDs use the format `T<story>.<number>`
(setup tasks use `T0.<number>`).

**Status key:** `[ ]` To do · `[~]` In progress · `[x]` Done

## User Story Reference

| #  | User Story                                                        |
| -- | ----------------------------------------------------------------- |
| 1  | Add assignments with due dates                                    |
| 2  | Edit assignments                                                  |
| 3  | Organize assignments by class                                     |
| 4  | Mark assignments complete                                         |
| 5  | Add personal events, appointments, and work shifts                |
| 6  | View a daily schedule combining school and personal events        |
| 7  | View upcoming assignments and deadlines                           |
| 8  | Set assignment reminders                                          |
| 9  | Set personal event reminders                                      |

---

## Setup (supports all stories)

### [ ] T0.1 — Install and run the client and API locally
- **Description:** Install dependencies in `/client` and `/api` and confirm both start.
- **Linked user story:** Stories 1–9 (foundation)
- **Acceptance criteria:**
  - `npm install && npm run dev` in `/client` serves the app at `http://localhost:5173`.
  - `npm install && npm run dev` in `/api` starts the server on port `3001`.
  - `GET http://localhost:3001/api/health` returns `200` with `{ "status": "ok" }`.

### [ ] T0.2 — Set up Supabase project and authentication
- **Description:** Create the Supabase project, run `supabase init`, add connection values
  to `.env` files, and enable email sign-in so each student's data is private.
- **Linked user story:** Stories 1–9 (foundation)
- **Acceptance criteria:**
  - `supabase/config.toml` exists and is committed; no keys are committed.
  - `client/.env.example` and `api/.env.example` list every required variable.
  - A student can sign up, sign in, and sign out.
  - API requests without a valid session return `401 Unauthorized`.

---

## Story 1 — Add assignments with due dates

### [ ] T1.1 — Create the `assignments` table
- **Description:** Add a migration that creates `assignments` with `id`, `user_id`,
  `class_id` (nullable), `title`, `description`, `due_at`, `is_complete` (default `false`),
  and `created_at`. Enable row-level security so students only access their own rows.
- **Linked user story:** Story 1
- **Acceptance criteria:**
  - Running the migration creates the table with the listed columns.
  - `title` and `due_at` are required (`NOT NULL`).
  - A student cannot read or modify another student's assignments.

### [ ] T1.2 — API endpoint to create an assignment
- **Description:** Implement `POST /api/assignments`.
- **Linked user story:** Story 1
- **Acceptance criteria:**
  - A valid request with `title` and `due_at` returns `201` and the saved assignment.
  - A request missing `title` or `due_at` returns `400` with an error message.
  - An invalid date in `due_at` returns `400`.

### [ ] T1.3 — "Add Assignment" form
- **Description:** Build a mobile-first form with title, optional description, and due
  date/time fields that calls `POST /api/assignments`.
- **Linked user story:** Story 1
- **Acceptance criteria:**
  - Submitting a valid form saves the assignment and shows it in the assignment list.
  - Submitting with an empty title or due date shows an inline error and does not save.
  - The form is fully usable on a 375px-wide screen without horizontal scrolling.

---

## Story 2 — Edit assignments

### [ ] T2.1 — API endpoint to update an assignment
- **Description:** Implement `PUT /api/assignments/:id` to update title, description,
  due date, and class.
- **Linked user story:** Story 2
- **Acceptance criteria:**
  - A valid update returns `200` and the updated assignment.
  - Invalid data returns `400`; the stored assignment is unchanged.
  - Updating an assignment that does not exist or belongs to another student returns `404`.

### [ ] T2.2 — "Edit Assignment" screen
- **Description:** Let the student open an assignment, change its fields, and save.
- **Linked user story:** Story 2
- **Acceptance criteria:**
  - The edit form opens pre-filled with the assignment's current values.
  - Saving shows the updated values in the list without a manual page refresh.
  - Selecting "Cancel" closes the form and leaves the assignment unchanged.

---

## Story 3 — Organize assignments by class

### [ ] T3.1 — Create the `classes` table and API
- **Description:** Add a migration for `classes` (`id`, `user_id`, `name`) and implement
  `GET /api/classes` and `POST /api/classes`.
- **Linked user story:** Story 3
- **Acceptance criteria:**
  - `POST /api/classes` with a `name` returns `201`; an empty name returns `400`.
  - `GET /api/classes` returns only the signed-in student's classes.
  - A student cannot create two classes with the same name.

### [ ] T3.2 — Assign a class to an assignment
- **Description:** Add a class dropdown to the Add and Edit Assignment forms, with an
  option to create a new class.
- **Linked user story:** Story 3
- **Acceptance criteria:**
  - The dropdown lists all of the student's classes.
  - Saving an assignment stores the selected class.
  - A newly created class appears in the dropdown immediately.

### [ ] T3.3 — View assignments grouped by class
- **Description:** Show assignments grouped under their class name, with a filter to show
  a single class.
- **Linked user story:** Story 3
- **Acceptance criteria:**
  - Assignments appear under the heading of their class.
  - Assignments with no class appear under "No Class".
  - Selecting a class in the filter shows only that class's assignments.

---

## Story 4 — Mark assignments complete

### [ ] T4.1 — API endpoint to toggle completion
- **Description:** Implement `PATCH /api/assignments/:id/complete` to set `is_complete`
  to `true` or `false`.
- **Linked user story:** Story 4
- **Acceptance criteria:**
  - Sending `{ "is_complete": true }` returns `200` and the assignment marked complete.
  - Sending `{ "is_complete": false }` marks it incomplete again.
  - A non-boolean value returns `400`.

### [ ] T4.2 — Completion checkbox in the assignment list
- **Description:** Add a checkbox next to each assignment to mark it complete or incomplete.
- **Linked user story:** Story 4
- **Acceptance criteria:**
  - Checking the box marks the assignment complete and shows it with a completed style
    (e.g., strikethrough).
  - Unchecking the box restores the normal style.
  - The completion state is kept after a page refresh.
  - The checkbox tap target is at least 44×44px.

---

## Story 5 — Add personal events, appointments, and work shifts

### [ ] T5.1 — Create the `personal_events` table
- **Description:** Add a migration for `personal_events` with `id`, `user_id`, `title`,
  `type` (`event`, `appointment`, or `work_shift`), `starts_at`, `ends_at`, and `notes`.
  Enable row-level security.
- **Linked user story:** Story 5
- **Acceptance criteria:**
  - The table is created with the listed columns.
  - `type` only accepts `event`, `appointment`, or `work_shift`.
  - Inserting a row where `ends_at` is before `starts_at` is rejected.

### [ ] T5.2 — API endpoints for personal events
- **Description:** Implement `POST /api/events`, `GET /api/events`, and
  `PUT /api/events/:id`.
- **Linked user story:** Story 5
- **Acceptance criteria:**
  - A valid `POST` returns `201` and the saved event.
  - Missing `title`, `type`, `starts_at`, or `ends_at` returns `400`.
  - `GET /api/events` returns only the signed-in student's events.

### [ ] T5.3 — "Add Personal Event" form
- **Description:** Build a mobile-first form with title, type selector
  (Event / Appointment / Work Shift), start time, end time, and optional notes.
- **Linked user story:** Story 5
- **Acceptance criteria:**
  - Submitting a valid form saves the event.
  - An end time earlier than the start time shows an inline error and does not save.
  - The saved event shows its type label (Event, Appointment, or Work Shift).

---

## Story 6 — View a daily schedule combining school and personal events

### [ ] T6.1 — API endpoint for the daily schedule
- **Description:** Implement `GET /api/schedule?date=YYYY-MM-DD` that returns assignments
  due that day and personal events occurring that day in a single list sorted by time.
- **Linked user story:** Story 6
- **Acceptance criteria:**
  - The response includes both assignments and personal events for the requested date.
  - Each item includes a `kind` field (`assignment` or `personal_event`).
  - Items are sorted by time, earliest first.
  - A missing or invalid `date` returns `400`.

### [ ] T6.2 — Daily schedule screen
- **Description:** Build the "Today" screen showing the combined schedule, with
  previous/next day buttons.
- **Linked user story:** Story 6
- **Acceptance criteria:**
  - The screen opens to today's date by default.
  - Assignments and personal events are visually distinguishable (label or icon).
  - Previous/Next buttons change the date by exactly one day and reload the schedule.
  - A day with no items shows "Nothing scheduled for this day."

---

## Story 7 — View upcoming assignments and deadlines

### [ ] T7.1 — API endpoint for upcoming assignments
- **Description:** Implement `GET /api/assignments/upcoming` returning incomplete
  assignments due now or later, sorted by due date.
- **Linked user story:** Story 7
- **Acceptance criteria:**
  - Only incomplete assignments with `due_at` at or after the current time are returned.
  - Results are sorted by `due_at`, soonest first.
  - Completed assignments are never included.

### [ ] T7.2 — "Upcoming" screen
- **Description:** Show a list of upcoming assignments with title, class, and due date.
- **Linked user story:** Story 7
- **Acceptance criteria:**
  - Each item shows the title, class name (or "No Class"), and due date/time.
  - Marking an assignment complete removes it from the list.
  - When nothing is upcoming, the screen shows "No upcoming assignments."

---

## Story 8 — Set assignment reminders

### [ ] T8.1 — Create the `reminders` table
- **Description:** Add a migration for `reminders` with `id`, `user_id`, `assignment_id`
  (nullable), `personal_event_id` (nullable), and `remind_at`. Each reminder belongs to
  exactly one assignment **or** one personal event.
- **Linked user story:** Story 8 (also used by Story 9)
- **Acceptance criteria:**
  - A reminder must reference exactly one of `assignment_id` or `personal_event_id`.
  - An assignment can have at most one reminder (unique constraint).
  - Deleting an assignment also deletes its reminder.

### [ ] T8.2 — API endpoints for assignment reminders
- **Description:** Implement `PUT /api/assignments/:id/reminder` (create or replace) and
  `DELETE /api/assignments/:id/reminder`.
- **Linked user story:** Story 8
- **Acceptance criteria:**
  - Setting a reminder returns `200` with the saved `remind_at`.
  - Setting a second reminder replaces the first; there is never more than one.
  - A `remind_at` in the past returns `400`.
  - `DELETE` removes the reminder and returns `204`.

### [ ] T8.3 — Set and receive an assignment reminder
- **Description:** Add a reminder date/time field to the assignment form and show a
  browser notification at the reminder time while the app is open.
- **Linked user story:** Story 8
- **Acceptance criteria:**
  - The student can set, change, or remove one reminder for an assignment.
  - The app asks for notification permission the first time a reminder is set.
  - At the reminder time, a notification shows the assignment title and due date.
  - If notification permission is denied, an in-app message is shown instead.

---

## Story 9 — Set personal event reminders

### [ ] T9.1 — API endpoints for personal event reminders
- **Description:** Implement `PUT /api/events/:id/reminder` (create or replace) and
  `DELETE /api/events/:id/reminder` using the `reminders` table from T8.1.
- **Linked user story:** Story 9
- **Acceptance criteria:**
  - Setting a reminder returns `200` with the saved `remind_at`.
  - A personal event never has more than one reminder.
  - A `remind_at` in the past returns `400`.
  - `DELETE` removes the reminder and returns `204`.

### [ ] T9.2 — Set and receive a personal event reminder
- **Description:** Add a reminder date/time field to the personal event form and show a
  browser notification at the reminder time while the app is open.
- **Linked user story:** Story 9
- **Acceptance criteria:**
  - The student can set, change, or remove one reminder for a personal event.
  - At the reminder time, a notification shows the event title, type, and start time.
  - If notification permission is denied, an in-app message is shown instead.
