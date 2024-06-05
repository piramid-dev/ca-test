import type { ColorField } from '~/lib/generated'

export interface IFilter {
  subject: string
  values: string[]
}

export type FilterValue = {
  name: string
  slug: string
  color?: ColorField
}

export interface IFilterData {
  subject: string
  values: FilterValue[]
}

export interface ISortOption {
  name: string
  label: string
  direction: 'asc' | 'desc'
  alphabetically?: boolean
}
