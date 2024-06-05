import type { DirectorRecord } from '~/lib/generated'

export interface IDirectorData {
  directors: DirectorRecord[]
  page: number
  total: number
}
