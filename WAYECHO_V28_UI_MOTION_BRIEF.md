# WayEcho V28 – UI/UX & Interactive Onboarding

## Implemented
- `/onboarding`: interactive 4-step onboarding, skip, previous, next and finish.
- Step 1: brief welcome and optional Vietnamese TTS.
- Step 2: large-text and high-contrast toggles, speech speed slider and voice sample, using existing A11yProvider.
- Step 3: Vietnamese browser SpeechRecognition started ONLY on user click, keyboard text fallback, optional search link; graceful permission denial.
- Step 4: live links to Camera AI, Help, and SOS demo. Warnings do not depict AI as safe navigation.
- Reopen onboarding through the existing Header > Hỗ trợ navigation and Footer.
- New motion styles: 180ms micro-interaction, 300ms step entry; CSS transition reduction under OS `prefers-reduced-motion` and WayEcho's `data-reduce` preference.
- Existing pages and booking/partner/admin logic were not changed.

## Explicit limitations
- Browser Web Speech API speech recognition and vi-VN voices vary by browser/platform; requires microphone permission and HTTPS in deployment.
- No custom haptic or audio cue is automatically triggered, respecting autonomy and reduced-distraction preferences.
- No generated stock or AI photographs were inserted.
- The onboarding microphone is not an AI vision or GPS system.
- Existing cross-device storage, consultation WebRTC, Escrow and Vercel multi-instance limitations are unchanged; this V28 release is a UI/UX change.
- Browser E2E and Next.js production build must still be verified on a deployed environment with dependencies installed.

## GitHub / Vercel
Upload the extracted project root containing `package.json`; run `npm ci && npm test && npm run build`; set required environment variables from `.env.example`; import repository as Next.js on Vercel. DO NOT call the live SOS, payment, or ride partner integrations production-grade without actual vendor agreements and backend infrastructure.
