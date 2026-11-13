import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { authRouter } from './routes/auth.js';
import { watchlistRouter } from './routes/watchlist.js';

export const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/auth', authRouter);
app.use('/watchlist', watchlistRouter);
app.use((_req, res) => res.status(404).json({ error: 'Маршрут не знайдено' }));
const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) { res.status(400).json({ error: error.issues[0]?.message ?? 'Некоректні дані' }); return; }
  console.error(error);
  res.status(500).json({ error: 'Внутрішня помилка сервера' });
};
app.use(errorHandler);
