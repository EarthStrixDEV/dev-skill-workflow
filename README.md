<div align="center">

# Dev Skill Workflow

**The right skill at the right moment.**
An animated, bilingual (Thai / English) infographic that maps Claude Code skills onto real software-development work, plus a searchable skill library with install instructions.

[![Live site](https://img.shields.io/badge/live-skill--workflow--infographic.vercel.app-5030e8?style=for-the-badge&logo=vercel&logoColor=white)](https://skill-workflow-infographic.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-14-ff0f7b)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)

[Live site](https://skill-workflow-infographic.vercel.app) · [Skill library](https://skill-workflow-infographic.vercel.app/library) · [Repository](https://github.com/EarthStrixDEV/dev-skill-workflow)

</div>

---

## Table of contents

- [What it is](#what-it-is)
- [Highlights](#highlights)
- [Pages and content](#pages-and-content)
- [Animations](#animations)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Editing the content](#editing-the-content)
- [Accessibility and performance](#accessibility-and-performance)
- [Deployment](#deployment)
- [Known limitations](#known-limitations)
- [Third-party software and license](#third-party-software-and-license)

## What it is

Claude Code ships with a growing catalogue of skills, commands and plugins. Knowing *which one to reach for, and when* is the hard part. **Dev Skill Workflow** answers that with two things:

1. **A visual workflow** that walks through the whole development loop (setup, clarify, plan, build, run, review, ship, wrap up) and six everyday use cases, showing the skills and agents to use at every step.
2. **A skill library** that lists every skill and command referenced in the workflow, where it comes from, and the exact command to install it. Nothing is redistributed: the site only shows how to install things and links to the original sources.

The whole site is a statically prerendered Next.js app. There is no backend, no database and no tracking.

## Highlights

- **Six use cases**, each with an animated step-by-step timeline: new feature, fix bug, improve performance, migration, refactoring / clean code, and code review.
- **A 7-step overview** (plus a once-per-repo setup step) and **work-size tiers** that show which steps a small, medium or large change needs.
- **Skill library** at `/library` with 23 entries (21 skills and 2 commands) from 5 sources, full-text search, filters for type / source / use case, an item dialog showing where each entry is used in the workflow, and one-click copy buttons for install commands.
- **Thai and English** content, switchable at runtime with the choice remembered, and **light and dark themes** with no flash on load.
- **17 [React Bits](https://reactbits.dev) animation components**, used with restraint: one WebGL effect, everything else lightweight.
- **Accessible by default:** keyboard-navigable tabs, a native modal dialog, skip link, visible focus rings, `prefers-reduced-motion` support and screen-reader text for animated numbers.
- **No new runtime dependency beyond `motion`.**

## Pages and content

### `/` Home

| Section | What you get |
| --- | --- |
| **Hero** | Animated title, a rotating line that cycles through the six use cases, a neon ring of the seven workflow steps, live stats (steps, use cases, skills, agents) and the primary call to action. |
| **Skill band** | A scroll-reactive marquee of every skill name. |
| **Use cases** | A 3x2 grid of cards. Selecting one opens its steps below. |
| **Steps** | Tabs for the six use cases. Ordered use cases render as a timeline whose nodes light up one after another; the review use case renders as independent check cards. A sticky summary shows notes and the skill / command / agent legend. |
| **Overview** | The 7-step general workflow plus the once-per-repo setup step, with the skills for each step. |
| **Work size** | Small, medium and large tiers showing which steps to use. |

The six use cases:

| Use case | Steps | Focus |
| --- | --- | --- |
| New requirement / feature | 6 | Clarify, plan, build with tests, run it, review, ship with docs. |
| Fix bug | 5 | Triage, find the root cause, failing test first, confirm in the real app, review. |
| Improve performance | 5 | Measure a baseline, find the bottleneck, tune only what was measured, re-measure, review. |
| Migration | 6 | Code / version upgrades and database / data migrations (not infrastructure), in small phases with a way back. |
| Refactoring / clean code | 5 | Find what to improve, lock behaviour with tests, restructure in small steps, run it, tidy and review. |
| Check / review code | 5 | Independent checks: correctness, simplification, security, release readiness, whole-codebase debt. |

### `/library` Skill library

- **Install by source.** One card per source with the commands to type into Claude Code, a *Copy* button per line and a *Copy all* button.
- **Search and filter.** Search by name or description and filter by type (skill / command), source and use case.
- **Item dialog.** Opens as a native modal: summary, where the entry is used in the workflow, install steps and a link to the original source.

| Source | Entries | How to get it |
| --- | --- | --- |
| `claude-mem` | 8 skills | `/plugin marketplace add thedotmack/claude-mem` then `/plugin install claude-mem` |
| `engineering` | 8 skills | `/plugin marketplace add anthropics/knowledge-work-plugins` then `/plugin install engineering@knowledge-work-plugins` |
| `feature-dev` | 1 command | `/plugin install feature-dev@claude-plugins-official` |
| `mattpocock-skills` | 2 skills | `/plugin install mattpocock-skills@claude-plugins-official` |
| Claude Code (built in) | 3 skills + 1 command | Nothing to install |

> The agents named in the workflow (for example `backend-engineer` or `qa-engineer`) are custom agent definitions. They are shown for context and are not part of the library because there is no public source to install them from.

## Animations

All animations are copied verbatim from the [React Bits](https://reactbits.dev) registry (TS + Tailwind variants) into `src/components/react-bits/` and are byte-for-byte identical to the published source.

| Component | Where it is used |
| --- | --- |
| `Aurora` | Hero background (the only WebGL effect; replaced by a CSS gradient on phones or without WebGL2) |
| `BlurText` | Hero title |
| `ShinyText` | Hero subtitle |
| `CountUp` | Hero stats and overview step numbers |
| `Magnet` | Header toggles and hero buttons |
| `SpotlightCard` | Step cards and install cards |
| `GradientText` | Every section heading |
| `RotatingText` | Hero line that cycles through the use cases |
| `TrueFocus` | Library page title |
| `DecryptedText` | Item names in the library (on hover) |
| `ScrollVelocity` | Skill-name band on the home page |
| `GlareHover` | Library item cards (light follows the pointer) |
| `StarBorder` | Primary hero button |
| `ClickSpark` | Install section (sparks when you copy a command) |
| `Noise` | Static grain on the hero panel (hidden on phones) |
| `Counter` | Result count in the library (rolls as filters change) |
| `PixelCard` | Work-size cards |

The step timeline, scroll reveals and page chrome are built directly with [Motion](https://motion.dev).

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16.4 (App Router, Turbopack, Cache Components) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config`) via `@tailwindcss/turbopack` |
| Animation | [Motion](https://motion.dev) 14 and [React Bits](https://reactbits.dev) |
| Fonts | Inter and Noto Sans Thai through `next/font` |
| Linting | ESLint 9 with `eslint-config-next` |
| Hosting | [Vercel](https://vercel.com) (CLI deployments) |

## Getting started

**Prerequisites:** Node.js 20.9 or newer (developed on Node 22) and npm.

```bash
git clone https://github.com/EarthStrixDEV/dev-skill-workflow.git
cd dev-skill-workflow
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

For the closest match to production, run `npm run build && npm run start`.

> **Heads up:** this project uses Next.js 16 and the `AGENTS.md` file at the repo root asks contributors (and coding agents) to read the bundled guides in `node_modules/next/dist/docs/` before writing code, because APIs differ from older versions.

## Project structure

```text
.
├── public/                      Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx           Fonts, metadata, and the pre-paint theme / language script
│   │   ├── globals.css          Design tokens, dark variant, language switching rules
│   │   ├── page.tsx             Home page
│   │   └── library/page.tsx     Skill library page
│   ├── content/                 All text and data (no copy lives in components)
│   │   ├── workflow.ts          Steps, use cases, size tiers, derived stats
│   │   ├── library.ts           Library entries, sources and install commands
│   │   ├── ui.ts                Home-page strings (Thai / English)
│   │   ├── libraryUi.ts         Library-page strings (Thai / English)
│   │   └── types.ts             Shared types
│   └── components/
│       ├── sections/            Home sections (Hero, Explorer, FlowPanel, Overview, Sizes, ...)
│       ├── library/             Library UI (InstallStrip, LibraryExplorer, ItemCard, ItemDialog, ...)
│       ├── ui/                  Shared pieces (Lang, Toggles, ToolChip, Reveal, FreshOnShow, ...)
│       └── react-bits/          Third-party animation components, kept verbatim
├── AGENTS.md                    Notes for coding agents (Next.js 16 guidance)
├── THIRD_PARTY.md               React Bits license notice
├── eslint.config.mjs            ESLint config (ignores src/components/react-bits)
└── next.config.ts               Cache Components, partial prefetching, Tailwind loader
```

## How it works

### Content-driven pages
Every string and list on the site lives in `src/content`. Components only render data. Numbers such as "6 use cases" or "21 skills" are **computed from that data**, so they cannot drift from what is shown.

### Bilingual without a router
Each translatable string is rendered in both languages and a small CSS rule hides the inactive one (`html[data-lang="th"] .lang-en { display: none }`). Switching is instant, needs no React state, and causes no hydration mismatch. Skill and agent names are never translated.

### Theme and language before first paint
A tiny inline script in `layout.tsx` reads the saved preference from `localStorage` and sets `data-lang` and the `.dark` class on `<html>` before the browser paints, following the "prevent flash before hydration" guidance in the Next.js docs. The defaults are Thai and the light theme.

### Design tokens
Colours, radii and fonts are CSS variables declared in `globals.css` and mapped into Tailwind v4 with `@theme inline`. The palette follows a violet, near-black and lavender-white scheme: brand `#5030e8`, ink `#0b0b14`, page `#f6f5fb`, with soft blue and lime accents. Dark mode overrides the variables under `.dark`.

### Cache Components and effect safety
Next.js 16 Cache Components can hide a page when you navigate away and re-show it later, re-running effects on the *same* DOM. Some third-party effects do not survive that (a WebGL context that was released on cleanup, or a cancelled animation frame id that is never reset). Two small wrappers handle it:

- `FreshOnShow` renders a plain fallback on the server, mounts its children on the client, and unmounts them again on cleanup so a re-show creates a brand-new instance.
- `MountWhenVisible` mounts children only while they are near the viewport, so frame loops never run off-screen.

`HeroBackground` follows the same pattern for the Aurora canvas. `RotatingText` also renders through `FreshOnShow` because it calls `Math.random()` during render, which Next.js 16 rejects while prerendering.

### Canvas colours
Several React Bits components parse colours in JavaScript (`StarBorder`, `ClickSpark`, `PixelCard`). CSS variables do not work there, so those props receive hex values that read well on both themes.

## Editing the content

**Add or change a use case.** Edit `useCases` in `src/content/workflow.ts`. Each use case has an `id`, bilingual `name` and `tagline`, an `accent` colour, whether its steps are `ordered`, an optional `note`, and a list of steps (`title`, `desc`, `outcome`, `tools`). New ids must also be added to the `UseCaseId` type and, if you introduce a new `accent`, to the skin map in `UseCaseBento.tsx`. The home page, tabs, library filters and stats update automatically.

**Add a skill or command.** Reference it in a step with `skill("name")`, `command("name")` or `agent("name")` in `workflow.ts`, then add a matching entry (bilingual summary, source, kind) to `libraryItems` in `src/content/library.ts`. Skills and commands used in the workflow must exist in the library with the same name and kind; agents are intentionally excluded.

**Add an install source.** Add a provider to `providers` in `library.ts` with its commands and a link to the original repository. Only add commands you have verified against the project's own documentation.

**Translate or reword.** Change the `th` / `en` pairs in `src/content/*`. Every pair must have both languages.

## Accessibility and performance

**Accessibility**
- Skip-to-content link, semantic landmarks and visible `:focus-visible` rings.
- The use-case selector is a proper ARIA tablist with arrow-key, Home and End support.
- The skill dialog is a native `<dialog>` (focus trap, Escape to close, focus restored).
- Filter chips expose `aria-pressed`; result counts use `role="status"`; animated numbers keep an accessible text equivalent.
- `prefers-reduced-motion` is respected: timelines render instantly, sparks are disabled and the CSS animations are neutralised.
- Thai text is never split character by character, so vowels and tone marks stay attached.

**Performance**
- Both routes are statically prerendered.
- One WebGL canvas in total, disabled on small screens and when WebGL2 is unavailable (a CSS gradient takes over).
- Off-screen effects are unmounted or paused (`MountWhenVisible`, IntersectionObserver gating in the animation components).
- The grain overlay is static and skipped on phones.
- The only animation dependency is `motion`; React Bits components are copied in, not installed.

## Deployment

The site is deployed with the Vercel CLI, without a Git integration.

```bash
npm i -g vercel
vercel login
vercel          # preview deployment
vercel --prod   # production deployment
```

Notes:
- The very first deployment of a new Vercel project is always a production deployment, even without `--prod`.
- Preview URLs are protected by Vercel Authentication; the production domain is public.
- No environment variables are required.

## Known limitations

- There is no automated test suite yet. Changes were checked with `tsc`, ESLint, a production build and manual browser testing (desktop, phone-width, dark mode, English, reduced motion, repeated navigation between pages).
- Safari, Firefox and real mobile devices have not been tested.
- Install commands come from each project's documentation or README and have not been executed end to end.
- The project's own code has no license file yet (see below).

## Third-party software and license

- **React Bits** components in `src/components/react-bits/` are used under the *MIT + Commons Clause* license. They may be used inside a website, including commercially, but must not be sold, sublicensed or redistributed as components. The full notice is in [`THIRD_PARTY.md`](./THIRD_PARTY.md), and the footer credits *Animations by React Bits*.
- Skill and plugin names, descriptions and install commands belong to their respective projects: [claude-mem](https://github.com/thedotmack/claude-mem), [knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins), [claude-plugins-official](https://github.com/anthropics/claude-plugins-official), [mattpocock/skills](https://github.com/mattpocock/skills) and the [Claude Code documentation](https://code.claude.com/docs/en/commands).
- This repository does not yet declare a license for its own code. Until one is added, all rights are reserved by default.
