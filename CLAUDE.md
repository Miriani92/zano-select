# CLAUDE.m

# AGENTS.md

## Overview

Expo Router (file-based routing) e-commerce app ("Zano Outlet"), early stage —
only the `auth` feature (email OTP + Google sign-in) is built so far. Will grow
to catalog, cart, checkout, orders. TypeScript throughout. Backend is Supabase (Auth,
Postgres, Storage, Edge Functions); shared client lives at
`src/infrastructure/supabase/client.ts`.

## Commands

- `npm start` (or `npx expo start`) — start the dev server; press `i`/`a`/`w` for iOS/Android/web
- `npm run ios` / `npm run android` / `npm run web` — start directly on a given platform
- `npm run lint` — `expo lint` (ESLint config: see Code Style)
- `npx tsc --noEmit` — type check
- No test runner is configured yet — see Testing.

## Current State

Routable screens live in `src/app`; other source lives under `src/` and is
imported via the `@/*` path alias (`@/assets/*` maps to `assets/`), configured
in `tsconfig.json`.

- `src/app/_layout.tsx` — root layout: loads fonts, restores language and
  auth session behind the splash screen, then uses `Stack.Protected` to show
  `(app)` for signed-in users and `(auth)` otherwise.
- `src/app/(auth)/` — `welcome`, `email`, `verify` routes; `src/app/(app)/` —
  the signed-in area (currently just `index`).
- `src/features/auth/` — the only feature, fully layered (domain / data /
  presentation) as described below; backed by Supabase Auth and
  `@react-native-google-signin/google-signin`.
- `src/di/container.ts` — wires `AuthRepository` to the Supabase
  implementation and exports `authUseCases`.
- `src/shared/theme/` — design tokens (colors, fonts, typography, spacing,
  radius); `src/shared/ui/` — generic components (Button, Input, Text,
  Checkbox, IconButton); `src/shared/i18n/` — i18next with `ka` and `en` locales.
- `src/infrastructure/supabase/client.ts` — the shared Supabase client.

There is no tab navigation yet.

## Architecture — Feature-based Clean Architecture

Follow this structure for all features (see expo-project-structure
skill for the `src/app/` routing rules, which stay in force):

- `src/features/<name>/` — one folder per feature (catalog, cart, checkout,
  orders, auth, profile), each with:
  - `domain/entities/`, `domain/repositories/` (interfaces only), `domain/useCases/`
    — zero React/Expo/data imports.
  - `data/dto/`, `data/api/`, `data/repositories/` (implements domain/repositories,
    maps DTOs to entities).
  - `presentation/screens/`, `presentation/components/`, `presentation/hooks/`
    — hooks call use cases; screens never call a repository or API client directly.
- `src/shared/` — cross-feature code only (Money, generic UI, utils).
- `src/infrastructure/` — shared technical clients (API base client, storage
  engine, analytics) reused across features' `data/` layers.
- `src/di/container.ts` — composition root wiring each feature's
  `domain/repositories` interface to its `data/repositories` implementation.
- `src/app/` stays routes-only — a route file renders a feature's screen and
  does nothing else.

Do not scaffold this structure preemptively for features that don't exist yet.
Add a feature's folders when you actually build that feature.

## Code Style

- Functional components with hooks only — no class components.
- kebab-case filenames, PascalCase component names, camelCase functions/vars.
- Always use the `@/*` alias — never relative `../../../` imports.
- ESLint config: eslint-config-expo (flat config) + Prettier via eslint-plugin-prettier; no-restricted-imports blocks relative parent (../) imports to enforce the @/* rule above.
- UI/theme follows Material Design naming for color tokens: a surface color (e.g. `primary`, `background`, `surface`) pairs with an `on<Surface>` token (e.g. `onPrimary`) for content placed on top of it. Keep new color tokens consistent with this pattern.

## Testing

- Not yet configured. When introduced: Jest for `domain/useCases` and
  `domain/services` in isolation (no RN/Expo mocking needed there); colocate
  tests (`foo.ts` → `foo.test.ts`).

## Security & Boundaries

- Payment SDK code (when checkout is built) may only be imported inside
  `features/checkout/data/repositories/`.
- `EXPO_PUBLIC_*` env vars are client-visible; anything else stays server-side.
- Never commit secrets.
