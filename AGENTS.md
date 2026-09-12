# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Architecture — Feature-based Clean Architecture

- `src/app/` — Expo Router routes ONLY. No logic, no providers, no config.
- `src/core/` — navigation config (linking, tab/stack options — not route files),
  provider components composed in `app/_layout.tsx`, and app config/env/feature flags.
- `src/features/<name>/` — one folder per feature (auth, products, cart, checkout,
  orders, profile), each internally split into:
  - `domain/entities/` — business objects and invariants. Zero React/Expo/data imports.
  - `domain/repositories/` — INTERFACES only (ports). Define what's needed, never how.
  - `domain/useCases/` — pure orchestration logic. Depends only on domain/repositories
    interfaces and entities. Pricing/discount/cart logic lives here as pure functions.
  - `data/dto/` — shapes of external API/storage payloads. Never imported by domain/.
  - `data/api/` — feature-specific endpoints built on `infrastructure/api`'s shared client.
  - `data/repositories/` — implements `domain/repositories`, mapping DTOs to entities.
    Payment SDKs (Stripe/RevenueCat) may ONLY be imported here.
  - `presentation/` — screens, components, hooks. Hooks call use cases via
    `di/container.ts`; screens never call a repository or API client directly.
- `src/shared/` — cross-feature code only (Money in `shared/domain/`, generic UI,
  utils). Don't put feature-specific logic here "just in case."
- `src/infrastructure/` — cross-cutting technical clients (one API client with
  auth/retry interceptors, one storage engine, analytics) reused by every
  feature's `data/` layer. Never duplicate these per feature.
- `src/di/container.ts` — single composition root: wires each feature's
  `domain/repositories` interface to its `data/repositories` implementation.
- `cart/domain/useCases/syncCart.ts` reconciles local cart state with server
  state; cart must assume the network can be unavailable.
- `checkout/domain/useCases/placeOrder.ts` must accept and forward an
  idempotency key through the payment gateway and order repository.
- Raw payment card data/tokens never cross into `domain/` — only the
  `PaymentGateway` port's return values do.
