import type {
  IFilter,
  FilterValue,
  IFilterData,
} from '~/types/filter.interface'
import { slugifyArray, paramsToArray } from '~/utils'

// Check if the target array is included in the source array
export const checker = (source: string[], target: string[]) => {
  if (source.length === 0) return false
  if (target.length === 0) return true
  return slugifyArray(target).every((v) => slugifyArray(source).includes(v))
}

// Check on the filters
export const filterChecker = (source: string[], filters: string[] | string) => {
  const target = typeof filters === 'string' ? paramsToArray(filters) : filters
  return checker(source, target)
}

// Get filters from query
export const getFiltersFromQuery = (
  query: string | null | undefined,
  divider: string = '-and-',
) => {
  if (!query) return []
  const filters: IFilter[] = query
    ? query.split(divider).map((filter) => {
        const [subject, values] = filter.split(' ')
        return {
          subject: subject?.trim(),
          values: values
            ?.trim()
            ?.split(',') // split by comma
            .filter((item) => item !== ''), // remove empty strings
        }
      })
    : []
  return filters
}

// Set filter to query
export const setFiltersToQuery = (
  filters: IFilter[],
  divider: string = '-and-',
) => {
  return filters
    .map((filter) => `${filter.subject} ${filter.values.join(',')}`)
    .join(divider)
}

// Get order from query
export const getOrderFromQuery = (query: string | null | undefined) => {
  if (!query) return { order: '', direction: '' }
  const [name, direction] = query.split('+')
  return { name, direction }
}

// Tranform json filter to filterArray
export const jsonFiltersToArray = (filters: any): IFilterData[] => {
  return Object.keys(filters).map((key) => {
    const subject: string = key
    const values: FilterValue[] = filters[key]
    return { subject, values }
  })
}

// Filter icons
export const filterIcons = (filterName: string) => {
  const icons = {
    countries: 'GlobeHemisphereWest',
    genres: 'FilmStrip',
    languages: 'Translate',
    duration: 'Timer',
    topics: 'Folders',
    alphabetic: 'AddressBook',
  }

  return icons[filterName]
}

// Filter types
export const filterType = (filterName: string) => {
  const types = {
    countries: 'list',
    alphabetic: 'list',
    languages: 'list',
    genres: 'default',
    duration: 'default',
    topics: 'category',
  }

  return types[filterName]
}

// Find how many items with this filter
export const countItemsByFilter = (
  items,
  filterName: string,
  filterValue: string,
) => {
  const itemsFound = items.filter((item) =>
    item[filterName]?.includes(filterValue),
  )
  return itemsFound?.length || 0
}
