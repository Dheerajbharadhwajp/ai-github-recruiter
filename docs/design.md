# 🎨 GitHire AI - Design System

> Version 1.0

---

# Brand Identity

GitHire AI is a modern AI-powered recruitment platform that analyzes GitHub profiles using multiple AI agents.

The UI should feel:

- Modern
- Premium
- Minimal
- Fast
- Intelligent

Our inspiration comes from:

- OpenAI
- Vercel
- Linear
- GitHub
- Cursor AI

---

# Design Principles

## 1. Minimalism

Remove unnecessary elements.

Every component must have a purpose.

---

## 2. Consistency

Never randomly change:

- Colors
- Font sizes
- Border radius
- Shadows

Reuse existing components whenever possible.

---

## 3. Accessibility

Maintain high contrast.

Buttons must always have hover states.

Clickable elements should be obvious.

---

## 4. Performance

Avoid heavy animations.

Animations should improve UX, not distract.

---

# Typography

Primary Font

Geist

Secondary Font

Geist Mono

Only use Geist Mono for:

- Code
- GitHub repository names
- File paths

---

# Color Palette

Background

#09090B

Surface

#18181B

Elevated Surface

#27272A

Primary

#3B82F6

Accent

#8B5CF6

Text Primary

#FAFAFA

Text Secondary

#A1A1AA

Success

#22C55E

Warning

#FACC15

Danger

#EF4444

---

# Border Radius

Buttons

rounded-xl

Cards

rounded-2xl

Dialogs

rounded-2xl

Inputs

rounded-xl

Never use square corners.

---

# Shadows

Use subtle shadows only.

Preferred

shadow-lg

Avoid

shadow-2xl

unless absolutely necessary.

---

# Icons

Only use:

Lucide React

Never mix icon libraries.

---

# Components

Always use shadcn/ui components whenever available.

Preferred:

Button

Card

Input

Dialog

Tooltip

Skeleton

Sheet

Badge

Progress

---

# Buttons

Primary

Blue background

Secondary

Outline

Danger

Red

Ghost

Transparent

---

# Navigation

Navbar

Glassmorphism

Sticky

Blur background

Footer

Minimal

Muted colors

---

# Cards

Cards should use:

Dark background

Subtle border

Rounded corners

Soft hover effect

---

# Layout

Container Width

max-w-7xl

Section Padding

py-24

Horizontal Padding

px-6

Desktop

px-10

---

# Spacing

Small

gap-2

Medium

gap-4

Large

gap-8

Section

gap-12

---

# Animations

Allowed

Fade

Scale

Slide

Hover Lift

Forbidden

Bounce

Flash

Spin

unless used for loading.

---

# Charts

Library

Recharts

Theme

Dark

Rounded Corners

Yes

Grid

Minimal

---

# Dashboard Style

Sidebar

Dark

Cards

Glass

Statistics

Animated

Charts

Minimal

Chat

OpenAI-inspired

---

# Hero Style

Large heading

Two-line title

Short subtitle

Primary CTA

GitHub search bar

Background glow

---

# Loading States

Always use Skeleton components.

Never leave empty space.

---

# Responsive Breakpoints

Mobile

<768px

Tablet

768px - 1024px

Desktop

>1024px

---

# Git Rules

One feature = one branch.

One feature = one pull request.

Small commits.

Clear commit messages.

---

# Naming Convention

Components

PascalCase

Navbar.tsx

FeatureCard.tsx

Hero.tsx

Hooks

camelCase

useGithub.ts

Utilities

camelCase

calculateScore.ts

Types

PascalCase

Candidate.ts

Repository.ts

---

# Engineering Philosophy

If a component already exists,
reuse it.

If a design decision is already documented,
follow it.

Never introduce inconsistent UI.

Consistency over creativity.

---

Version

1.0