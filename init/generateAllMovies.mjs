import { load } from '../app/lib/datocms.mjs'
import { setGlobalData, truncatePhrase } from './utils.mjs'

const locales = ['en', 'it']
const step = 100

export const GET_MOVIES_QUERY = `#graphql
    query ($first: IntType, $skip: IntType, $locale: SiteLocale) {
      meta: _allMoviesMeta { count }
      movies: allMovies(locale: $locale, first: $first, skip: $skip) {
        id
        slug
        originalTitle
        internationalTitle
        localizedTitle
        plot
        abstract
        directors {
          firstName
          lastName
          fullName
        }
        topics {
          name
          slug
        }
        genres {
          name
          slug
        }
        countries {
          name
          slug
        }
        languages {
          name
          slug
        }
        genres {
          name
          slug
        }
        year
        duration
        cover {
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
      }
    }
  `

export const GET_MOVIE_FILTERS_QUERY = `#graphql
    query ($first: IntType, $skip: IntType, $locale: SiteLocale) {
      countries: allCountries(first: $first, skip: $skip, locale: $locale, orderBy: [name_ASC]) {
        name
        slug
      }
      metaCountries: _allCountriesMeta { count }
      languages: allLanguages(first: $first, skip: $skip, locale: $locale, orderBy: [name_ASC]) {
        name
        slug
      }
      metaLanguages: _allLanguagesMeta { count }
      genres: allGenres(first: $first, skip: $skip, locale: $locale, orderBy: [name_ASC]) {
        name
        slug
      }
      metaGenres: _allGenresMeta { count }
      topics: allTopics(first: $first, skip: $skip, locale: $locale, orderBy: [name_ASC]) {
        name
        slug
        color {
          hex
        }
      }
      metaTopics: _allTopicsMeta { count }
    }
  `

const getAllMovies = async () => {
  const allMovies = {}

  try {
    for (const locale of locales) {
      console.log('...Fetching movies for locale:', locale)
      let skip = 0
      let count = 0
      do {
        const results = await load({
          query: GET_MOVIES_QUERY,
          variables: { first: step, skip, locale },
        })
        // Count is the total number of movies
        count = results.meta.count
        // Add movies to the allMovies object
        allMovies[locale] = allMovies[locale]
          ? allMovies[locale].concat(results.movies)
          : [...results.movies]
        // Increment skip by step
        skip += step
      } while (skip < count)

      allMovies[locale] = allMovies[locale].map((movie) => {
        // If abstract is not available, use plot
        const abstract = movie.abstract ? movie.abstract : movie.plot
        const limitedAbstract = truncatePhrase(abstract, 30) // Limit abstract to 30 words
        return {
          ...movie,
          topics: movie.topics.map((topic) => topic.name),
          genres: movie.genres.map((genre) => genre.name),
          countries: movie.countries.map((country) => country.name),
          languages: movie.languages.map((language) => language.name),
          abstract: limitedAbstract.replace(/<[^>]*>?/gm, ''), // Remove HTML tags
        }
      })
    }
    return Promise.resolve(allMovies)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getAllMovieFilters = async () => {
  const allMovieFilters = {}

  try {
    for (const locale of locales) {
      console.log('...Fetching movie filters for locale:', locale)
      let skip = 0
      let count = 0
      do {
        const results = await load({
          query: GET_MOVIE_FILTERS_QUERY,
          variables: { first: step, skip, locale },
        })

        // Count is the max value between all filters
        count = Math.max(
          results.metaCountries.count,
          results.metaLanguages.count,
          results.metaGenres.count,
          results.metaTopics.count,
        )

        allMovieFilters[locale] = {
          topics: allMovieFilters[locale]
            ? allMovieFilters[locale].topics.concat(results.topics)
            : [...results.topics],
          genres: allMovieFilters[locale]
            ? allMovieFilters[locale].genres.concat(results.genres)
            : [...results.genres],
          countries: allMovieFilters[locale]
            ? allMovieFilters[locale].countries.concat(results.countries)
            : [...results.countries],
          languages: allMovieFilters[locale]
            ? allMovieFilters[locale].languages.concat(results.languages)
            : [...results.languages],
        }
        // Increment skip by step
        skip += step
      } while (skip < count)
    }
    return allMovieFilters
  } catch (error) {
    return Promise.reject(error)
  }
}

console.log('...Running getAllMovies')
const allMovies = await getAllMovies()
setGlobalData(allMovies, 'allMovies.json')

console.log('...Running getAllMovieFilters')
const allMovieFilters = await getAllMovieFilters()
setGlobalData(allMovieFilters, 'allMovieFilters.json')
