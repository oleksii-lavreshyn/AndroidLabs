import { useCallback,useEffect,useState } from 'react';
import type { WatchlistItem } from '@/domain/models';
import { watchlistRepository } from '@/data/container';
import type { WatchlistRepository } from '@/data/repository/WatchlistRepository';
export function useWatchlistViewModel(repository:WatchlistRepository=watchlistRepository){const[items,setItems]=useState<WatchlistItem[]>([]);const[loading,setLoading]=useState(true);useEffect(()=>{const unsub=repository.itemsFlow.subscribe(setItems);repository.initialize().finally(()=>setLoading(false));return unsub;},[repository]);const remove=useCallback((id:number)=>repository.remove(id),[repository]);return{items,loading,remove};}
