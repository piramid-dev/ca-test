import routes from '~/pages/_routes.js'

type Route = {
  path: string
  originalPath: string
  component: string
}

// Find route
export const findRoutes = (path: string) => {
  const route = routes.find(
    (route: Route) =>
      route.originalPath === path ||
      route.originalPath.includes(path) ||
      route.originalPath.replace(':slug', '') === path,
  )
  return route ? route.path : null
}

// Localize url
export const localizeUrl = (url: string, locale: string) => {
  if (locale === 'it') {
    const findRoute = findRoutes(url)
    return findRoute || url
  }
  return url
}

// Clean domain, remove double slashes
export const cleanDomain = (string: string) => {
  return string.replace(/(?:\/)\/+/gm, '/')
}
