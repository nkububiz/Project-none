# KaziRemote — Product Roadmap

KaziRemote is a remote job marketplace. Employers post jobs, job seekers enroll by paying a one-time fee to M-Pesa Till **4374253**, and an admin team reviews listings and verifies payments. Everyone signs in with Google. Dark mode is supported throughout.

The stack stays **HTML, CSS and vanilla JavaScript** on the frontend. Server-side pieces are Vercel Serverless Functions (plain JS) with Vercel Postgres and Google OAuth.

---

## Milestone 1 — Product surface ✅ (done)
- Landing page, jobs board (search, category/type filters, sort, job detail dialog), Post a job (form + live preview), Enroll (M-Pesa till instructions + transaction-code form), and Admin dashboard (overview, job review, payment verification, users).
- White / orange / grey / black theme with a dark mode, and a saved preference.
- Unlimited auto-seeded job catalog with infinite scroll, plus a hidden admin entry (5 logo taps in 3 seconds).
- All data comes from `public/js/data.js` (`KaziStore`) with a localStorage-backed demo store. Google sign-in is a demo stub.

## Milestone 2 — Data model & API
- Database tables: `users`, `jobs`, `payments`, `applications`.
- Vercel Serverless Functions (`/api/jobs`, `/api/payments`, `/api/applications`) for listing, creating and updating records.
- Replace the `KaziStore` methods with `fetch` calls; pages stay unchanged. Keep the generated catalog as a server-side fallback feed, or seed the `jobs` table in batches.

## Milestone 3 — Google login & roles
- Google OAuth provider; replace `signInDemo()` with the real sign-in.
- Roles: `seeker`, `employer`, `admin`. Protect the admin page and admin API routes server-side. The hidden logo gesture stays as the way in, but behind a real login.
- Employers see a "My listings" view with their jobs and applicants.

## Milestone 4 — M-Pesa enrollment
- Server-side validation of submitted transaction codes (unique, correct format, correct amount).
- Optional: Safaricom Daraja API integration — STK Push (Buy Goods, Till 4374253) so the payment prompt appears on the seeker's phone automatically, plus a callback function that marks payments verified without manual review. Requires Daraja credentials from the till owner, stored as environment variables.
- Manual admin verification stays as the fallback.

## Milestone 5 — Applications & notifications
- Seekers apply with a CV upload and a cover note; employers view applicants per job.
- Email notifications for payment verified, application received and listing approved.

## Milestone 6 — Polish & launch
- Admin analytics on real data, CSV export of payments.
- SEO: per-job pages, sitemap, Open Graph images.
- Accessibility and performance pass; terms, privacy and refund policy pages.

## Open questions for the product owner
- Confirm the enrollment fee (currently a KES 500 placeholder in `public/js/data.js`).
- Is enrollment lifetime, or does it expire (e.g. yearly)?
- Should employers pay to post or feature listings?
- Who are the admins (Google emails to grant the admin role)?
