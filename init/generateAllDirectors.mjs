import { load } from '../app/lib/datocms.mjs'
import { setGlobalData } from './utils.mjs'

const locales = ['en', 'it']
const step = 100

export const GET_DIRECTORS_QUERY = `#graphql
    query ($first: IntType, $skip: IntType, $locale: SiteLocale) {
      meta: _allDirectorsMeta { count }
      directors: allDirectors(locale: $locale, first: $first, skip: $skip) {
        id
        slug
        firstName
        lastName
        fullName
        bio
        countries {
          name
          slug
        }
        photo {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 400, fpY: 0}) {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            base64
          }
        }
        movies: _allReferencingMovies {
          slug
          originalTitle
          internationalTitle
          localizedTitle
          genres {
            name
          }
        }
      }
    }
  `

export const GET_DIRECTOR_FILTERS_QUERY = `#graphql
    query ($first: IntType, $skip: IntType, $locale: SiteLocale) {
      countries: allCountries(first: $first, skip: $skip, locale: $locale, orderBy: [name_ASC]) {
        name
        slug
      }
      metaCountries: _allCountriesMeta { count }
      genres: allGenres(first: $first, skip: $skip, locale: $locale, orderBy: [name_ASC]) {
        name
        slug
      }
      metaGenres: _allGenresMeta { count }
    }
  `

const getAllDirectors = async () => {
  const allDirectors = {}

  try {
    for (const locale of locales) {
      console.log('...Fetching directors for locale:', locale)
      let skip = 0
      let count = 0
      do {
        const results = await load({
          query: GET_DIRECTORS_QUERY,
          variables: { first: step, skip, locale },
        })
        // Count is the total number of directors
        count = results.meta.count
        // Add directors to the allDirectors object
        allDirectors[locale] = allDirectors[locale]
          ? allDirectors[locale].concat(results.directors)
          : [...results.directors]
        // Increment skip by step
        skip += step
      } while (skip < count)

      allDirectors[locale] = allDirectors[locale].map((director) => {
        return {
          ...director,
          countries: director.countries.map((country) => country.name),
          genres: director.movies
            .map((movie) => movie.genres.map((genre) => genre.name))
            .flat(),
        }
      })
    }
    return Promise.resolve(allDirectors)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getAllDirectorFilters = async () => {
  const allDirectorFilters = {}

  try {
    for (const locale of locales) {
      console.log('...Fetching director filters for locale:', locale)
      let skip = 0
      let count = 0
      do {
        const results = await load({
          query: GET_DIRECTOR_FILTERS_QUERY,
          variables: { first: step, skip, locale },
        })

        // Count is the max value between all filters
        count = Math.max(results.metaCountries.count, results.metaGenres.count)

        allDirectorFilters[locale] = {
          countries: allDirectorFilters[locale]
            ? allDirectorFilters[locale].countries.concat(results.countries)
            : [...results.countries],
          genres: allDirectorFilters[locale]
            ? allDirectorFilters[locale].genres.concat(results.genres)
            : [...results.genres],
        }
        // Increment skip by step
        skip += step
      } while (skip < count)
    }
    return allDirectorFilters
  } catch (error) {
    return Promise.reject(error)
  }
}

console.log('...Running getAllDirectors')
const allDirectors = await getAllDirectors()
setGlobalData(allDirectors, 'allDirectors.json')

console.log('...Running getAllDirectorFilters')
const allDirectorFilter = await getAllDirectorFilters()
setGlobalData(allDirectorFilter, 'allDirectorFilters.json')
