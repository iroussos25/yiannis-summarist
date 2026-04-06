# Summarist: Audiobook SaaS Platform

A full-stack SaaS audiobook platform built during my software engineering internship at Summarist (Dec 2025 - Jan 2026). Features tiered Stripe payment integration, Firebase authentication, and server-side rendered content delivery.

**[Live Demo](https://yiannis-summarist.vercel.app/)**

---

## What it does

Users can browse audiobook summaries, sign up with email or Google auth, subscribe to a paid tier via Stripe, and access premium content. The platform handles the full SaaS lifecycle: registration, authentication, payment processing, content gating, and account management.

## What I built

- **Authentication:** Firebase Auth with email/password and Google OAuth sign-in. Protected routes redirect unauthenticated users.
- **Payments:** Manual Stripe API integration (not a pre-built checkout widget). Handles subscription creation, tier management, and webhook processing for payment events.
- **Content delivery:** Multiple external APIs for audiobook metadata and audio content. Optimized asset loading and SSR for fast initial page renders.
- **Frontend:** Responsive UI built with Next.js, TypeScript, and CSS. Skeleton loading states for async content.

## Key technical details

- Built without AI assistance as a fundamentals-focused exercise in manual debugging and system architecture
- Stripe API integration handling subscription lifecycles (create, upgrade, cancel)
- Firebase Firestore for user data persistence and content bookmarking
- Server-side rendering for SEO and performance
- Multiple API integrations for dynamic audiobook content

## Run locally
```bash
git clone https://github.com/iroussos25/yiannis-summarist.git
cd yiannis-summarist
npm install

# Set up environment variables
cp .env.example .env.local
# Add Firebase config, Stripe keys, and API keys

npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech stack

TypeScript, Next.js, React, Firebase (Auth, Firestore), Stripe API, CSS, Vercel

## Context

This was my first internship project (Dec 2025 - Jan 2026). The core requirement was building a functional SaaS platform with real payment processing. I intentionally built this without AI coding assistance to strengthen my debugging fundamentals and manual problem-solving.

## Contact

Giannis Roussos - [giannisroussos.com](https://giannisroussos.com) | [LinkedIn](https://linkedin.com/in/giannisr) | grcodes@outlook.com
