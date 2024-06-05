import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from '@remix-run/react'
import { useQuerySubscription } from 'react-datocms'
import type { DirectorRecord, MovieRecord } from '~/lib/generated'
// Lib
import { datoQuerySubscription } from '~/lib/datocms'
import { metaFromDirector } from '~/lib/meta.utils'
// Utils
import { getLocale } from '~/utils'
import { movieCard } from '~/utils/movies'
// Components
import Errors from '~/components/Errors'
import HeroDirector from '~/components/Organisms/HeroDirector'
import Card from '~/components/Organisms/Card'
import Carousel from '~/components/Organisms/Carousel'

import { SINGLE_DIRECTOR_QUERY } from './directors.query'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // if director is not found, return an error
  if (!data?.directorData?.initialData.director) {
    return [{ title: 'Error!' }]
  }
  const initialData: any = data ? data.directorData.initialData : {}
  const director: DirectorRecord = initialData?.director || {}
  return metaFromDirector(director)
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const slug = params.slug
  const locale = getLocale(request)

  const datoQueryDirector = await datoQuerySubscription({
    request,
    query: SINGLE_DIRECTOR_QUERY,
    variables: { locale, slug }, // The number of items passed to the query
  })

  return {
    directorData: datoQueryDirector.datoQuerySubscription,
  }
}

export default function SingleDirector(): JSX.Element {
  const { t } = useTranslation()
  const { directorData } = useLoaderData<any>()
  const { data } = useQuerySubscription(directorData)
  const director = data.director as DirectorRecord
  const movies = director._allReferencingMovies as MovieRecord[]

  const { firstName, lastName, photo, bio, countries, born } = director

  const genres = movies
    .map((movie) => movie.genres.map((genre) => genre?.name))
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index)

  const directorInfo = [
    {
      data: t('directorPage.nationality'),
      value: countries?.map((nation) => nation.name).join(', '),
    },
    { data: t('directorPage.born'), value: born },
    { data: t('genres'), value: genres.join(', ') },
  ]

  // Remove items with empty values
  const filteredDirectorInfo = directorInfo.filter((item) => item.value)

  const heroMeta = {
    firstname: firstName,
    lastname: lastName,
    image: photo?.responsiveImage,
    bio,
    directorInfo: filteredDirectorInfo,
  }

  // Remove duplicate movies
  const uniqueMovies = movies.filter(
    (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
  )

  const carouselMeta = {
    eyelet: t('directorPage.learnMore'),
    pretitle: t('directorPage.discoverAllTheMovies'),
    title: director.fullName,
    content: '',
    backgroundColor: 'black',
    children: uniqueMovies.map((movie, i) => (
      <Card key={i} {...movieCard(movie, director)} />
    )),
  }

  return (
    <div>
      <HeroDirector {...heroMeta} />
      <Carousel {...carouselMeta} overlap />
    </div>
  )
}

export function ErrorBoundary() {
  return <Errors />
}
