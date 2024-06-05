import type { MovieRecord, DirectorRecord } from '~/lib/generated'
import type { DownloadItemProps } from '~/components/Organisms/DownloadItem/DownloadItem'
import type { IMovieData } from '~/types/movie.interface'
import type { IFilterData } from '~/types/filter.interface'

export const movieCard = (movie: MovieRecord, director: DirectorRecord) => {
  const {
    id,
    originalTitle,
    localizedTitle,
    internationalTitle,
    cover,
    topics,
    abstract,
    plot,
    slug,
  } = movie

  const topic = topics && topics[0]

  return {
    id,
    eyelet: director.fullName || '',
    title: localizedTitle || internationalTitle || originalTitle,
    content: abstract || plot,
    image: cover.responsiveImage,
    category: topic?.name,
    categoryColor: topic && topic.color ? topic.color.hex : 'red',
    to: `/movies/${slug}`,
  }
}

export const movieHero = (movie: MovieRecord) => {
  const {
    originalTitle,
    internationalTitle,
    localizedTitle,
    specialTopics,
    topics,
    trailerClip,
    cover,
  } = movie

  const topic = topics[0]

  return {
    title: localizedTitle || internationalTitle || originalTitle,
    image: cover.responsiveImage,
    movieLink: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    mainCategory: topic
      ? {
          label: topic.name,
          url: `/topic/${topic.slug}`,
          color: topic.color?.hex,
        }
      : null,
    // tags: [ // --> subcategories of topic
    //   { to: '/', label: 'Sub 1' },
    //   { to: '/', label: 'Sub 2' },
    // ],
    trailerLink: trailerClip?.url,
    kit: specialTopics && specialTopics[0]?.educationalKit?.url,
  }
}

export const movieIntro = (movie: MovieRecord) => {
  const {
    originalTitle,
    internationalTitle,
    plot,
    directors,
    coDirectors,
    producers,
    productionCompanies,
    distributors,
    credits,
    genres,
    tags,
    languages,
    countries,
    year,
    duration,
    website,
  } = movie

  const _credits = credits
    ? credits.map((credit) => {
        return { data: credit?.role?.name, value: credit.fullName }
      })
    : []

  return {
    eyelet: 'moviePage.directedBy',
    directors: directors.map((director) => ({
      label: director.fullName,
      to: `/directors/${director.slug}`,
    })),
    content: plot,
    tags: tags.map((tag) => ({
      label: tag.name,
      to: '/',
    })),
    movieTable: {
      basicInfo: [
        {
          data: 'moviePage.originalTitle',
          value: originalTitle,
        },
        {
          data: 'moviePage.internationallTitle',
          value: internationalTitle,
        },
        {
          data: 'moviePage.genre',
          value: genres.map((genre) => genre.name).join(', '),
        },
        {
          data: 'moviePage.country',
          value: countries?.map((country) => country.name).join(', '),
        },
        {
          data: 'moviePage.year',
          value: year,
        },
        {
          data: 'moviePage.duration',
          value: duration + '"',
        },
      ],
      additionalInfos: [
        {
          data: 'moviePage.coDirectors',
          value: coDirectors?.map((person) => person.fullName).join(', '),
        },
        {
          data: 'moviePage.producers',
          value: producers.map((person) => person.fullName).join(', '),
        },
        {
          data: 'moviePage.productionCompanies',
          value: productionCompanies?.map((company) => company.name).join(', '),
        },
        {
          data: 'moviePage.distributors',
          value: distributors.map((distributor) => distributor.name).join(', '),
        },
        {
          data: 'moviePage.languages',
          value: languages.map((language) => language.name).join(', '),
        },
        ..._credits,
        {
          data: 'website',
          value: website,
          valueIsLink: true,
        },
      ],
    },
  }
}

export const downLoadMediaItems = (movie: MovieRecord) => {
  const { poster, images, pressbook } = movie
  const items = [] as DownloadItemProps[]

  const posterItem = {
    slug: movie.slug,
    title: 'moviePage.poster',
    button: {
      link: poster?.responsiveImage?.src,
      label: 'download',
      target: '_blank',
    },
    files: [poster?.responsiveImage?.src.split('?')[0]],
  }

  const imagesItem = {
    slug: movie.slug,
    title: 'moviePage.highResImages',
    button: {
      label: 'download',
      target: '_blank',
    },
    files:
      images && images.map((image) => image.responsiveImage?.src.split('?')[0]),
  }

  const pressBookItem = {
    slug: movie.slug,
    title: 'moviePage.pressbook',
    button: {
      link: pressbook?.url,
      label: 'download',
      target: '_blank',
    },
    files: [pressbook?.url],
  }

  if (poster) {
    items.push(posterItem)
  }
  if (images && images.length > 0) {
    items.push(imagesItem)
  }
  if (pressbook) {
    items.push(pressBookItem)
  }

  return items
}

// Get movies url
export const getMoviesUrl = ({ baseUrl = '', locale, page, paramsString }) => {
  return `${baseUrl}/api/get-movies/${locale}/${page}/${paramsString}`
}

// Get all movies url
export const getAllMoviesUrl = ({ baseUrl = '', locale, page = 'all' }) => {
  return `${baseUrl}/api/get-movies/${locale}/${page}`
}

// Get movies from the /api/get-movies
export const getMovies = async ({ baseUrl, locale, page, paramsString }) => {
  const dataMovies: IMovieData = await fetch(
    getMoviesUrl({ baseUrl, locale, page, paramsString }),
  ).then((res) => res.json())
  return dataMovies
}

// Get movie filters
export const getMovieFilters = async ({ baseUrl, locale }) => {
  const filters: IFilterData[] = await fetch(
    `${baseUrl}/api/get-movie-filters/${locale}/`,
  ).then((res) => res.json())

  return filters
}
