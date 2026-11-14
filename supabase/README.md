# Supabase

This folder holds database configuration and migrations for Student Sync.
Supabase (hosted PostgreSQL) is the proposed database and authentication provider.

## Structure

```
supabase/
├── migrations/   # SQL migration files (none yet)
└── README.md
```

## Getting started (later)

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli).
2. From the repository root, run `supabase init` to generate `supabase/config.toml`.
3. Create migrations with `supabase migration new <name>`.

## Migration naming

Migrations are named `<timestamp>_<short_description>.sql`, for example
`20260115120000_create_assignments.sql`. The Supabase CLI generates the timestamp.

## Planned tables (not yet created)

| Table             | Purpose                                            | Related stories |
| ----------------- | -------------------------------------------------- | --------------- |
| `classes`         | Classes a student is taking                        | 3               |
| `assignments`     | Assignments with a due date, class, and status     | 1, 2, 3, 4, 7   |
| `personal_events` | Personal events, appointments, and work shifts     | 5, 6            |
| `reminders`       | One reminder per assignment or personal event      | 8, 9            |

The schema will be finalized in the database setup task (see `docs/tasks.md`).
