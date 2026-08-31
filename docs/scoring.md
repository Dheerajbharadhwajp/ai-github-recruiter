# Candidate Scoring & Screening Methodology

> Version 1.0

---

# Model

Every AI step in this app — profile analysis, repository analysis, skill extraction,
the final verdict, role screening, and the chatbot — runs on a single model:

**`openai/gpt-oss-120b`, served by Groq**, via `langchain-groq`'s `ChatGroq`
(`backend/app/agents/llm.py`, model set by `GROQ_MODEL` in `backend/.env`).

Temperature is `0.2` for all scoring/screening calls (favors consistency over
creativity). The chatbot uses the same model without a fixed temperature override.

There is no separate "scoring model" — one LLM does all the judgment calls, just
with different prompts per task.

---

# How a candidate gets a score (0–100)

Triggered by `POST /api/analyze`. Four LLM calls run per candidate, orchestrated by
a LangGraph graph (`backend/app/agents/graph.py`): three run in parallel, then a
fourth combines their output.

```
                    START
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
  profile_analyzer  repository_   skill_extractor
                     analyzer
        └─────────────┼─────────────┘
                       ▼
                 recruiter_agent
                       ▼
                      END
```

## 1. Profile Analyzer

**Input:** bio, follower/following counts, public repo count, languages used.
**Output:** `experience_level` (Beginner / Intermediate / Advanced / Expert), a
1–2 sentence `summary`.

## 2. Repository Analyzer

**Input:** each repo's name, language, stars, forks, description, and up to the
first **2,000 characters** of its README.
**Output:** three categorical quality ratings — `documentation`, `architecture`,
`testing`, each one of Poor / Average / Good / Excellent — plus short `notes`
justifying them. The prompt explicitly tells the model to rate conservatively
when evidence is thin rather than assume quality.

## 3. Skill Extractor

**Input:** same repo/README data as above, plus the language list.
**Output:** a list of `{name, proficiency}`, proficiency estimated 0–100 based on
how prominently and how well each skill shows up across the repos. This is
explicitly an LLM estimate, not a measured metric — there's no static analysis
or test-coverage tooling behind it.

## 4. Recruiter Agent (final verdict)

**Input:** the three outputs above (not raw repo data again).
**Output:** the `Analysis` row that gets stored and shown on the dashboard:
`score` (0–100), `recommended_role`, `strengths[]`, `weaknesses[]`, `summary`.

**The score itself has no fixed rubric or numeric weighting formula** — there's no
"30% docs + 40% skills + ..." calculation anywhere in the code. It's a single LLM
judgment call asked to synthesize the three upstream analyses into one number,
guided only by the system prompt's instruction to produce "a final employability
verdict." This is worth knowing: two structurally similar profiles can get
different scores if the model's read on them differs slightly, and re-running
analysis (`force: true`) can shift the score even with unchanged data.

Analysis is cached — once a candidate has an `Analysis` row, `POST /api/analyze`
returns it as-is unless called with `force: true`.

---

# How Approved/Rejected screening works

Triggered by `POST /api/candidates/screen`, separate from the scoring pipeline
above. For each candidate that already has a stored `Analysis`:

**Input:** the target role the recruiter typed in, plus that candidate's already-
stored `score`, `recommended_role`, `experience_level`, `summary`, `strengths`,
`weaknesses`, and `skills`. **No repos or READMEs are re-fetched or re-read** —
screening only reasons over the prior analysis, not the raw GitHub data.
**Output:** `verdict` (Approved or Rejected) + a short `reasoning` string.

This runs as one LLM call per candidate (`backend/app/agents/screening.py`),
fired concurrently (capped at 5 at a time) across the whole roster.

**Only one verdict is kept per candidate** — submitting a new role overwrites the
previous verdict rather than keeping a history. There's no per-role audit trail
today; if you need "was this person ever approved for role X," that's not
currently retained after a different role is screened.

---

# How the chatbot answers questions

`POST /api/chat` makes **no new judgment calls** and doesn't re-score anyone. It
takes every candidate's stored `Analysis` (score, summary, strengths, weaknesses,
skills) and latest `RoleScreening` (if any), serializes all of it into one text
block, and asks the model to answer the recruiter's question **using only that
data** — the system prompt explicitly instructs it to say so rather than guess if
the answer isn't in there. So the chatbot is a read-only lens on the same numbers
already visible on the dashboard/docs page, not an independent evaluator.

---

# Known limitations

- **No fixed rubric.** Scores and quality ratings are holistic LLM judgments, not
  a weighted formula — the same evidence can plausibly get slightly different
  scores across runs.
- **README-dependent.** Documentation/architecture/testing ratings lean heavily
  on README content; a well-built but under-documented repo can rate lower than
  its actual code quality.
- **Truncated context.** Only the first 2,000 characters of each README are read,
  and only a candidate's top repos are considered (not their entire history).
- **No verification.** Nothing here runs the candidate's code, checks CI status,
  or confirms claims made in READMEs — it's all inference from static metadata.
- **Screening has no history.** Re-screening for a new role discards the previous
  verdict for each candidate (see above).
