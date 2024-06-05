import { useTranslation } from 'react-i18next'
import { useLoaderData, useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'
// Type
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import type { DirectorRecord } from '~/lib/generated'
import type { IDirectorData } from '~/types/director.interface'
import type { IFilterData } from '~/types/filter.interface'
// Lib
import { ResponsiveImageFragmentQuery } from '~/lib/generated'
import { datoQuerySubscription, loadFragments } from '~/lib/datocms'
// Utils
import { getLocale } from '~/utils'
import {
  directorCard,
  getDirectors,
  getDirectorFilters,
  getDirectorUrl,
} from '~/utils/directors'
// Components
import Card from '~/components/Organisms/Card'
import Errors from '~/components/Errors'
// import Filters from '~/components/Organisms/Filters'
import InfiniteScroller from '~/components/Molecules/InfiniteScroller'
import ArchiveTitle from '~/components/Organisms/ArchiveTitle'
import FiltersBlock from '~/components/Sections/FiltersBlock'

export const meta: MetaFunction<typeof loader> = ({ location, data }) => {
  const { globalName, globalDescription, defaultImage } =
    data?.globalData.initialData.common

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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const locale = getLocale(request)
  const url = new URL(request.url)
  const baseUrl = url.origin
  const paramsString = url.search
  const page = 1

  // Get directors form the /api/get-directors
  const dataDirectors: IDirectorData = await getDirectors({
    baseUrl,
    locale,
    page,
    paramsString,
  })

  // Get filters form the /api/get-movie-filters
  const filters: IFilterData[] = await getDirectorFilters({
    baseUrl,
    locale,
  })

  // const t = await i18next.getFixedT(locale)
  const fragments = loadFragments([ResponsiveImageFragmentQuery])

  // const skip = 0
  // let count = 0

  // const datoQueryDirectors = await datoQuerySubscription({
  //   request,
  //   query: GET_DIRECTORS_QUERY,
  //   variables: { locale, first: 100, skip }, // The number of items passed to the query
  // })

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
    variables: { locale }, // The number of items passed to the query
  })

  return {
    dataDirectors,
    filters,
    globalData: datoQueryGlobal.datoQuerySubscription,
  }
}

export default function SingleDirector(): JSX.Element {
  const { i18n, t } = useTranslation()
  const locale = i18n.language || 'it'
  const data = useLoaderData<typeof loader>()

  const dataDirectors = data.dataDirectors as IDirectorData
  const initialDirectors = dataDirectors.directors as DirectorRecord[]
  const total = dataDirectors.total

  const [directors, setDirectors] = useState<DirectorRecord[]>(initialDirectors)
  const [page, setPage] = useState(2)
  const fetcher = useFetcher()

  const filters = data.filters as IFilterData[]

  // TODO: make dynamic from CMS
  const title = 'Directors'
  const content =
    'Fusce dapibus, ipsum at pharetra auctor, lacus arcu egestas est, quis rhoncus nisi est ut purus. In pellentesque lectus id nisi ullamcorper aliquet.'

  // Group directors by first letter
  const directorsByLetter = directors.reduce<Record<string, DirectorRecord[]>>(
    (acc, el) => {
      const firstLetter = el.lastName ? el.lastName[0].toUpperCase() : ''
      if (firstLetter) {
        if (!acc[firstLetter]) {
          acc[firstLetter] = []
        }
        acc[firstLetter].push(el)
      }
      return acc
    },
    {},
  )

  const allLoaded = directors.length === total

  // Update directors and page when inialDirectors changes
  useEffect(() => {
    setDirectors(initialDirectors)
    setPage(2)
  }, [initialDirectors])

  // An effect for appending data to items state
  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return
    }
    // If we have new data - append it
    if (fetcher.data) {
      const data = fetcher.data as IDirectorData
      const newItems = data.directors as DirectorRecord[]
      setDirectors((prevAssets) => [...prevAssets, ...newItems])
      setPage((prevPage) => prevPage + 1)
    }
  }, [fetcher.state, fetcher.data])

  // A method for fetching next page
  const loadNext = () => {
    if (allLoaded) return
    // Get url params
    const url = new URL(window.location.href)
    const paramsString = url.search
    const query = getDirectorUrl({ locale, page, paramsString })
    // Update page in the state
    fetcher.load(query) // this call will trigger the loader with a new query
  }

  return (
    <div className="archive pb-24">
      <ArchiveTitle title={title} content={content} />

      <div className="container">
        {/* Filters */}
        <FiltersBlock filters={filters} />
        <div className="flex justify-between items-center gap-x-4 gap-y-3 my-6 lg:mt-16 lg:mb-10">
          <span className="body-s font-semibold text-black/70 uppercase">
            {total} {t('totalDirectors')}
          </span>
        </div>
        {/* Directors */}
        <InfiniteScroller
          loadNext={loadNext}
          loading={allLoaded ? false : fetcher.state === 'loading'}
        >
          {Object.keys(directorsByLetter)
            .sort()
            .map((letter) => (
              <div className="my-8 lg:my-10" key={letter}>
                <span className="rounded-full bg-primary text-black mb-6 h-8 w-8 lg:h-12 lg:w-12 inline-block h4 font-sans text-center !leading-[32px] lg:!leading-[48px]">
                  {letter}
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {directorsByLetter[letter].map((director) => (
                    <Card key={director.id} {...directorCard(director)} />
                  ))}
                </div>
              </div>
            ))}
        </InfiniteScroller>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <Errors />
}
