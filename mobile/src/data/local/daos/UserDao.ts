import type { RecentLogin } from '@/domain/models';
import { ObservableValue } from '@/utils/ObservableValue';
import { getDatabase } from '../db';
export class UserDao {
  readonly recentLogins = new ObservableValue<RecentLogin[]>([]);
  async addLogin(username: string): Promise<void> { const db=await getDatabase(); await db.runAsync('INSERT INTO users(username,loginTime) VALUES (?,?)',username,new Date().toISOString()); await this.refresh(); }
  async refresh(): Promise<RecentLogin[]> { const db=await getDatabase(); const rows=await db.getAllAsync<RecentLogin>(`SELECT MAX(id) id,username,MAX(loginTime) loginTime,email FROM users GROUP BY username ORDER BY loginTime DESC LIMIT 5`); this.recentLogins.emit(rows); return rows; }
}
