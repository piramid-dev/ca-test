import type { LoaderFunctionArgs } from '@remix-run/node'
import { jsonFiltersToArray } from '~/lib/filter.utils'

// @ts-ignore
import movieFilters from '~/json/allMovieFilters.json'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { locale = 'it' } = params
  const filters = movieFilters[locale]
  const filtersArray = jsonFiltersToArray(filters)

  return filtersArray
}
