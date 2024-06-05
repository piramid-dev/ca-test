import { useTranslation } from 'react-i18next'
import { useLoaderData, useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'
// Types
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import type { MovieRecord } from '~/lib/generated'
import type { IMovieData } from '~/types/movie.interface'
import type { ISortOption, IFilterData } from '~/types/filter.interface'
// Lib
import { ResponsiveImageFragmentQuery } from '~/lib/generated'
import { datoQuerySubscription, loadFragments } from '~/lib/datocms'
// Utils
import { getLocale } from '~/utils'
import {
  movieCard,
  getMovies,
  getMovieFilters,
  getMoviesUrl,
} from '~/utils/movies'
// Components
import Card from '~/components/Organisms/Card'
import Errors from '~/components/Errors'
import InfiniteScroller from '~/components/Molecules/InfiniteScroller'
import DropdownOrder from '~/components/Molecules/DropdownOrder'
import ArchiveTitle from '~/components/Organisms/ArchiveTitle'
import FiltersBlock from '~/components/Sections/FiltersBlock'

export const meta: MetaFunction<typeof loader> = ({ location, data }) => {
  const { globalName, globalDescription, defaultImage } =
    data?.globalData.initialData.common || {}

  return [
    { title: globalName },
    { name: 'description', content: globalDescription },
    {
      property: 'og:image',
      content: defaultImage?.responsiveImage.src,
    },
    {
      tagName: 'link',
      rel: 'canonical',
      href: location.pathname + location.search,
    },
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = getLocale(request)
  const url = new URL(request.url)
  const baseUrl = url.origin
  const paramsString = url.search
  const page = 1

  // Get movies form the /api/get-movies
  const dataMovies: IMovieData = await getMovies({
    baseUrl,
    locale,
    page,
    paramsString,
  })

  // Get filters form the /api/get-movie-filters
  const filters: IFilterData[] = await getMovieFilters({ baseUrl, locale })

  // For SEO purpose
  const fragments = loadFragments([ResponsiveImageFragmentQuery])
  const globalQuery = `#graphql
      query($locale: SiteLocale) {
        common: common(locale: $locale){
          globalName
          globalDescription
          defaultImage{
            responsiveImage(
              imgixParams: { fm: jpg }
            ) {
              ...responsiveImage
            }
          }
        }
      }
      ${fragments}
    `

  const datoQueryGlobal = await datoQuerySubscription({
    request,
    query: globalQuery,
    variables: { locale },
  })

  return {
    dataMovies,
    filters,
    globalData: datoQueryGlobal.datoQuerySubscription,
  }
}

export default function SingleMovie(): JSX.Element {
  const { i18n, t } = useTranslation()
  const locale = i18n.language || 'it'
  const data = useLoaderData<typeof loader>()
  const dataMovies = data.dataMovies as IMovieData
  const initialMovies = dataMovies.movies as MovieRecord[]
  const total = dataMovies.total

  const [movies, setMovies] = useState<MovieRecord[]>(initialMovies)
  const [page, setPage] = useState(2)
  const fetcher = useFetcher()

  const filters = data.filters as IFilterData[]

  // TODO: make dynamic from CMS
  const title = 'Movies'
  const content =
    'Fusce dapibus, ipsum at pharetra auctor, lacus arcu egestas est, quis rhoncus nisi est ut purus. In pellentesque lectus id nisi ullamcorper aliquet.'

  const allLoaded = movies.length === total

  // Update movies and page when inialMovies changes
  useEffect(() => {
    setMovies(initialMovies)
    setPage(2)
  }, [initialMovies])

  // An effect for appending data to items state
  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return
    }
    // If we have new data - append it
    if (fetcher.data) {
      const data = fetcher.data as IMovieData
      const newItems = data.movies as MovieRecord[]
      setMovies((prevAssets) => [...prevAssets, ...newItems])
      setPage((prevPage) => prevPage + 1)
    }
  }, [fetcher.state, fetcher.data])

  // A method for fetching next page
  const loadNext = () => {
    if (allLoaded) return
    // Get url params
    const url = new URL(window.location.href)
    const paramsString = url.search
    const query = getMoviesUrl({ locale, page, paramsString })
    // Update page in the state
    fetcher.load(query) // this call will trigger the loader with a new query
  }

  // Sort options
  const sortOptions: ISortOption[] = [
    {
      name: 'title',
      label: 'A - Z',
      alphabetically: true,
      direction: 'asc',
    },
    {
      name: 'title',
      label: 'Z- A',
      alphabetically: true,
      direction: 'desc',
    },
    {
      name: 'year',
      label: t('filtersLabels.yearAsc'),
      alphabetically: false,
      direction: 'asc',
    },
    {
      name: 'year',
      label: t('filtersLabels.yearDesc'),
      alphabetically: false,
      direction: 'desc',
    },
  ]

  return (
    <div className="archive pb-24">
      <ArchiveTitle title={title} content={content} />

      <div className="container">
        <FiltersBlock filters={filters} showMovieToggles />
        <div className="flex justify-between items-center gap-x-4 gap-y-3 my-6 lg:mt-16 lg:mb-10">
          <span className="body-s font-semibold text-black/70 uppercase">
            {total} {t('totalMovies')}
          </span>
          <DropdownOrder options={sortOptions} />
        </div>

        <InfiniteScroller
          loadNext={loadNext}
          loading={allLoaded ? false : fetcher.state === 'loading'}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {movies.map((movie) => {
              const director = movie.directors[0]
              return <Card key={movie.id} {...movieCard(movie, director)} />
            })}
          </div>
        </InfiniteScroller>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <Errors />
}
