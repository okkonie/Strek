# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Snapshot
- Stack: Expo Router + React Native + TypeScript + Firebase Auth + Google Sign-In.
- Entry routing is file-based under `app/`.
- Authenticated screens live in `app/(auth)/`.
- Primary reference doc: [README.md](README.md).

## Verified Commands
Run from repo root:

```bash
npm install
npm start
npm run android
npm run ios
npm run web
npm run lint
npx tsc --noEmit
```

Notes:
- `npm run reset-project` is defined, but currently points to `scripts/reset-project.js` which is missing in this repo.
- There is no test script yet.

## Architecture Map
- `app/_layout.tsx`: root layout, font loading, splash handling, auth redirect logic.
- `app/index.tsx`: unauthenticated login screen with Google Sign-In.
- `app/(auth)/_layout.tsx`: authenticated group layout.
- `app/(auth)/home.tsx`: main authenticated screen.
- `context/AuthContext.tsx`: auth context provider and hook.
- `components/`: reusable UI (`Button`, `AddModal`, `TimePicker`, `Strek`).
- `constants/colors.ts`: theme colors used across the app.
- `app.json`: Expo config/plugins (router, Firebase, Google Sign-In, typed routes, react compiler experiment).

## Code Conventions To Follow
- TypeScript strict mode is enabled; keep types explicit and avoid `any`.
- Use alias imports with `@/*` where appropriate.
- Keep screen/component styling in `StyleSheet.create(...)` blocks.
- Reuse `constants/colors.ts` instead of hardcoding UI colors.
- Existing UI uses `SpaceMono` / `SpaceMonoBold` font family names.
- Keep component APIs simple and typed (props interfaces/types).

## Auth And Navigation Rules
- Do not break auth redirect behavior in `app/_layout.tsx`.
- Auth routing rule:
  - signed-in users should be redirected into `/(auth)` routes
  - signed-out users should be redirected to `/`
- When changing logout behavior, preserve both Firebase sign-out and Google sign-out.

## Firebase / Platform Guardrails
- Google Sign-In requires valid Google services config (`google-services.json` in root and Android app wiring).
- `app/index.tsx` currently configures Google Sign-In with a hardcoded `webClientId`; prefer environment-based config for production changes.
- Android build config is under `android/`; keep Expo-managed assumptions intact unless intentionally ejecting further.

## Workstyle For Agents
- Prefer minimal, targeted edits over broad refactors.
- Keep naming and file organization consistent with existing patterns.
- If adding new route screens, place them in the correct route group and update flow intentionally.
- After code edits, run lint and type-check before handoff.
