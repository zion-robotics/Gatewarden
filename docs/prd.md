# Gatewarden PRD

## Problem
AI coding tools let anyone ship an app in days, but the code they write works without being safe. Vibecoders usually have no security background, so apps go live with SQL injection holes, IDOR (change /order/101 to /order/102 and read someone else's data), API keys in the frontend, and open Firebase or Supabase rules. Users' data gets exposed and the builder often never finds out. Security experts are too expensive for solo builders and students. Existing scanners speak in jargon, mostly send your code to a server, and only find problems without blocking attacks.

## Audience
Primary: solo builders, students and freelancers shipping apps made with AI tools (Lovable, Cursor, Bolt, Claude Code).
Context: many in Nigeria and across Africa, with expensive or unreliable data, who cannot upload private code to cloud tools freely.

## Product goals
1. Show a builder what is wrong with their app in plain language, in under a minute.
2. Give a paste-ready fix for every finding.
3. Keep source code private by default (on-device AI), with cloud as a fallback.
4. Block the most common attacks at runtime, not just report them.

## Non-goals
- Not a full penetration testing tool. No exploit payloads against sites the user does not own.
- Not a guarantee of security. The product reduces common risks and says so clearly.
- No full-repo scanning, auto-editing of user files, or mobile apps in this version.

## Success criteria (for the hackathon)
- Judge can run the demo from a link with no setup beyond a debug App Check token.
- Hybrid inference is visibly central: every AI result shows an on-device or cloud badge.
- Demo shows scan -> fix -> rescan with a score jump, and a live attack blocked by Gate.
- Scanner catches at least 90 percent of seeded issues in our vulnerable demo app, and shows our measured accuracy on a labeled test set.

## Features and acceptance criteria

### F1. Code scan (MVP)
User pastes a file or snippet.
- Detects: SQL injection, IDOR / missing ownership check, XSS, missing auth check, hardcoded secrets, inverted auth logic, missing input validation, eval of user input.
- Rules run in code first (fast), AI then explains findings.
- Each finding shows: severity, plain-English explanation, attack story, fix code, and a fix prompt for an AI coding tool.
- Works with input up to a size limit; larger input is split by file or function.
- Acceptance: for each rule, a vulnerable test snippet is flagged and a safe snippet is not.

### F2. Link scan (MVP)
User enters a URL of a site they own.
- Ownership check first: user adds a meta tag `gatewarden-verify=<token>` and we confirm it.
- Checks: security headers, HTTPS and redirects, secrets in frontend JavaScript, exposed files (.env, .git, source maps), open Firebase or Supabase config, cookie flags, open CORS.
- Passive only: reads what any browser can read. No payloads.
- Server fetch blocks private and internal addresses (SSRF guard), limits redirects, size and time.
- Acceptance: scanning our demo app returns the seeded issues; scanning an unverified site is refused.

### F3. Rules scan (MVP)
User pastes Firebase Security Rules or Supabase RLS policy or table definitions.
- Flags `allow read, write: if true`, missing ownership conditions, tables without RLS, overly open storage rules.
- Acceptance: seeded bad rules are flagged with a corrected version.

### F4. AI explanation with hybrid inference (MVP, core)
- Uses Firebase AI Logic hybrid inference: on-device Gemini Nano when available, cloud when not.
- Output is validated JSON; on failure retry once, then show raw findings without AI text.
- Badge on every AI result: "on-device" or "cloud".
- Remote Config can force on-device only, cloud only, or prefer on-device.
- Acceptance: with Nano available the badge says on-device; with it unavailable or forced off the badge says cloud and the result still renders.

### F5. Security score and rescan (MVP)
- Score 0 to 100 computed in code from finding severity, never by AI.
- Rescan after the user applies fixes shows before and after score.
- Acceptance: score is deterministic for the same input; fixing a critical finding raises the score.

### F6. Gate runtime middleware (MVP)
npm package `gatewarden-gate` for Express and Next.js.
- Blocks SQL injection and XSS patterns in requests, rate-limits brute force, adds security headers.
- Plain rules, no AI, so it adds almost no latency.
- Reports each blocked event to Gatewarden (project key required), stored in Firestore.
- Acceptance: an attack on our demo app is blocked with 403 and appears in the dashboard within a few seconds.

### F7. Dashboard and history (MVP)
- Google sign-in. List of past scans with score trend.
- Live feed of blocked attacks per project.
- Acceptance: a user sees only their own data; Firestore rules enforce it.

### F8. Chrome extension (MVP)
- One-click scan of the current page (own sites).
- Shows score badge on the toolbar icon and a short findings list.
- Reuses the same scanner and AI packages as the web app.
- Acceptance: load unpacked, open demo app, click, see findings.

### F9. Remote Config live updates (MVP)
- Keys: inference_mode, scan_rules_version, explain_prompt.
- Acceptance: changing a value in the console changes app behavior without redeploying.

### Stretch
Offline mode, Pidgin/Yoruba/Hausa/Igbo explanations, README score badge, secure-by-default rules file generator.

## UX principles
- Plain language first. No jargon without a one-line explanation.
- Lookout the meerkat is friendly, short sentences, never scary.
- Every result is actionable: what is wrong, how it is abused, how to fix it.
- Honest limits shown in the UI: a link scan cannot prove IDOR or SQL injection; no tool makes an app unhackable.

## Risks and mitigations
| Risk | Mitigation |
|---|---|
| Nano context window is small | Scan file by file, rules in code first, AI only explains |
| Nano unavailable on judge's machine | Cloud fallback and visible badge; test fallback before submitting |
| Crowded market | Lead with privacy (on-device), runtime Gate, and the extension together |
| Scope too big for 16 days | Cut order defined in plan.md; never cut hybrid badge, code scan, Gate, README, video |
| Link scanner abused against other people's sites | Ownership verification, passive only, rate limits, SSRF guard |
| Model returns bad JSON | Schema validation, retry once, fall back to raw findings |

## Submission requirements checklist
- Public repo with Apache-2.0 license visible in About
- Firebase AI Logic imported and called at runtime
- Hosted demo URL and testing instructions (debug App Check token, no secrets)
- Demo video under 3 minutes, public on YouTube, in English
- Text description: how Firebase AI Logic is used, features, value proposition
- Platform selected: Web/Chrome
- Disclose any pre-existing code
