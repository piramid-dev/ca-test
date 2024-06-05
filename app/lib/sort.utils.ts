import type { MovieRecord, DirectorRecord } from './generated'

export const sortByTitleAsc = (a: MovieRecord, b: MovieRecord): number =>
  a.originalTitle < b.originalTitle ? -1 : 1

export const sortByTitleDesc = (a: MovieRecord, b: MovieRecord): number =>
  b.originalTitle < a.originalTitle ? -1 : 1

// Director
export const sortByNameSurnameAsc = (
  a: DirectorRecord,
  b: DirectorRecord,
): number => (`${a.fullName}` < `${b.fullName} ` ? -1 : 1)

export const sortByNameSurnameDesc = (
  a: DirectorRecord,
  b: DirectorRecord,
): number => (`${b.fullName} ` < `${a.fullName}` ? -1 : 1)

// General
export const sortAlphabetically = (a: string, b: string): number =>
  a < b ? -1 : 1

export const sortByLabelAsc = (a: any, b: any): number =>
  a.label < b.label ? -1 : 1
