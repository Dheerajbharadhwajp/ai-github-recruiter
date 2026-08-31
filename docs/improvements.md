# Suggested Improvements

> Version 1.0 — companion to `scoring.md`

Grounded in the actual code as of this writing, not generic advice. Tiered by
effort vs. value, roughly in priority order within each tier.

---

# Quick wins

## 1. Only the top 5 repos (by stars) are ever analyzed

`backend/app/services/github_service.py`'s `fetch_readmes_for_top_repos` sorts a
candidate's repos by star count and takes the top **5** (`MAX_README_REPOS = 5`).
Every other repo — no matter how many the candidate has — never gets its README
read, and never reaches the repository/skill-extraction agents. A candidate's
strongest, most substantive project can simply be missed if it's not their
highest-starred one (a common case: newer or personal-tool repos rarely have
stars yet).

**Fix options, cheapest first:**
- At minimum, surface this in the UI/response — e.g. "Analysis based on 5 of 23
  repositories" — so a recruiter knows the score isn't full-portfolio coverage.
- Blend a recency signal into repo selection (e.g. top N by stars **plus** top N
  by last-updated), not stars alone.
- Raise `MAX_README_REPOS` if latency/cost budget allows — this is a one-line
  change with the current architecture.

## 2. `RepositoryAnalysis.notes` is generated and then thrown away

`backend/app/agents/nodes.py`'s `repository_analyzer` node produces a `notes`
field — the LLM's justification for the documentation/architecture/testing
ratings — but `backend/app/services/analysis_service.py` never reads it when
building the `Analysis` row. It's paid-for LLM output (no extra cost to keep)
that currently reaches nobody. Add a `notes` column to `Analysis` and show it
next to the quality badges on the dashboard — instant "why" behind those ratings
with zero new LLM calls.

## 3. Reset has no safety net at the API layer

`DELETE /api/candidates` wipes every candidate immediately — the confirmation
dialog lives only in the frontend (`app/docs/page.tsx`). Anyone hitting the API
directly (a script, a stray `curl`, a second client) deletes everything with no
confirmation and no undo. Fine for solo local use; worth a server-side guard
(e.g. requiring a `?confirm=true` query param, or a soft-delete/archive instead
of a hard delete) before more than one person touches this instance.

---

# Product & UX

## 4. No sort/filter/search on the candidate roster

`/docs` renders every candidate in one grid with no way to sort by score, filter
to just Approved/Rejected/unscreened, or search by username. Fine at a handful
of candidates; becomes hard to scan well before it reaches dozens.

## 5. Chat has no persistence or streaming

`useChat.ts` keeps messages in local component state only — a refresh clears the
conversation (documented as an accepted v1 tradeoff when this was built, but
worth revisiting). Separately, `POST /api/chat` blocks until the full answer is
ready; streaming tokens back would make longer answers feel far more responsive.

## 6. One-username-at-a-time intake

The home page search takes a single GitHub username. A recruiter working through
a batch of applicants has to repeat that one at a time. A "paste a list of
usernames" bulk-intake flow (looping `POST /api/profile` + `/api/analyze`
client-side, or a new batch endpoint) would match how this tool is actually used.

## 7. No export

There's no way to get the roster (scores, verdicts, reasoning) out of the app —
e.g. as CSV — to share with someone who isn't looking at the dashboard directly.

---

# Reliability & scaling

## 8. Screening verdicts overwrite instead of accumulating

Already called out in `scoring.md`: `RoleScreening` is one row per candidate,
upserted — submitting a new role discards the previous verdict. If a recruiter
screens for "Backend Engineer" today and "Full Stack Developer" next week, the
first result is gone. A `role_screening_history` table (append-only, keep the
existing table as "latest" for fast lookups) would preserve that.

## 9. Chat context doesn't scale past a small roster

`agents/chat.py`'s `build_candidates_block` serializes **every** candidate into
**every** chat prompt, every time. Fine at the dozens-of-candidates scale this
was designed for; once the roster grows meaningfully, prompt size (cost, latency,
eventually context limits) grows linearly with every question asked, even ones
about a single person. Worth a lightweight pre-filter (keyword match against the
question, or capping to the N most relevant candidates) before that becomes a
real cost.

---

# Engineering foundation (before wider/shared use)

## 10. No authentication on the API

Every endpoint — including `DELETE /api/candidates` — is open to anyone who can
reach the backend. Acceptable for local/demo use; a real requirement before this
is deployed somewhere reachable by more than its developer.

## 11. No automated tests

Nothing in `backend/` or `frontend/` has test coverage today. Given this app
makes hire/reject-adjacent judgments, the service-layer logic most worth
protecting first: the upsert behavior in `analysis_service.py` /
`screening_service.py`, and the cascade-delete behavior on `User` (repositories,
analysis, and screening rows all need to disappear together on Reset — this was
already a real bug caught and fixed during `RoleScreening`'s addition; a test
would have caught it automatically next time).

## 12. No DB migration tooling

`create_db_and_tables()` uses `SQLModel.metadata.create_all`, which only adds
new tables — it never alters existing ones. That's been fine so far because
every change so far has been a new table. The first time an existing table needs
an altered column, this silently does nothing and the app breaks in a confusing
way. Worth adding Alembic before the schema stabilizes further.

## 13. SQLite → Postgres

Already the project's own stated production target (see root `README.md`).
Worth planning the migration path (including the Alembic setup above) before
real usage rather than after.
