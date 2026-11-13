import { app } from './app.js';
import { db } from './config/database.js';
import { env } from './config/env.js';

async function start(): Promise<void> {
  await db.query('SELECT 1');
  app.listen(env.PORT, '0.0.0.0', () => console.log(`Movie Tracker API: http://localhost:${env.PORT}`));
}
start().catch((error) => { console.error('Server startup failed:', error); process.exit(1); });
