# AI-Powered GitHub Recruiter
### A Multi-Agent AI Recruitment Assistant for GitHub Profile Analysis

> **Duration:** 10 Days (4 Hours/Day)  
> **Team Size:** 3 Developers  
> **Architecture:** Full-Stack AI Application with Multi-Agent Workflow

---

# 📖 Project Overview

The **AI-Powered GitHub Recruiter** is a full-stack web application that automates the technical screening process for software developers by analyzing their GitHub profiles using Large Language Models (LLMs) and Multi-Agent AI.

Instead of recruiters manually reviewing repositories, commit histories, documentation, and project quality, the application performs the analysis automatically and presents an intelligent dashboard with AI-generated insights.

The system combines:

- GitHub REST API
- FastAPI
- React/Next.js
- SQLite (Development) / PostgreSQL (Production)
- LangGraph Multi-Agent Workflow
- Google Gemini/OpenAI LLMs

to provide recruiters with an AI-assisted technical evaluation of candidates.

---

# 🎯 Problem Statement

Recruiters spend a significant amount of time manually evaluating GitHub profiles.

Typical workflow:

- Open profile
- Read repositories
- Read README files
- Identify technologies
- Judge code quality
- Estimate experience
- Decide candidate suitability

This process is:

- Time consuming
- Subjective
- Difficult to scale

Our solution automates the entire process using AI.

---

# 🚀 Solution

The recruiter simply enters a GitHub username.

The application:

1. Fetches GitHub profile data.
2. Retrieves repositories.
3. Stores the information.
4. Runs multiple AI agents.
5. Generates an employability score.
6. Creates a recruiter-friendly dashboard.
7. Allows recruiters to chat with the analyzed profile.

---

# 🏗 High Level Architecture

```text
                    Recruiter

                        │
                        ▼

              React / Next.js Frontend

                        │
                   HTTP Requests

                        ▼

                 FastAPI Backend

                        │

        ┌───────────────┴────────────────┐
        ▼                                ▼

 GitHub REST API                  SQLite Database

        │                                │

        └───────────────┬────────────────┘

                        ▼

             LangGraph AI Workflow

        ┌──────────┬──────────┬──────────┬──────────┐
        ▼          ▼          ▼          ▼

   Profile     Repository     Skill     Recruiter
    Agent        Agent       Extractor    Agent

        └──────────┴──────────┴──────────┘

                        ▼

             AI Generated Analysis

                        ▼

               Recruiter Dashboard

                        ▼

               AI Recruiter Chat
```

---

# ✨ Features

## GitHub Profile Analysis

- Search GitHub username
- Fetch profile details
- Fetch repositories
- Repository metadata
- Programming languages
- Stars
- Forks
- README files
- Topics

---

## AI Analysis

The AI analyzes

- Coding practices
- Repository quality
- Documentation
- Tech stack
- Open Source contributions
- Developer consistency
- Skill level

---

## Recruiter Dashboard

Displays

- Candidate Summary
- Employability Score
- Skills
- Language Distribution
- Repository Statistics
- Strengths
- Weaknesses
- Recommended Role

---

## AI Recruiter Chat

Recruiters can ask questions like

> Does this candidate know Docker?

> Is this candidate suitable for Backend Engineering?

> Which repositories demonstrate leadership?

The AI answers using the analyzed profile.

---

# 🤖 Multi-Agent Workflow

Instead of using a single LLM prompt, multiple specialized agents perform independent tasks.

## Agent 1 — Profile Analyzer

Responsibilities

- Analyze profile
- Experience level
- Bio
- Activity
- Overall summary

Output

```json
{
  "experience": "Intermediate",
  "summary": "Backend-focused developer"
}
```

---

## Agent 2 — Repository Analyzer

Responsibilities

- Code quality
- Repository organization
- Documentation
- Architecture
- Testing

Output

```json
{
  "documentation": "Good",
  "architecture": "Excellent",
  "testing": "Average"
}
```

---

## Agent 3 — Skill Extraction

Responsibilities

Identify technologies such as

- Python
- React
- Docker
- FastAPI
- PostgreSQL
- Redis
- TensorFlow

Output

```json
{
  "skills":[
      "Python",
      "FastAPI",
      "Docker"
  ]
}
```

---

## Agent 4 — Recruiter Agent

Combines every previous result.

Produces

- Employability Score
- Recommended Role
- Strengths
- Weaknesses
- Candidate Summary

Output

```json
{
  "score":92,
  "role":"Backend Engineer",
  "strengths":[...],
  "weaknesses":[...]
}
```

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios
- Recharts

---

## Backend

- FastAPI
- Python
- SQLModel
- Pydantic
- Uvicorn

---

