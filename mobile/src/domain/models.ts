export interface Movie { id: number; title: string; overview: string; posterPath: string | null; voteAverage: number; releaseDate: string | null; page: number; }
export interface WatchlistItem extends Movie { addedAt: string; }
export interface RecentLogin { id?: number; username: string; loginTime: string; email?: string | null; }
export interface User { id: number; username: string; createdAt: string; }
