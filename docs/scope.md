# Gatewarden Scope

## One line
The private lookout for your app: scans on-device, guards at runtime, tells you how to fix it.

## Users
Solo vibecoders, students and freelancers who ship apps built with AI tools and have no security background. Includes builders with low or patchy data.

## Platforms
- Web app (React + Vite + TypeScript)
- Chrome extension (MV3)

## In scope (MVP)
1. Link scan: headers, exposed files, source maps, frontend secrets, open Firebase/Supabase, cookie flags, CORS. Own sites only, with ownership verification.
2. Code scan: single file or snippet. SQLi, IDOR, XSS, missing auth, hardcoded secrets. Runs on-device.
3. Rules scan: Firebase rules, Supabase RLS.
4. AI explanation per finding: severity, attack story, paste-ready fix prompt. Badge shows on-device or cloud.
5. Security score 0 to 100 with before/after rescan.
6. Gate: drop-in middleware (Express/Next) blocking SQLi, XSS, brute force, plus rate limit and headers. Live blocked-attacks feed.
7. Google sign-in and Firestore scan history.
8. Remote Config: push new rules and prompts, force on-device or cloud.
9. Chrome extension: scan the current page with one click.

## Stretch (only if time remains)
Offline mode, Pidgin/Yoruba/Hausa explanations, README score badge, secure-by-default rules file generator.

## Out of scope
Full repo scanning, auto-editing user files, active penetration testing, mobile apps, role-based IDOR testing, PDF export.

## Rules we follow
- Passive scanning only, own sites only.
- No secrets in the repo. `.env.example` only.
- Public repo with Apache-2.0 license.
- Free to use and test. Debug App Check token for judges.

## Demo goal (3 minutes)
Vulnerable demo app -> scan it -> see findings and score -> paste fix -> rescan, score jumps -> run a live attack, Gate blocks it -> show Remote Config flipping on-device/cloud.

## Done means
Everything above in MVP works end to end, deployed, with a README and a 3 minute video.

## Brand
- Name: Gatewarden (repo, package and project IDs in lowercase: gatewarden)
- Mascot: meerkat called Lookout
- Parts: Scan (link, code, rules), Gate (runtime middleware), Extension
- Tagline: the private lookout for your app
