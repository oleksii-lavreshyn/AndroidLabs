# Лабораторна робота 3 — Локальна БД і безпека

## Реалізовано
SQLite є єдиним джерелом істини. DAO публікують реактивні `ObservableValue`; підписка історії призупиняється поза фокусом/у фоні. Міграції керуються `PRAGMA user_version`; версія 2 додає `email`. Токени зберігаються в SecureStore. Watchlist змінюється локально, а невдалі операції лишаються у черзі.

## Файли для звіту
`mobile/src/data/local/db.ts`, `mobile/src/data/local/daos/*`, `mobile/src/utils/SecureStorage.ts`, `mobile/src/viewmodels/useLoginViewModel.ts`, `mobile/src/data/repository/WatchlistRepository.ts`.

## Знімки екрана
1. Реактивна історія входів. 2. Доданий фільм у списку. 3. Налаштування токена.
