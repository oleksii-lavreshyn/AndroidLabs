import type { Movie, WatchlistItem } from '@/domain/models';
import { ObservableValue } from '@/utils/ObservableValue';
import { getDatabase } from '../db';
export interface SyncOperation { id: number; operation: 'add'|'remove'; movieId: number; payload: string|null }
export class WatchlistDao {
  readonly items = new ObservableValue<WatchlistItem[]>([]);
  async refresh(): Promise<WatchlistItem[]> { const db=await getDatabase(); const rows=await db.getAllAsync<WatchlistItem>('SELECT movieId id,title,overview,posterPath,voteAverage,releaseDate,page,addedAt FROM watchlist ORDER BY addedAt DESC'); this.items.emit(rows); return rows; }
  async contains(movieId:number):Promise<boolean>{ const db=await getDatabase(); return !!(await db.getFirstAsync('SELECT 1 FROM watchlist WHERE movieId=?',movieId)); }
  async add(movie:Movie,queue=true):Promise<void>{const db=await getDatabase();const now=new Date().toISOString();await db.withTransactionAsync(async()=>{await db.runAsync(`INSERT OR REPLACE INTO watchlist(movieId,title,overview,posterPath,voteAverage,releaseDate,page,addedAt) VALUES(?,?,?,?,?,?,?,?)`,movie.id,movie.title,movie.overview,movie.posterPath,movie.voteAverage,movie.releaseDate,movie.page,now);if(queue)await db.runAsync(`INSERT INTO sync_queue(operation,movieId,payload,createdAt) VALUES('add',?,?,?)`,movie.id,JSON.stringify(movie),now);});await this.refresh();}
  async remove(movieId:number,queue=true):Promise<void>{const db=await getDatabase();await db.withTransactionAsync(async()=>{await db.runAsync('DELETE FROM watchlist WHERE movieId=?',movieId);if(queue)await db.runAsync(`INSERT INTO sync_queue(operation,movieId,payload,createdAt) VALUES('remove',?,NULL,?)`,movieId,new Date().toISOString());});await this.refresh();}
  async pending():Promise<SyncOperation[]>{const db=await getDatabase();return db.getAllAsync<SyncOperation>('SELECT id,operation,movieId,payload FROM sync_queue ORDER BY id');}
  async complete(id:number):Promise<void>{const db=await getDatabase();await db.runAsync('DELETE FROM sync_queue WHERE id=?',id);}
}
