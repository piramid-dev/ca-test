export const SINGLE_MOVIE_QUERY = `#graphql
    query ($slug: String, $locale: SiteLocale) {
      movie: movie(locale: $locale, filter: { slug: { eq: $slug } }) {
        id
        slug
        originalTitle
        internationalTitle
        localizedTitle
        plot
        abstract
        directorsNotes
        insights
        directors {
          firstName
          lastName
          fullName
          slug
        }
        coDirectors {
          fullName
        }
        producers {
          ...on PersonRecord{
            fullName
          }
          ...on DirectorRecord {
            fullName
          }
        }
        productionCompanies {
          name
        }
        distributors {
          name
        }
        credits {
          fullName
          role {
            name
          }
        }
        countries {
          name
        }
        languages {
          name
        }
        genres {
          name
        }
        year
        duration
        topics {
          name
          slug
          color {
            hex
          }
        }
        tags {
          name
        }
        specialTopics {
          name
          educationalKit {
            url
          }
        }
        recommendedAge
        website
        cover {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000, fpY: 0}) {
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
        images {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000, fpY: 0}) {
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
        poster {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 900, fpY: 0}) {
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
        pressbook {
          url
        }
        trailerClip {
          url
        }
        streamingVideo
        publicStreaming 
      }
    }
  `

export const GET_MOVIES_QUERY = `#graphql
    query ($first: IntType, $skip: IntType, $locale: SiteLocale) {
      movies: allMovies(locale: $locale, first: $first, skip: $skip) {
        id
        slug
        originalTitle
        internationalTitle
        localizedTitle
        abstract
        plot
        directors {
          firstName
          lastName
          fullName
        }
        topics {
          name
          slug
        }
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
