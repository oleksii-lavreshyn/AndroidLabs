# Movie Tracker

Offline-first React Native (Expo SDK 55, TypeScript strict) movie tracker with a
local Express 5 + MySQL backend. See README.md for setup and overview.
Also read Rules.md and docs/labs/ before changing architecture.

## Layout
- `mobile/` - Expo app. Screens in `src/app/` (Expo Router), logic in `src/data/`,
  `src/domain/`, `src/viewmodels/`, UI in `src/components/`, `src/theme/`.
- `server/` - Express API (`src/`), SQL in `sql/schema.sql`, migrations in `scripts/migrate.ts`.

## Commands
- Mobile: `cd mobile && npm run typecheck && npm test`
- Server: `cd server && npm run typecheck && npm run build`
- Run app: `npx expo run:android` (dev build needed for background tasks/notifications)
- Add Expo packages ONLY with `npx expo install <pkg>`, never plain `npm install`.
Run typecheck and tests before finishing any task. Do not claim success if they fail.

## Architecture (strict)
Screen -> ViewModel hook -> Repository -> DAO / remote data source.
- Screens never call the network or DAOs directly.
- Repositories write to SQLite first (single source of truth); DAOs notify
  ViewModels reactively; ViewModels expose `UiState<T>` (`loading | success | error`).
- Domain `Movie` must not depend on DTOs; map with `movieDtoToEntity`.
- Watchlist changes are local-first: queue in `sync_queue`, retry when the server
  is unreachable. Never lose cached data on a failed sync.

## Code rules
- TypeScript strict, no `any`, no non-null assertions without a reason.
- Function components and hooks only.
- Match existing naming, folder structure and theme tokens (light/dark); no hardcoded colors.
- Keep accessibility labels and touch targets on interactive elements.
- Don't add dependencies, change `app.json`, or change the DB schema without asking.
  Schema changes need a migration, not edits to existing ones.

## Security and privacy
- TMDB and session tokens live only in SecureStore. Never put them in SQLite, logs,
  source code or `.env` committed to Git.
- No analytics, cloud services or hosted databases.
- The only external hosts are TMDB API and its image CDN.

## Testing
- Jest + jest-expo + Testing Library React Native, tests in `mobile/__tests__/`.
- Add or update tests for any change to repositories, DAOs or ViewModels.
- Cover both success and failure paths (sync failure, empty list, last page).

## Gotchas
- Android emulator reaches the backend at `10.0.2.2`, not `localhost`.
- Expo SDK 55 is recent: check Expo docs rather than relying on older APIs from memory.
- Changes to `.env` or `app.json` need a native rebuild or `npx expo start -c`.