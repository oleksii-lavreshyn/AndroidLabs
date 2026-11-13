import { randomBytes } from 'node:crypto';
import { Router } from 'express';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { z } from 'zod';
import { db } from '../config/database.js';

interface UserRow extends RowDataPacket { id: number; username: string; created_at: string }
interface RecentRow extends RowDataPacket { username: string; loginTime: string }
const loginSchema = z.object({ username: z.string().trim().min(1).max(80) });
export const authRouter = Router();

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username } = loginSchema.parse(req.body);
    await db.execute<ResultSetHeader>('INSERT INTO users (username) VALUES (?) ON DUPLICATE KEY UPDATE username = VALUES(username)', [username]);
    const [users] = await db.execute<UserRow[]>('SELECT id, username, created_at FROM users WHERE username = ? LIMIT 1', [username]);
    const user = users[0];
    if (!user) throw new Error('User upsert failed');
    const token = randomBytes(32).toString('hex');
    await db.execute('INSERT INTO sessions (user_id, token) VALUES (?, ?)', [user.id, token]);
    await db.execute('INSERT INTO login_history (user_id) VALUES (?)', [user.id]);
    res.status(201).json({ token, user: { id: user.id, username: user.username, createdAt: user.created_at } });
  } catch (error) { next(error); }
});

authRouter.get('/recent', async (_req, res, next) => {
  try {
    const [rows] = await db.query<RecentRow[]>(`SELECT u.username, MAX(lh.login_time) AS loginTime
      FROM login_history lh JOIN users u ON u.id = lh.user_id
      GROUP BY u.id, u.username ORDER BY loginTime DESC LIMIT 5`);
    res.json(rows);
  } catch (error) { next(error); }
});
