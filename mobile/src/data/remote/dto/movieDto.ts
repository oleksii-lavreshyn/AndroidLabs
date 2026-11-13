import type { Movie } from '@/domain/models';
export interface MovieDto { id: number; title: string; overview?: string; poster_path?: string | null; vote_average?: number; release_date?: string | null; }
export interface MoviePageDto { page: number; results: MovieDto[]; total_pages: number; }
export function movieDtoToEntity(dto: MovieDto, page = 1): Movie {
  return { id: dto.id, title: dto.title, overview: dto.overview ?? '', posterPath: dto.poster_path ?? null, voteAverage: dto.vote_average ?? 0, releaseDate: dto.release_date || null, page };
}
