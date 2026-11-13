# Agent rules

1. Always use React Native (Expo) with TypeScript for UI.
2. Use a consistent Material-3-like design system (theme file with colors, spacing, typography).
3. Use MVVM: Screen (View) -> custom hook as ViewModel -> Repository -> data sources.
4. Always write unit tests for every ViewModel/repository using Jest with mocked repository.
5. Handle network errors via a discriminated-union UiState (`Loading | Success | Error`).
6. Never read data from the network directly in UI; UI reads only from local DB (SSOT).
