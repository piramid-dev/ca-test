import type { MovieRecord } from '~/lib/generated'

export interface IMovieData {
  movies: MovieRecord[]
  page: number
  total: number
}
