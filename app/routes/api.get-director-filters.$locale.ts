import type { LoaderFunctionArgs } from '@remix-run/node'
import type { FilterValue } from '~/types/filter.interface'
import { jsonFiltersToArray } from '~/lib/filter.utils'

// @ts-ignore
import directorFilters from '~/json/allDirectorFilters.json'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { locale = 'it' } = params
  const filters = directorFilters[locale]
  // Generate all the letters of the alphabet
  const allLetters = Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(65 + i)
    return { name: letter, slug: letter }
  })
  // Merge the alphabetic filter with the other filters
  const allFilters: FilterValue[] = { ...filters, alphabetic: allLetters }
  const filtersArray = jsonFiltersToArray(allFilters)

  return filtersArray
}
