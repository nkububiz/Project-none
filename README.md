# KaziRemote

A remote job marketplace for African talent. Employers post remote jobs, job seekers enroll with a one-time M-Pesa payment to Till **4374253** and then apply to any listing, and admins review listings and verify payments. Includes Google sign-in and a white, orange, grey and black theme with a matching dark mode. The jobs board has an unlimited, always-full catalog that loads as you scroll.

## Tech
- Plain **HTML, CSS and JavaScript**, no frontend framework
- Hosted on **Vercel** (`vercel.json`, built to `dist/` with clean URL routing)
- Planned: Vercel Serverless Functions (`/api/*`), Vercel Postgres, and OAuth for the backend

## Pages
| Page | Path | Clean URL |
| --- | --- | --- |
| Landing | `index.html` | `/` |
| Jobs board | `jobs.html` | `/jobs` |
| Post a job (employers) | `post-job.html` | `/post-job` |
| Enroll via M-Pesa (seekers) | `enroll.html` | `/enroll` |
| Admin dashboard (hidden) | `admin.html` | `/admin` (or tap logo 5× in 3s) |

## Unlimited jobs
After the curated listings, `public/js/data.js` generates jobs on demand from their index (`g-0`, `g-1`, …). Each one is deterministic, so every visitor sees the same job with the same id, and the board loads 20 more each time you scroll to the bottom.

## Run locally
```bash
npm run dev
# or build for Vercel
npm run build
```

## Current state
The full product surface is clickable and runs on sample data from `public/js/data.js`. Sign-in, job submissions, payments and admin actions are saved in your browser only, so the flows can be demoed end to end. Use the **reset** link in the footer to restore the sample data.

## Roadmap
See [PLAN.md](./PLAN.md): data model and APIs → real Google login and roles → M-Pesa verification (optionally Daraja STK Push) → applications and notifications → launch polish.
