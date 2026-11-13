import type { Movie } from '@/domain/models';
import type { MovieDao } from '../local/daos/MovieDao';
import type { TmdbApi } from '../remote/tmdbApi';
import { movieDtoToEntity } from '../remote/dto/movieDto';
export class MovieRepository {
  readonly moviesFlow; private nextPage=1; private totalPages=Infinity; private loading=false;
  constructor(private dao:MovieDao,private api:TmdbApi){this.moviesFlow=dao.movies;}
  async initialize():Promise<void>{await this.dao.refresh();}
  async syncMovies(page=1):Promise<Movie[]>{if(this.loading)return this.moviesFlow.get();this.loading=true;try{const response=await this.api.popular(page);const movies=response.results.map((item)=>movieDtoToEntity(item,page));await this.dao.upsertAll(movies);this.nextPage=Math.max(this.nextPage,page+1);this.totalPages=response.total_pages;return this.moviesFlow.get();}finally{this.loading=false;}}
  async loadMore():Promise<Movie[]>{if(this.loading||this.nextPage>this.totalPages)return this.moviesFlow.get();return this.syncMovies(this.nextPage);}
  hasMore():boolean{return this.nextPage<=this.totalPages;}
  getById(id:number){return this.dao.getById(id);}
}
