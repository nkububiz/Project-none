# AGENTS.md

## Overview
KaziRemote is a remote job marketplace (employers post jobs, seekers pay via M-Pesa Till 4374253 to enroll, Google login, admin dashboard, dark mode). **The user requires HTML, CSS and JavaScript only**, so do not introduce frameworks, TypeScript or a frontend build step. Server code, when added, goes in Netlify Functions written in plain JS.

**Continue from [PLAN.md](./PLAN.md).** Milestone 1 (product surface) is done; start with milestone 2.

## Layout
- `netlify.toml`: publishes `public/`, with no build command
- `public/*.html`: one file per page. Each page holds its own logic in a small inline `<script>` at the bottom.
- `public/css/styles.css`: all styles. Theme tokens are at the top (`:root` = light, `[data-theme="dark"]` = dark). The palette is white, orange (`--brand`), grey and black (`--accent`). Keep new colors inside that family.
- `public/js/data.js`: **the only data layer.** Fixtures plus the `KaziStore` API (jobs, payments, users, session, enrollment). Backed by localStorage with a `kazi:` key prefix.
- `public/js/app.js`: shared UI, exposed as `window.Kazi`: header/footer injection (`#site-header`, `#site-footer`), theme toggle, Google sign-in stub, toasts, `jobCard()`, and the job detail dialog. Any element with `data-job="<id>"` opens the dialog.

- Unlimited catalog: `generatedJob(n)` in `data.js` builds job `g-<n>` from a seeded PRNG, so it's deterministic. `KaziStore.jobsPage({ match, sort, limit, cursor })` returns curated jobs first (merged by date for "recent") and then generated jobs without end. `getJob("g-<n>")` rebuilds any generated job. The jobs board pages through it with an IntersectionObserver.
- Hidden admin: the nav has no Admin link. `bindSecretLogo()` in `app.js` opens `/admin.html` after 5 logo taps within 3 seconds. A single tap still goes home after an 800 ms pause. This only hides the entry point and is **not** access control. Real protection is milestone 3.

## Conventions
- Pages must use `KaziStore` and never touch localStorage directly. Milestone 2 swaps the `KaziStore` internals for `fetch('/api/...')` calls. Expect to make its methods async and update callers.
- Escape all interpolated strings with `Kazi.esc()` when building HTML.
- Every page `<head>` has an inline script that sets `data-theme` before paint. Keep it when you add pages.
- Cross-page events: `kazi:auth` fires on sign-in and sign-out.
- Config such as the till number and enrollment fee lives in `CONFIG` in `data.js`. The fee (KES 500) is a placeholder.

## Non-obvious decisions
- The enrollment flow is "pay the till manually, then submit the M-Pesa transaction code, then an admin verifies". This works without Daraja credentials. Daraja STK Push is an optional later milestone.
- The admin page is not protected yet. It must be gated by the Identity `admin` role in milestone 3, both in the UI and in the API.
