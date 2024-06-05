/** @type {import('@remix-run/dev').AppConfig} */
// Import routes.js
const routes = require('./app/pages/_routes_mjs.js')

module.exports = {
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}'],
  serverModuleFormat: 'cjs',
  server:
    !process.env.VERCEL || process.env.NODE_ENV === 'development'
      ? undefined
      : './build/index.js',

  // serverDependenciesToBundle: 'all',
  serverDependenciesToBundle: [
    '@phosphor-icons/react',
    'datocms-structured-text-generic-html-renderer',
    'datocms-structured-text-utils',
    'dequal',
    'react-datocms',
    'react-intersection-observer',
    'use-deep-compare-effect',
    'react-photoswipe-gallery',
    'photoswipe',
    'photoswipe/dist/photoswipe.css',
    'ssr-window',
    'ssr-window/ssr-window.esm.js',
    'dom7',
    '@uidotdev/usehooks',
    '@remix-run/react',
    '@remix-run/node',
    'remix-i18next',
    'remix-i18next/server',
    'remix-i18next/react',
    'i18next-fs-backend',
    'react-gtm-module',
    /^swiper/, // <-- this will bundle all swiper packages
  ], // to fix Error [ERR_REQUIRE_ESM]: require() of ES Module

  // Routes
  routes: (defineRoutes) => {
    // If you need to do async work, do it before calling `defineRoutes`, we use
    // the call stack of `route` inside to set nesting.

    return defineRoutes((route) => {
      // route('/', 'routes/_index.tsx', { id: 'it-home' })
      // route('/en', 'routes/_index.tsx', { id: 'en-home' })
      route('/en/logout', 'routes/logout.tsx', { id: 'en-logout' })

      routes.forEach((r) => {
        route(r.path, r.component, {
          id: `it-${r.path}`,
        })
      })
      routes.forEach((r) => {
        route(r.originalPath, r.component, {
          id: `en-${r.originalPath}`,
        })
      })
    })
  },
}
