export const SINGLE_DIRECTOR_QUERY = `#graphql
    query ($slug: String, $locale: SiteLocale) {
      director(locale: $locale, filter: { slug: { eq: $slug } }) {
        id
        slug
        firstName
        lastName
        fullName
        bio
        countries {
          name
        }
        born
        photo {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 800, fpY: 0}) {
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
        _allReferencingMovies {
          id
          originalTitle
          internationalTitle
          localizedTitle
          slug
          plot
          abstract
          genres {
            name
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
    }
  `

export const GET_DIRECTORS_QUERY = `#graphql
    query ($first: IntType, $skip: IntType, $locale: SiteLocale) {
      directors: allDirectors(locale: $locale, first: $first, skip: $skip) {
        id
        slug
        firstName
        lastName
        fullName
        countries {
          name
        }
        photo {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 800, fpY: 0}) {
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
