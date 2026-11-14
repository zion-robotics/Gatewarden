# Gatewarden Plan (Nov 13 to Nov 29, submit Nov 29)

Daily rule: end each day with something that runs. Cut scope before cutting sleep.

## Nov 13 to 15: Foundation
- [ ] Firebase: register web app, enable Auth, Firestore, AI Logic, App Check
- [ ] Monorepo scaffold, Vite app, env file, .gitignore, Apache-2.0 license
- [ ] Hybrid AI call works and shows on-device vs cloud badge
- [ ] Google sign-in works
Verify: badge shows a real source label.

## Nov 16 to 18: Scanner core
- [ ] packages/scanner with 8 code rules (SQLi, IDOR, XSS, missing auth, hardcoded secrets, inverted auth, missing validation, eval)
- [ ] Rules scan: Firebase rules + Supabase RLS
- [ ] Score function + unit tests
- [ ] Code scan UI with findings list
Verify: tests pass on a set of vulnerable and safe snippets.

## Nov 19 to 21: AI + link scan
- [ ] ai.explain with schema, attack story, fix prompt
- [ ] Vercel /api/scan with SSRF protection + ownership verification
- [ ] Link checks (headers, secrets in JS, exposed files, source maps, cookies, CORS, open Firebase/Supabase)
- [ ] Scan history in Firestore
- [ ] Rescan with before/after score
Verify: scan our demo app and get a real report.

## Nov 22 to 24: Gate + dashboard
- [ ] packages/gate middleware (SQLi, XSS, rate limit, headers)
- [ ] /api/ingest + attacks feed with onSnapshot
- [ ] Remote Config: inference_mode, rules version, prompt
- [ ] Vulnerable demo app
Verify: run an attack on the demo app, see it blocked and listed live.

## Nov 25 to 26: Extension
- [ ] MV3 extension: scan current page, score badge on icon
- [ ] Reuses packages/scanner and packages/ai
Verify: load unpacked, scan the demo app in one click.

## Nov 27: Polish + video
- [ ] Meerkat branding, empty and error states, mobile layout
- [ ] Test on a Nano-less setup to confirm cloud fallback
- [ ] Record 3 minute video (see scope demo goal), upload to YouTube public

## Nov 28 to 29: Submit
- [ ] README (value prop, setup, how Firebase AI Logic is used, honest limits)
- [ ] Hosted URL, debug App Check token in testing instructions, no secrets
- [ ] Devpost: description, platform = Web/Chrome, repo link, YouTube link, existing-code disclosure
- [ ] Submit Nov 29 (deadline Nov 30, 11 PM Lagos time)

## If behind schedule, cut in this order
1. Stretch extras (Pidgin, offline, badges)
2. Supabase part of rules scan
3. Extension features beyond one-click scan
Never cut: hybrid AI badge, code scan, Gate demo, README, video.