## Database

Development

- SQLite

Production

- PostgreSQL (Optional)
- Neon PostgreSQL (Free Tier)

---

## AI

- LangGraph
- LangChain
- Google Gemini API

---

## APIs

- GitHub REST API

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- SQLite / Neon

---

# 📁 Project Structure

```text
ai-github-recruiter/

│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │
│   │   ├── core/
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── schemas/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── agents/
│   │   │
│   │   └── utils/
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── public/
│
├── docs/
│
└── README.md
```

---

# 📡 Backend API

## Health Check

```
GET /
```

Response

```json
{
  "status":"running"
}
```

---

## Analyze Profile

```
POST /api/profile
```

Request

```json
{
  "username":"torvalds"
}
```

Response

```json
{
  "username":"torvalds",
  "followers":250000,
  "repositories":8
}
```

---

## AI Analysis

```
POST /api/analyze
```

Returns

```json
{
  "score":91,
  "summary":"Excellent backend engineer"
}
```

---

## Recruiter Chat

```
POST /api/chat
```

---

# 🗄 Database Schema

## User

```text
id

github_username

name

bio

followers

following

public_repos
```

---

## Repository

```text
id

user_id

repo_name

description

language

stars

forks

url
```

---

## Analysis

```text
id

user_id

score

summary

strengths

weaknesses

recommended_role
```

---

# 👥 Team Workflow

Instead of dividing into

- AI Engineer
- Backend Engineer
- Frontend Engineer

everyone learns the complete stack.

Each member owns one **vertical feature** while reviewing and understanding the others' work.

---

# 👤 Person A

GitHub Pipeline

Responsibilities

- GitHub API
- Database
- User Models
- Repository Models
- Backend APIs

---

# 👤 Person B

Frontend

Responsibilities

- Landing Page
- Search
- Dashboard
- Charts
- Candidate Cards

---

# 👤 Person C

AI

Responsibilities

- LangGraph
- Prompt Engineering
- Multi-Agent Workflow
- Recruiter Chat
- Structured Output

---

# 🌿 Git Workflow

## Branches

```text
main

dev

feature/github-api

feature/dashboard

feature/agents

bugfix/*
```

---

## Daily Workflow

```bash
git checkout dev

git pull origin dev

git checkout feature/github-api

git merge dev
```

---

## Commit Messages

```bash
feat(api): add GitHub profile endpoint

feat(db): create repository model

feat(ui): build dashboard

feat(agent): add recruiter agent

fix(api): resolve validation bug

docs: update README
```

---

# 📅 10-Day Roadmap

## Day 1

- Setup repository
- Setup FastAPI
- Setup React
- Project architecture
- Folder structure
- Git workflow

---

## Day 2

- SQLite
- API endpoints
- Database models
- Frontend search
- Mock integration

---

## Day 3

- GitHub API integration
- Store profiles
- Fetch repositories

---

## Day 4

- LangGraph setup
- AI agents
- Prompt engineering

---

## Day 5

- Connect GitHub data to AI
- Structured JSON output

---

## Day 6

- Dashboard integration
- Charts
- Statistics

---

## Day 7

- AI Recruiter Chat
- Context-aware responses

---

## Day 8

- Testing
- Edge cases
- Error handling

---

## Day 9

- Deployment
- Environment variables
- Production testing

---

## Day 10

- Final polish
- README
- Demo video
- Documentation

---

# 📚 Concepts Covered

This project demonstrates knowledge in:

- Full-Stack Development
- REST APIs
- FastAPI
- React
- TypeScript
- SQLite/PostgreSQL
- SQLModel
- LangGraph
- Prompt Engineering
- AI Agents
- GitHub REST API
- JSON APIs
- Git & GitHub Workflow
- Deployment
- Software Architecture
- Team Collaboration

---

# 🎯 Expected Outcome

By the end of this project, the application will:

- Analyze any public GitHub profile.
- Generate AI-powered technical evaluations.
- Display recruiter-friendly analytics.
- Allow conversational interaction with candidate profiles.
- Demonstrate production-level software architecture and modern AI engineering practices.

---

# 👨‍💻 Learning Outcomes

After completing this project, every team member should be able to:

- Build a production-ready FastAPI backend.
- Develop modern React/Next.js applications.
- Design scalable REST APIs.
- Model relational databases.
- Integrate external APIs.
- Build multi-agent AI workflows with LangGraph.
- Engineer structured LLM prompts.
- Deploy full-stack applications.
- Collaborate effectively using Git, branches, and pull requests.

---

## Project Vision

> **To build an intelligent AI recruitment assistant that transforms GitHub repositories into actionable hiring insights using modern full-stack development and multi-agent AI orchestration.**