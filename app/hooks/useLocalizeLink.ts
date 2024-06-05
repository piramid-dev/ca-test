import { useTranslation } from 'react-i18next'

import { findRoutes } from '~/utils/routing'

export const useLocalizeLink = () => {
  const { i18n } = useTranslation()
  const locale = i18n.language

  const localizeLink = (path: string) => {
    if (locale === 'it') {
      let cleanPath = path

      // If path contains
      if (path.includes('/movies') || path.includes('/directors')) {
        const pathContainsMovies = path.includes('/movies')
        const pathContainsDirectors = path.includes('/directors')

        // Get the last part of the path after the last slash
        const lastPart =
          path.split('/').length > 3
            ? path.substring(path.lastIndexOf('/') + 1)
            : ''

        if (pathContainsMovies) {
          cleanPath = path.replace('/movies', '/film')
        } else if (pathContainsDirectors) {
          cleanPath = path.replace('/directors', '/registi')
        } else {
          cleanPath = path
        }

        const findRoute = findRoutes(cleanPath)
        return findRoute ? `${findRoute}/${lastPart}` : cleanPath
      }

      const findRoute = findRoutes(path)
      return findRoute || `/en${path}`
    }

    // In english return the path
    return `/en${path}`
  }

  return { l: localizeLink, locale }
}
