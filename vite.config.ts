import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import routes from './app/pages/_routes.cjs'

installGlobals()

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      // ignoredRouteFiles: ['**/*.css'],
      ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}'],
      // serverModuleFormat: 'cjs',
      // serverDependenciesToBundle: 'all',
      // serverDependenciesToBundle: [
      //   '@phosphor-icons/react',
      //   'datocms-structured-text-generic-html-renderer',
      //   'datocms-structured-text-utils',
      //   'dequal',
      //   'react-datocms',
      //   'react-intersection-observer',
      //   'use-deep-compare-effect',
      //   'react-photoswipe-gallery',
      //   'photoswipe',
      //   'photoswipe/dist/photoswipe.css',
      //   'ssr-window',
      //   'ssr-window/ssr-window.esm.js',
      //   'dom7',
      //   '@uidotdev/usehooks',
      //   '@remix-run/react',
      //   '@remix-run/node',
      //   /^remix-i18next/, // <-- this will bundle all remix-i18next packages
      //   'i18next-fs-backend',
      //   'react-gtm-module',
      //   /^swiper/, // <-- this will bundle all swiper packages
      // ], // to fix Error [ERR_REQUIRE_ESM]: require() of ES Module

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
    }),
    tsconfigPaths(),
  ],
})
