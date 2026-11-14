# Gatewarden Architecture

## Monorepo layout
gatewarden/
  apps/
    web/            React + Vite + TS + Tailwind (dashboard, scanner UI)
    extension/      Chrome MV3 (Vite build), Lookout for Chrome
  packages/
    scanner/        Pure TS rules engine, shared by web + extension (no AI, no network)
    gate/           npm middleware (Express/Next) that blocks attacks
    ai/             Firebase AI Logic wrapper (hybrid inference + badge)
  api/              Vercel serverless routes (link fetch, ingest)
  demo/
    vulnerable-app/ Our own deliberately insecure app for the demo
  docs/
  LICENSE           Apache-2.0

## Flow: code scan (on-device first)
paste code -> scanner (rules, instant) -> findings[]
  -> ai.explain(findings) via Firebase AI Logic hybrid
     -> on-device Nano if available, else cloud
  -> UI shows findings + attack story + fix prompt + badge (on-device | cloud)
  -> score computed in code (not by AI) -> saved to Firestore

## Flow: link scan
user enters URL -> must pass ownership verification
  -> POST /api/scan (Vercel route) fetches page + headers + JS bundles
  -> scanner checks (headers, secrets, files, CORS, cookies, Firebase/Supabase config)
  -> findings -> ai.explain -> UI -> Firestore

## Flow: Gate (runtime)
user app uses gatewarden-gate middleware
  -> request checks (SQLi, XSS patterns, rate limit, headers) in plain code
  -> blocked? respond 403 + POST /api/ingest {projectKey, type, ts, ip hash}
  -> /api/ingest writes to Firestore -> dashboard live feed (onSnapshot)

## AI layer (packages/ai)
- Uses Firebase AI Logic hybrid inference (prefer on-device, fall back to cloud)
- Always returns { result, source: "on-device" | "cloud" } for the badge
- Remote Config key `inference_mode`: prefer_on_device | on_device_only | cloud_only
- Remote Config key `scan_rules_version` and `explain_prompt` for live updates
- Output must be JSON validated against a schema. On parse failure, retry once, then show raw findings without AI text.
- Chunk code by file/function to fit Nano context. Never send a whole repo.
- Verify the exact hybrid API names in the Firebase AI Logic docs before coding.

## Firebase usage
- Project ID: gatewarden-29 (Spark plan)
- AI Logic: hybrid explanations
- App Check: required, reCAPTCHA in prod, debug token for judges and local
- Auth: Google sign-in
- Firestore: users/{uid}/scans/{scanId}, users/{uid}/projects/{projectId}, attacks/{projectId}/events/{eventId}
- Remote Config: inference_mode, scan_rules_version, explain_prompt

## Firestore rules (principle: users only read and write their own data)
- users/{uid}/** : read, write only if request.auth.uid == uid
- attacks/{projectId}/events: write only from server (Admin SDK), read only by project owner
- Never allow `if true`. We are a security tool, so our own rules are part of the demo.

## Security rules for our own app
- Link scan server fetch must block private IPs, localhost, link-local and metadata IPs (SSRF protection), limit redirects, size and time.
- Ownership verification before any link scan: user adds meta tag `gatewarden-verify=<token>`, we check it.
- Rate limit /api/scan and /api/ingest.
- No secrets in client code. Server keys only in Vercel env vars.
- Passive scanning only: no payloads, no brute force, no login attempts.

## Data model
Scan { id, type: link|code|rules, target, score, findings[], source, createdAt }
Finding { id, rule, severity, title, evidence, attackStory, fixPrompt, fixCode }

## Deployment
- Web + API: Vercel
- Extension: loaded unpacked for judges, zip in repo releases
- Firebase: Spark plan (no Cloud Functions)
