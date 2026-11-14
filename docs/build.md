# Build Rules (read this before every task)

You are building Gatewarden, a security tool for vibecoded apps. Read docs/scope.md, docs/prd.md, docs/architecture.md and docs/plan.md first.

## Working style
- One task at a time from docs/plan.md. Finish it, run it, then stop and report.
- Small commits with clear messages. Do not touch files unrelated to the task.
- Ask before adding any new dependency. Prefer the standard library and what is already installed.

## Stack
React + Vite + TypeScript + Tailwind, Firebase JS SDK (AI Logic, App Check, Auth, Firestore, Remote Config), Vercel API routes, Chrome MV3. Node 20+.

## Commands
- npm install
- npm run dev        (web app)
- npm run build
- npm test           (scanner and gate unit tests)
- npm run lint

## Hard rules
1. Never commit secrets. Use .env.local and keep .env.example up to date.
2. Firebase AI Logic must actually be imported and called at runtime (hackathon requirement).
3. Scoring is computed in code. AI only explains findings, never decides the score.
4. AI output must be parsed against a schema. Never render raw model text as HTML (avoid XSS in a security tool).
5. All server fetches of user URLs must go through the SSRF guard.
6. Passive scanning only. No exploit payloads against third-party sites.
7. Every scanner rule needs a vulnerable test case and a safe test case.
8. Firestore rules must never allow `if true`.
9. Keep scope: do not build anything listed as out of scope.

## Definition of done for a task
- It runs locally with no console errors.
- Tests for the new code pass.
- Loading, empty and error states exist.
- The on-device/cloud badge appears wherever AI output appears.
- You told me exactly how to verify it, in 3 steps or fewer.

## Style
- TypeScript strict mode, no `any` unless justified in a comment.
- Plain, friendly UI copy. Lookout (the meerkat) speaks in short sentences.
- Responsive from 360px wide.
- Do not use em dashes in UI text or docs.

## When unsure
Stop and ask. Do not guess Firebase API names: read the current Firebase AI Logic hybrid inference docs first.
