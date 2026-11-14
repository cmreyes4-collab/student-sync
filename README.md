# Student Sync

Student Sync is a **mobile-first web application** that helps college students organize
academic assignments and personal responsibilities in one place.

> **Status:** Initial project scaffolding. The application features are not implemented yet.

## What Student Sync Does

Student Sync lets a student:

1. Add assignments with due dates
2. Edit assignments
3. Organize assignments by class
4. Mark assignments complete
5. Add personal events, appointments, and work shifts
6. View a daily schedule combining school and personal events
7. View upcoming assignments and deadlines
8. Set assignment reminders
9. Set personal event reminders

See the [Product Requirements Document](docs/prd.md) for the full scope.

## Tech Stack (Proposed)

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React + Vite                        |
| Backend  | Node.js + Express                   |
| Database | Supabase (PostgreSQL + Auth)        |

## Repository Structure

```
student-sync/
├── client/              # React + Vite frontend (mobile-first UI)
│   ├── src/
│   │   ├── App.jsx      # Root component (placeholder)
│   │   ├── main.jsx     # React entry point
│   │   └── index.css    # Mobile-first base styles
│   ├── index.html
│   ├── vite.config.js   # Vite config (proxies /api to the API in development)
│   ├── .env.example
│   └── package.json
├── api/                 # Node.js + Express REST API
│   ├── src/
│   │   └── index.js     # Express server with a /api/health route
│   ├── .env.example
│   └── package.json
├── supabase/            # Database configuration and migrations
│   ├── migrations/      # SQL migration files (none yet)
│   └── README.md
├── docs/                # Project documentation
│   ├── prd.md           # Product requirements
│   ├── tasks.md         # Development tasks + acceptance criteria
│   └── workspace-rules.md # Naming, code standards, branching, commits, PRs
├── .gitignore
└── README.md
```

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18 or newer and npm.

```bash
# Clone the repository
git clone https://github.com/cmreyes4-collab/student-sync.git
cd student-sync

# Start the API (http://localhost:3001)
cd api
cp .env.example .env
npm install
npm run dev

# In a second terminal, start the client (http://localhost:5173)
cd client
cp .env.example .env
npm install
npm run dev
```

Check that the API is running: open `http://localhost:3001/api/health`.

## Documentation

- [docs/prd.md](docs/prd.md) — purpose, target users, architecture, tools, constraints, scope
- [docs/tasks.md](docs/tasks.md) — development tasks for all nine user stories
- [docs/workspace-rules.md](docs/workspace-rules.md) — how we name files, write code,
  branch, commit, and review pull requests
- [supabase/README.md](supabase/README.md) — database setup and migration notes

## Out of Scope

The following features were considered and rejected: Canvas integration, weekly or monthly
calendar views, assignment priorities, multiple reminders, and personal calendar integration.
