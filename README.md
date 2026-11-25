# VLEARNIN v2 — Full-Stack Educational Platform

Rebuilt from scratch in `vlearnin-v2/` as a `pnpm` monorepo with Next.js App Router, NestJS, Prisma, and PostgreSQL.

## Workspace Structure

- `apps/web`: Next.js 15 App Router frontend (React 19, TypeScript, Tailwind CSS v4, GSAP, Lenis, Lucide, React Hook Form, Zod)
- `apps/api`: NestJS 10 REST API (Prisma ORM, PostgreSQL, Argon2id auth, HTTP-only sessions + CSRF, PDFKit brochures/syllabi/certificates, QRCode, Nodemailer/Resend)
- `packages/shared`: Shared Zod schemas, official VLEARNIN course/combo catalog, and brand constants
- `infrastructure/docker-compose.yml`: PostgreSQL 16 local container

## Quick Start

1. Copy `.env.example` to `.env` (and `apps/api/.env`) and set `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `ADMIN_SEED_EMAIL`, and `ADMIN_SEED_PASSWORD`.
2. Start PostgreSQL (via `docker compose -f infrastructure/docker-compose.yml up -d` or local PostgreSQL).
3. Push schema & seed official courses, categories, combos, and admin account:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   pnpm db:seed
   ```
4. Run both apps in development:
   ```bash
   pnpm dev
   ```
   - Web: `http://localhost:3000`
   - API: `http://localhost:4000/api`
5. Run tests & production build:
   ```bash
   pnpm test
   pnpm build
   ```
