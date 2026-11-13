import type { NextFunction, Request, Response } from 'express';
import type { RowDataPacket } from 'mysql2';
import { db } from '../config/database.js';

interface SessionRow extends RowDataPacket { user_id: number }

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const value = req.header('authorization');
    if (!value?.startsWith('Bearer ')) { res.status(401).json({ error: 'Потрібна авторизація' }); return; }
    const token = value.slice(7);
    if (!/^[a-f0-9]{64}$/.test(token)) { res.status(401).json({ error: 'Недійсний токен' }); return; }
    const [rows] = await db.execute<SessionRow[]>('SELECT user_id FROM sessions WHERE token = ? LIMIT 1', [token]);
    if (!rows[0]) { res.status(401).json({ error: 'Сесію не знайдено' }); return; }
    req.userId = rows[0].user_id;
    next();
  } catch (error) { next(error); }
}
