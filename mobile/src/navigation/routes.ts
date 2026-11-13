import type { Href } from 'expo-router';
export const LoginRoute = (): Href => '/login';
export const HomeRoute = ({ username }: { username: string }): Href => ({ pathname: '/(tabs)', params: { username } });
export const MovieDetailRoute = ({ movieId }: { movieId: number }): Href => ({ pathname: '/movie/[movieId]', params: { movieId: String(movieId) } });
export interface MovieSelection { ids: number[]; source: 'popular'|'watchlist'; }
export const MovieSelectionRoute = (selection: MovieSelection): Href => ({ pathname: '/(tabs)', params: { selection: JSON.stringify(selection) } });
export function parseMovieSelection(value: string|string[]|undefined): MovieSelection|null { try { const parsed=JSON.parse(Array.isArray(value)?value[0]??'':value??'') as Partial<MovieSelection>; return Array.isArray(parsed.ids)&&parsed.ids.every(Number.isInteger)&&(parsed.source==='popular'||parsed.source==='watchlist') ? parsed as MovieSelection : null; } catch { return null; } }
