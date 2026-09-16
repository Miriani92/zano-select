# CLAUDE.m

# AGENTS.md

## Overview

Expo Router (file-based routing) app, in early scaffolding stage — currently
a single "Hello World" screen. Will grow into an e-commerce app (catalog,
cart, checkout, orders). TypeScript throughout. Backend is Supabase (Auth,
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

- `src/app/_layout.tsx` — root layout, a bare `Stack` from `expo-router`.
- `src/app/index.tsx` — the only screen, renders "Hello World".

There is no theming system, shared component library, feature folders, or tab
navigation yet — add these back deliberately as the app grows, following the
Target Architecture below, rather than assuming they exist or improvising a
different structure.

## Target Architecture — Feature-based Clean Architecture

As real features are added, follow this structure (see expo-project-structure
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
