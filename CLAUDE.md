# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (starts Next.js dev server + next-video sync watcher)
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Run tests (watch mode)
pnpm test

# Run tests (single run, CI-friendly)
pnpm test:run

# Run tests with UI
pnpm test:ui
```

**Package manager: pnpm only.** The project enforces this via `preinstall` hook — `npm` and `yarn` are blocked.

## Architecture Overview

This is a **Next.js 14 App Router** client for Snapscout — a procurement canvassing platform. There are two user roles: **Agency** (procurement staff who canvass/buy) and **Merchant** (sellers).

### Route Groups

- `(home)` — Landing page, login, register (public routes)
- `(dashboard)` — Agency-facing pages: canvass, carts, orders, messages, maps, dashboard
- `(merchant)` — Merchant-facing pages

Route protection is enforced in `src/middleware.ts`. After login, agencies go to `/dashboard` and merchants go to `/merchant`.

### Authentication

Custom cookie-based auth (not NextAuth sessions despite the import). Key file: `src/auth.ts`.

- `sessionToken` cookie — the Laravel API Bearer token (JWT)
- `userData` cookie — serialized user object
- `auth()` — reads both cookies, used in Server Components
- `useMySession()` hook — client-side access via `SessionContext`
- `fetchWithToken()` in `src/services/fetchService.ts` — wraps all authenticated API calls with the Bearer token

The backend is a Laravel API at `NEXT_PUBLIC_BACKEND_SERVICE_URL`. All API routes follow the pattern `/api/v1/{role}/{resource}`.

### Data Fetching Pattern

- **Server Components** call `fetchWithToken()` directly or use Server Actions in `src/app/actions/`
- **Server Actions** (`"use server"`) handle mutations and are in `src/app/actions/`
- **Client Components** use hooks; for realtime they use `useAbly()` (`src/app/custom-hooks/useAbly.ts`)

### Realtime (Ably + Laravel Echo)

Real-time features use Ably as the broadcaster via `@ably/laravel-echo`. The `useAbly()` hook boots an Echo instance authenticated via the Laravel broadcasting auth endpoint. Used for notifications and messages.

### Key Directories

- `src/app/actions/` — Server Actions (products, carts, auth, quotes, messages, maps)
- `src/app/custom-hooks/` — Client-side hooks (`useAbly`, `useMySession` via `sessionContext`, `useQuoteDialog`, etc.)
- `src/componentUtils/` — Shared layout/utility components (`Sidebar`, `Topnav`, `DashboardNav`, `LeafletMap`, `SessionContextProvider`, etc.)
- `src/components/ui/` — shadcn/ui primitives (Radix UI-based)
- `src/services/` — `fetchService.ts` (authenticated fetch wrapper)
- `src/types/` — TypeScript types (`product-types.ts`, `auth-types.ts`, `cart-types.ts`, `map-types.ts`)

### UI Stack

- **shadcn/ui** (`src/components/ui/`) + **NextUI** (`@nextui-org/react`) — both component libraries are in use simultaneously
- **Tailwind CSS** with custom colors (`snapGreen`, gradient vars) and the `nextui()` plugin
- **Leaflet** (`react-leaflet`) for maps — loaded with `dynamic(() => ..., { ssr: false })` to avoid SSR issues
- **Framer Motion** for animations
- **react-hook-form** + **Zod** for form validation

### Testing

Vitest + React Testing Library + jsdom. Setup file at `src/test/setup.ts`. Path alias `@` maps to `src/`. Tests don't exist yet (only the setup scaffolding is in place).

### Environment Variables

- `NEXT_PUBLIC_BACKEND_SERVICE_URL` — backend API base URL (used in client + server)
- `BACKEND_SERVICE_URL` — backend URL for server-only merchant login
- `NEXT_PUBLIC_ABLY_PUBLIC_KEY` — Ably key for realtime

### Notable Patterns

- `revalidatePath()` is called after mutations (e.g., `addToCart`, `deleteCartProduct`) to bust Next.js cache
- TypeScript build errors are ignored (`ignoreBuildErrors: true` in `next.config.js`) — the project compiles despite type errors
- The `MyUser` type is declared globally (referenced throughout but not explicitly exported from a single source file)
- Cart data from the backend can be either an empty array `[]` or an object — handled explicitly in `getCartProducts()`
