const { pages, topics, movies, directors } = require('./_routes/index.json')

const routes = [...pages, ...topics, ...movies, ...directors]

const allRoutes = routes.map((r) => ({
  originalPath: `/en/${r.originalPath}`.replace(/(?:\/)\/+/gm, '/'),
  path: `/${r.path}`.replace(/(?:\/)\/+/gm, '/'),
  component: `pages/${r.component}.tsx`,
}))

module.exports = allRoutes
