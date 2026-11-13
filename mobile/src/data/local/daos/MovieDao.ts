import type { Movie } from '@/domain/models';
import { ObservableValue } from '@/utils/ObservableValue';
import { getDatabase } from '../db';

interface MovieRow { id: number; title: string; overview: string; posterPath: string | null; voteAverage: number; releaseDate: string | null; page: number }
export class MovieDao {
  readonly movies = new ObservableValue<Movie[]>([]);
  async refresh(): Promise<Movie[]> { const db = await getDatabase(); const rows = await db.getAllAsync<MovieRow>('SELECT id,title,overview,posterPath,voteAverage,releaseDate,page FROM movies ORDER BY page,id'); this.movies.emit(rows); return rows; }
  async getById(id: number): Promise<Movie | null> { const db = await getDatabase(); return await db.getFirstAsync<MovieRow>('SELECT id,title,overview,posterPath,voteAverage,releaseDate,page FROM movies WHERE id=?', id) ?? null; }
  async upsertAll(items: Movie[]): Promise<void> { const db = await getDatabase(); await db.withTransactionAsync(async () => { for (const m of items) await db.runAsync(`INSERT INTO movies (id,title,overview,posterPath,voteAverage,releaseDate,page,updatedAt) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,overview=excluded.overview,posterPath=excluded.posterPath,voteAverage=excluded.voteAverage,releaseDate=excluded.releaseDate,page=MIN(movies.page,excluded.page),updatedAt=excluded.updatedAt`, m.id,m.title,m.overview,m.posterPath,m.voteAverage,m.releaseDate,m.page,new Date().toISOString()); }); await this.refresh(); }
  async knownReleaseIds(): Promise<Set<number>> { const db = await getDatabase(); const rows = await db.getAllAsync<{ movieId: number }>('SELECT movieId FROM known_releases'); return new Set(rows.map((row) => row.movieId)); }
  async markReleases(ids: number[]): Promise<void> { const db = await getDatabase(); await db.withTransactionAsync(async () => { for (const id of ids) await db.runAsync('INSERT OR IGNORE INTO known_releases(movieId,discoveredAt) VALUES (?,?)', id,new Date().toISOString()); }); }
}
