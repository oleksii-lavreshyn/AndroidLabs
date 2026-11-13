import type { Movie } from '@/domain/models';
import type { WatchlistDao } from '../local/daos/WatchlistDao';
import type { BackendApi } from '../remote/backendApi';
export class WatchlistRepository {
 readonly itemsFlow; constructor(private dao:WatchlistDao,private api:BackendApi){this.itemsFlow=dao.items;}
 async initialize(){await this.dao.refresh();await this.retryPending();}
 async add(movie:Movie){await this.dao.add(movie);await this.retryPending();}
 async remove(movieId:number){await this.dao.remove(movieId);await this.retryPending();}
 contains(movieId:number){return this.dao.contains(movieId);}
 async retryPending():Promise<void>{for(const operation of await this.dao.pending()){try{if(operation.operation==='add'&&operation.payload)await this.api.addWatchlist(JSON.parse(operation.payload) as Movie);else await this.api.removeWatchlist(operation.movieId);await this.dao.complete(operation.id);}catch{return;}}}
}
