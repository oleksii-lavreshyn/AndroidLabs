import { Router } from 'express';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { z } from 'zod';
import { db } from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';

interface WatchlistRow extends RowDataPacket { movieId: number; title: string; posterPath: string | null; voteAverage: number; releaseDate: string | null; addedAt: string }
const itemSchema = z.object({ movieId: z.number().int().positive(), title: z.string().min(1).max(255), posterPath: z.string().max(255).nullable(), voteAverage: z.number().min(0).max(10), releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable() });
export const watchlistRouter = Router();
watchlistRouter.use(requireAuth);

watchlistRouter.get('/', async (req, res, next) => {
  try {
    if (req.userId === undefined) throw new Error('Auth invariant failed');
    const userId = req.userId;
    const [rows] = await db.execute<WatchlistRow[]>(`SELECT movie_id movieId, title, poster_path posterPath,
      vote_average voteAverage, release_date releaseDate, added_at addedAt FROM watchlist WHERE user_id = ? ORDER BY added_at DESC`, [userId]);
    res.json(rows);
  } catch (error) { next(error); }
});
watchlistRouter.post('/', async (req, res, next) => {
  try {
    if (req.userId === undefined) throw new Error('Auth invariant failed');
    const userId = req.userId;
    const item = itemSchema.parse(req.body);
    await db.execute<ResultSetHeader>(`INSERT INTO watchlist (user_id,movie_id,title,poster_path,vote_average,release_date)
      VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title=VALUES(title),poster_path=VALUES(poster_path),vote_average=VALUES(vote_average),release_date=VALUES(release_date),added_at=CURRENT_TIMESTAMP`,
      [userId, item.movieId, item.title, item.posterPath, item.voteAverage, item.releaseDate]);
    res.status(201).json(item);
  } catch (error) { next(error); }
});
watchlistRouter.delete('/:movieId', async (req, res, next) => {
  try {
    if (req.userId === undefined) throw new Error('Auth invariant failed');
    const userId = req.userId;
    const movieId = z.coerce.number().int().positive().parse(req.params.movieId);
    const [result] = await db.execute<ResultSetHeader>('DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?', [userId, movieId]);
    res.status(result.affectedRows ? 200 : 404).json(result.affectedRows ? { success: true } : { error: 'Фільм не знайдено' });
  } catch (error) { next(error); }
});
