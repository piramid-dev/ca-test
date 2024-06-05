import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from '@remix-run/react'
import { useQuerySubscription } from 'react-datocms'
// Lib
import type { MovieRecord } from '~/lib/generated'
import { datoQuerySubscription } from '~/lib/datocms'
import { metaFromMovie } from '~/lib/meta.utils'
// Utils
import { getLocale } from '~/utils'
import { movieHero, movieIntro, downLoadMediaItems } from '~/utils/movies'
// Components
import Errors from '~/components/Errors'
import HeroMovie from '~/components/Organisms/HeroMovie'
import MovieIntro from '~/components/Sections/MovieIntro'
import DirectorQuote from '~/components/Sections/DirectorQuote'
import TitleTextBlock from '~/components/Organisms/TitleTextBlock'
// import ContentImageBlock from '../Organisms/ContentImageBlock'
import Gallery from '~/components/Organisms/Gallery'
import DownloadMedia from '~/components/Sections/DownloadMedia'

// import Carousel from '../Organisms/Carousel'
// import ExploreCategories from '../Sections/ExploreCategories'
// import i18next from '~/i18next.server'
import { SINGLE_MOVIE_QUERY } from './movies.query'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // if movie is not found, return an error
  if (!data?.movieData?.initialData.movie) {
    return [{ title: 'Error!' }]
  }
  const initialData: any = data ? data.movieData.initialData : {}
  const movie: MovieRecord = initialData?.movie || {}
  return metaFromMovie(movie)
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const slug = params.slug
  const locale = getLocale(request)
  // const t = await i18next.getFixedT(locale)

  const datoQueryMovie = await datoQuerySubscription({
    request,
    query: SINGLE_MOVIE_QUERY,
    variables: { locale, slug }, // The number of items passed to the query
  })

  return {
    movieData: datoQueryMovie.datoQuerySubscription,
  }
}

export default function SingleMovie(): JSX.Element {
  const { t } = useTranslation()
  const { movieData } = useLoaderData<any>()
  const { data } = useQuerySubscription(movieData)
  const movie = data.movie as MovieRecord

  const {
    directorsNotes,
    topics,
    insights,
    localizedTitle,
    internationalTitle,
    originalTitle,
    images,
    poster,
  } = movie

  const categoryColor = topics[0]?.color?.hex
  const title = localizedTitle || internationalTitle || originalTitle

  return (
    <div>
      <HeroMovie {...movieHero(movie)} />
      <MovieIntro {...movieIntro(movie)} />
      {directorsNotes ? (
        <DirectorQuote quote={directorsNotes} categoryColor={categoryColor} />
      ) : null}
      {insights ? (
        <TitleTextBlock
          eyelet={t('moviePage.insights')}
          preTitle={t('moviePage.about')}
          title={title}
          content={insights}
        />
      ) : null}
      {images && images.length > 0 ? (
        <Gallery
          title={t('moviePage.gallery')}
          images={images.map((image) => image.responsiveImage)}
        />
      ) : null}
      <DownloadMedia
        items={downLoadMediaItems(movie).map((item) => ({
          ...item,
          title: t(item.title || ''),
          button: {
            ...item.button,
            label: t(item.button.label || ''),
          },
        }))}
        title={t('moviePage.downloadMedia')}
        image={poster?.responsiveImage}
      />
    </div>
  )
}

export function ErrorBoundary() {
  return <Errors />
}
