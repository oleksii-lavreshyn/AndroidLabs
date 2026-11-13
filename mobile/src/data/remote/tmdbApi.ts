import { SecureStorage } from '@/utils/SecureStorage';
import type { MoviePageDto } from './dto/movieDto';
const BASE_URL='https://api.themoviedb.org/3';
export class TmdbApi {
  private async request(path:string):Promise<MoviePageDto>{const token=await SecureStorage.get('tmdbToken');if(!token)throw new Error('Додайте TMDB Bearer token у налаштуваннях');const response=await fetch(`${BASE_URL}${path}`,{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'}});if(!response.ok)throw new Error(response.status===401?'TMDB token недійсний':`Помилка TMDB: ${response.status}`);return response.json() as Promise<MoviePageDto>;}
  popular(page:number):Promise<MoviePageDto>{return this.request(`/movie/popular?language=uk-UA&page=${page}`);}
  nowPlaying():Promise<MoviePageDto>{return this.request('/movie/now_playing?language=uk-UA&page=1');}
}
