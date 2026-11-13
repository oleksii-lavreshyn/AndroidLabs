import type { Movie, User } from '@/domain/models';
import { SecureStorage } from '@/utils/SecureStorage';
const BASE_URL=process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';
async function parse<T>(response:Response):Promise<T>{const body=await response.json() as T & {error?:string};if(!response.ok)throw new Error(body.error ?? `HTTP ${response.status}`);return body;}
export class BackendApi {
  async login(username:string):Promise<{token:string;user:User}>{return parse(await fetch(`${BASE_URL}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username})}));}
  private async authHeaders():Promise<Record<string,string>>{const token=await SecureStorage.get('sessionToken');if(!token)throw new Error('Сесію не знайдено');return {Authorization:`Bearer ${token}`,'Content-Type':'application/json'};}
  async addWatchlist(movie:Movie):Promise<void>{await parse(await fetch(`${BASE_URL}/watchlist`,{method:'POST',headers:await this.authHeaders(),body:JSON.stringify({movieId:movie.id,title:movie.title,posterPath:movie.posterPath,voteAverage:movie.voteAverage,releaseDate:movie.releaseDate})}));}
  async removeWatchlist(movieId:number):Promise<void>{await parse(await fetch(`${BASE_URL}/watchlist/${movieId}`,{method:'DELETE',headers:await this.authHeaders()}));}
}
