import * as SQLite from 'expo-sqlite';
let database: SQLite.SQLiteDatabase | null = null;
let initializing: Promise<SQLite.SQLiteDatabase> | null = null;

async function migrate(db: SQLite.SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  if (version < 1) {
    await db.execAsync(`PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, loginTime TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY, title TEXT NOT NULL, overview TEXT NOT NULL, posterPath TEXT, voteAverage REAL NOT NULL, releaseDate TEXT, page INTEGER NOT NULL DEFAULT 1, updatedAt TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS watchlist (movieId INTEGER PRIMARY KEY, title TEXT NOT NULL, overview TEXT NOT NULL, posterPath TEXT, voteAverage REAL NOT NULL, releaseDate TEXT, page INTEGER NOT NULL DEFAULT 1, addedAt TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sync_queue (id INTEGER PRIMARY KEY AUTOINCREMENT, operation TEXT NOT NULL CHECK(operation IN ('add','remove')), movieId INTEGER NOT NULL, payload TEXT, createdAt TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS known_releases (movieId INTEGER PRIMARY KEY, discoveredAt TEXT NOT NULL);
      PRAGMA user_version = 1;`);
    version = 1;
  }
  if (version < 2) await db.execAsync('ALTER TABLE users ADD COLUMN email TEXT; PRAGMA user_version = 2;');
}
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (database) return database;
  initializing ??= SQLite.openDatabaseAsync('movie-tracker.db').then(async (db) => { await migrate(db); database = db; return db; });
  return initializing;
}
