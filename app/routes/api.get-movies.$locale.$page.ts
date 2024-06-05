import type { LoaderFunctionArgs } from '@remix-run/node'
import type { MovieRecord } from '~/lib/generated'
import { filterChecker, getFiltersFromQuery } from '~/lib/filter.utils'
// @ts-ignore
import allMovies from '~/json/allMovies.json'

const MOVIES_PER_PAGE = 24

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { locale = 'it', page = '1' } = params
  const url = new URL(request.url)
  const order = url.searchParams.get('order')
  const query = url.searchParams.get('q') || ''
  const filters = getFiltersFromQuery(query)
  const value = order?.split('+')[0]
  const direction = order ? order.split('+')[1] : 'asc'

  const filteredMovies: MovieRecord[] = allMovies[locale].filter((movie) => {
    return filters.every((filter) =>
      filterChecker(movie[filter.subject], filter.values),
    )
  })

  let sortedMovies = filteredMovies

  if (value === 'year') {
    sortedMovies = filteredMovies.sort((a, b) => {
      if (direction === 'asc') {
        return a.year - b.year
      } else {
        return b.year - a.year
      }
    })
  } else {
    sortedMovies = filteredMovies.sort((a, b) => {
      const titleA = a.localizedTitle || a.internationalTitle || a.originalTitle
      const titleB = b.localizedTitle || b.internationalTitle || b.originalTitle
      if (direction === 'asc') {
        return titleA.localeCompare(titleB)
      } else {
        return titleB.localeCompare(titleA)
      }
    })
  }

  let movies = [] as MovieRecord[]

  if (page === 'all') {
    return sortedMovies
  } else {
    movies = sortedMovies.slice(
      (parseInt(page) - 1) * MOVIES_PER_PAGE,
      parseInt(page) * MOVIES_PER_PAGE,
    )
  }

  return { movies, page: parseInt(page), total: filteredMovies.length }
}
