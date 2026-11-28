# Teklozy Hackathon 2026 — Event Experience

A focused hackathon event website for Teklozy Hackathon 2026. The page is organized as an event journey, with no club-membership content.

## Visual refinement pass
- Removed the floating circular symbol and concentric rings from the challenge-track artwork.
- Replaced the countdown with a compact four-tile timer card.
- Replaced the three gallery visuals with distinct, high-resolution scenes: collaboration, individual experimentation, and project presentation.
- Added restrained page-wide motion, image hover transitions, reveal animations, and reduced-motion accessibility support.

## Page flow
1. Event hero and key facts
2. Challenge overview
3. Agriculture, Healthcare and Finance challenge tracks
4. Main event details
5. Dedicated, clearly visible countdown card
6. 48-hour schedule and participation rules
7. Builder resources and awards
8. Participant benefits and event gallery
9. FAQs
10. Hackathon registration

## Run locally
1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Run `npm install`.
4. Run `npm run dev`.

## Registration and payment
The registration form is a three-step flow with participant details, team setup, and a transparent fee review. The fee is intentionally shown as TBA until the organizer confirms the exact amount.

Razorpay order creation and signature verification are scaffolded in the server. Set the confirmed team fee in paise in both `VITE_REGISTRATION_FEE_PAISE` and `REGISTRATION_FEE_PAISE`. Never expose the Razorpay secret in a frontend `VITE_` variable. Supabase persistence, webhook verification, idempotency and production payment operations must be completed before launch.

## Build
Run `npm run build`.
