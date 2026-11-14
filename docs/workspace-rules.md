# Student Sync — Workspace Rules

These rules keep the repository consistent and easy to review. Everyone contributing to
Student Sync should follow them.

## 1. File Naming Conventions

| Item                         | Convention                     | Example                          |
| ---------------------------- | ------------------------------ | -------------------------------- |
| React components             | `PascalCase.jsx`               | `AssignmentForm.jsx`             |
| React hooks                  | `camelCase.js`, `use` prefix   | `useAssignments.js`              |
| Other JS modules (client/API)| `camelCase.js`                 | `formatDate.js`                  |
| Express route files          | `<resource>.routes.js`         | `assignments.routes.js`          |
| Express controller files     | `<resource>.controller.js`     | `assignments.controller.js`      |
| CSS files                    | Match component name           | `AssignmentForm.css`             |
| Test files                   | `<name>.test.js(x)`            | `formatDate.test.js`             |
| Supabase migrations          | `<timestamp>_<snake_case>.sql` | `20260115120000_create_classes.sql` |
| Documentation                | `kebab-case.md`                | `workspace-rules.md`             |
| Folders                      | `kebab-case` (lowercase)       | `daily-schedule/`                |

- Database tables and columns use `snake_case` (e.g., `personal_events`, `due_at`).
- API URLs use lowercase, plural resource names (e.g., `/api/assignments`).

## 2. Code Standards

### General
- Use modern JavaScript (ES modules, `const`/`let`, arrow functions where they help).
- Indent with **2 spaces**; use semicolons and single quotes.
- Use clear, descriptive names; avoid abbreviations like `asgn` or `evt`.
- Keep functions small and focused on one job.
- Add comments only when the "why" is not obvious from the code.
- Never commit secrets. Use `.env` files and keep `.env.example` up to date.
- Remove `console.log` debugging statements before opening a pull request.

### Client (React)
- Use function components and hooks.
- Design mobile-first: write base styles for small screens, then add `min-width`
  media queries for larger screens.
- Tap targets should be at least 44×44px.
- Use semantic HTML (`<button>`, `<label>`, `<main>`) and label every form field.

### API (Express)
- Group routes by resource (`assignments`, `classes`, `events`, `schedule`, `reminders`).
- Validate all request input and return clear error messages.
- Use standard HTTP status codes: `200`, `201`, `204`, `400`, `401`, `404`, `500`.
- Return JSON for all responses.

### Database (Supabase)
- Every schema change is a new migration file; never edit a migration that has already
  been merged.
- Enable row-level security on tables that store student data.

## 3. Branching Strategy

We use a simple feature-branch workflow.

- `main` — always stable and runnable. No direct commits; changes arrive through pull requests.
- Create one branch per task from the latest `main`:

| Type          | Pattern                          | Example                              |
| ------------- | -------------------------------- | ------------------------------------ |
| Feature       | `feature/<task-id>-<short-name>` | `feature/T1.2-create-assignment-api` |
| Bug fix       | `fix/<short-name>`               | `fix/due-date-timezone`              |
| Documentation | `docs/<short-name>`              | `docs/update-prd`                    |
| Chore/setup   | `chore/<short-name>`             | `chore/add-eslint`                   |

- Keep branches short-lived; pull the latest `main` into your branch before opening a PR.
- Delete the branch after it is merged.

## 4. Commit Message Guidelines

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short summary in present tense>
```

| Type       | Use for                                  |
| ---------- | ---------------------------------------- |
| `feat`     | A new feature                            |
| `fix`      | A bug fix                                |
| `docs`     | Documentation changes                    |
| `style`    | Formatting only (no logic change)        |
| `refactor` | Code change that is not a feature or fix |
| `test`     | Adding or updating tests                 |
| `chore`    | Setup, dependencies, configuration       |

Rules:
- Keep the summary under 72 characters and do not end it with a period.
- Use the imperative mood: "add", not "added" or "adds".
- Reference the task ID when relevant.
- Make small commits that each do one thing.

Examples:
```
feat: add POST /api/assignments endpoint (T1.2)
fix: prevent saving events that end before they start (T5.3)
docs: add acceptance criteria for reminders
```

## 5. Pull Request Review Process

1. **Open a PR** from your branch into `main` when the task is ready.
2. **Fill in the PR description:**
   - Task ID(s) and linked user story (e.g., "T1.3 — Story 1").
   - What changed and why.
   - How to test it.
   - Screenshots for UI changes (include a phone-sized screenshot).
3. **Self-check before requesting review:**
   - The app and API run locally without errors.
   - The task's acceptance criteria in `docs/tasks.md` are met.
   - No secrets, `node_modules/`, or build output are committed.
   - No rejected features were added (see `docs/prd.md`, section 7).
4. **Review:** At least **one** teammate reviews the PR. Reviewers check that the code
   is correct, readable, follows these rules, and meets the acceptance criteria.
5. **Address feedback:** Push new commits to the same branch and reply to comments.
6. **Merge:** After approval, merge into `main` and delete the branch.
7. **Update tasks:** Mark the task as done (`[x]`) in `docs/tasks.md`.
