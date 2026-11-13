export type UiState<T> = { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; message: string; data?: T };
export const errorMessage = (error: unknown): string => error instanceof Error ? error.message : 'Сталася невідома помилка';
