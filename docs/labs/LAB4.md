# Лабораторна робота 4 — Мережа, списки, Offline-First

## Реалізовано
TMDB-клієнт використовує Bearer token, DTO перетворюються у доменні сутності, репозиторій записує відповідь у SQLite. UI спостерігає лише локальну БД. Є `UiState`, сітка `FlatList`, pull-to-refresh, shimmer, повтор запиту, кешовані `expo-image` та RatingBar з половинами зірок.

## Файли для звіту
`mobile/src/data/remote/tmdbApi.ts`, `mobile/src/data/remote/dto/movieDto.ts`, `mobile/src/data/repository/MovieRepository.ts`, `mobile/src/viewmodels/usePopularMoviesViewModel.ts`, `mobile/src/components/RatingBar.tsx`, `mobile/src/components/ShimmerPlaceholder.tsx`.

## Знімки екрана
1. Shimmer під час завантаження. 2. Сітка з рейтингами. 3. Стан без мережі з кешем/помилкою.
