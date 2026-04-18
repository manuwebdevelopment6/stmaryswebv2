# MERN Spec → Lovable Stack Mapping

The master AI prompt was written for a Next.js + Express + MongoDB monorepo. This project is built on Lovable, which uses a different (and equally capable) stack. This doc tracks the mapping so we can port back to MERN later if ever needed.

| MERN spec component | Lovable equivalent we use | Notes |
|---|---|---|
| **Next.js 14 App Router (SSR/SSG)** | **React 18 + Vite + react-router-dom** | Client-rendered SPA. SEO via per-page `<Seo />` helper that updates `<title>`, meta description, canonical at runtime. Add prerendering (e.g. via Lovable's static export) before launch if KCSE/admissions pages need crawler-priority content. |
| `next/image` | Plain `<img>` with `loading="lazy"`, explicit `width`/`height`, ES6 imports from `src/assets/` | Vite handles bundling/hashing. Use Cloudinary later for runtime transforms. |
| `next/font` | Google Fonts `@import` in `src/index.css` (Playfair Display, DM Sans, JetBrains Mono) | Tradeoff: small CLS risk vs. zero-config. Self-host if Lighthouse demands. |
| **Express.js + REST/GraphQL** | **Supabase Edge Functions (Deno)** under `supabase/functions/<name>/index.ts` | One function per use case (e.g. `mpesa-stk-push`, `chat`, `application-submit`). |
| **MongoDB Atlas + Mongoose** | **Lovable Cloud Postgres + Row-Level Security** | Schemas become SQL tables + RLS policies. `students`, `results`, `fees`, `applications`, `news`, `events`, etc. all map to relational tables (often cleaner than the original Mongo refs). |
| **Pinecone (vector RAG)** | **Postgres `pgvector` extension** | Embeddings stored in a `documents` table with a `vector` column; cosine search via SQL. |
| **OpenAI embeddings + Anthropic Claude** | **Lovable AI Gateway** (`google/gemini-3-flash-preview` default) | No API key setup. For embeddings use a dedicated embedding model via the gateway. |
| **NextAuth.js v5 (JWT, Google OAuth, magic link)** | **Supabase Auth** (email/password, Google OAuth, magic link, password reset) | Roles in a separate `user_roles` table + `has_role()` SECURITY DEFINER function (never on profiles — RLS recursion + privilege escalation risk). |
| **Helmet, express-rate-limit, CORS** | Edge Functions: built-in CORS headers; rate limiting via Upstash Redis or Postgres counter table | Helmet headers handled by Supabase platform on hosted functions. |
| **Multer + Cloudinary uploads** | **Supabase Storage buckets** (or Cloudinary later if richer transforms needed) | Cleaner per-bucket RLS than custom Multer middleware. |
| **Bull (Redis) job queue** | **`pg_cron` + Edge Function triggers** | Daily M-Pesa reconciliation, fee reminder SMS batches, etc. |
| **Nodemailer + SendGrid** | **Resend connector** (or SendGrid via fetch from Edge Function) | Resend is one-click via Lovable's Standard Connectors. |
| **Africa's Talking SMS** | Custom Edge Function calling AT REST API; key stored as Lovable secret | Same flow as M-Pesa. |
| **M-Pesa Daraja v2 (STK Push / C2B)** | Custom Edge Function `mpesa-stk-push` + `mpesa-callback` (public, no JWT) | Secrets: `DARAJA_CONSUMER_KEY`, `DARAJA_CONSUMER_SECRET`, `DARAJA_PASSKEY`, `DARAJA_SHORTCODE`. Sandbox first. |
| **Pesapal cards** | **Lovable Stripe Payments (built-in)** for cards, OR Pesapal via Edge Function if KES-specific MoR needed | Stripe is one-click and recommended. |
| **Vercel + Railway + GH Actions CI/CD** | **Lovable's built-in publish** + automatic preview URLs | Push-to-deploy is implicit. Custom domain via Lovable Project Settings. |
| **Cloudflare CDN** | Lovable's edge network (already in front of all published sites) | Add Cloudflare in front later for DDoS / WAF if needed. |
| **Sentry / Better Uptime** | Plug Sentry into the Vite app + Edge Functions in a polish phase | Not in early phases. |
| **Mapbox / Pannellum** | Same libraries; we'll add via npm when we reach Virtual Tour & Contact-map sections | No change. |
| **Recharts, Framer Motion, React Hook Form, Zod, TipTap, Lucide, Zustand, React Query** | **All identical** — already on the Lovable stack or trivially `npm install`-able | Framer Motion already added in Phase 1. |

## Things deliberately deferred / dropped
- TypeScript strict mode, full Jest/Playwright coverage, Husky hooks — left to Phase 10 (polish).
- 2FA (TOTP) — Supabase Auth supports it natively when we get to admin accounts.
- Field-level encryption for PII — Postgres `pgcrypto` covers it when we touch admissions data.

## Phase tracking
- ✅ **Phase 1** — Foundation (design system, layout, homepage, About, Contact)
- ⏳ Phase 2 — Enable Lovable Cloud + auth scaffolding (was: "Database & backend core")
- ⏳ Phase 3 — Remaining public pages (Academics, Admissions, KCSE Results charts, etc.)
- ⏳ Phase 4 — AI assistant Stella (Edge Function + pgvector RAG)
- ⏳ Phase 5 — Student/Parent/Teacher portals
- ⏳ Phase 6 — Payments (Stripe + M-Pesa Daraja)
- ⏳ Phase 7 — Admin panel
- ⏳ Phase 8 — AI tutor Mshauri
- ⏳ Phase 9 — Polish, SEO, accessibility, performance audit
