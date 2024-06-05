import type { LoaderFunctionArgs } from '@remix-run/node'
import type { DirectorRecord } from '~/lib/generated'
import { filterChecker, getFiltersFromQuery } from '~/lib/filter.utils'
// @ts-ignore
import allDirectors from '~/json/allDirectors.json'

export type DirectorsResponse = { data: DirectorRecord[]; page: number }

const DIRECTORS_PER_PAGE = 24

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { locale = 'it', page = '1' } = params
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''
  const filters = getFiltersFromQuery(query)

  const filteredDirectors: DirectorRecord[] = allDirectors[locale].filter(
    (director) => {
      return filters.every((filter) => {
        if (filter.subject === 'alphabetic') {
          return filter.values.some((value) =>
            director.lastName.startsWith(value),
          )
        } else {
          return filterChecker(director[filter.subject], filter.values)
        }
      })
    },
  )

  // Sort directors by last name
  const sortedDirectors = filteredDirectors.sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1
    }
    if (a.lastName > b.lastName) {
      return 1
    }
    return 0
  })

  let directors = [] as DirectorRecord[]

  if (page === 'all') {
    return sortedDirectors
  } else {
    directors = sortedDirectors.slice(
      (parseInt(page) - 1) * DIRECTORS_PER_PAGE,
      parseInt(page) * DIRECTORS_PER_PAGE,
    )
  }

  return { directors, page: parseInt(page), total: filteredDirectors.length }
}
