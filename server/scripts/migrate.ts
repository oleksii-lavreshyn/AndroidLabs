import { readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';
import { env } from '../src/config/env.js';

const sql = await readFile(new URL('../sql/schema.sql', import.meta.url), 'utf8');
const connection = await mysql.createConnection({ host: env.DB_HOST, port: env.DB_PORT, user: env.DB_USER, password: env.DB_PASSWORD, multipleStatements: true });
try { await connection.query(sql.replaceAll('movie_tracker', env.DB_NAME)); console.log(`Migrated database: ${env.DB_NAME}`); }
finally { await connection.end(); }
