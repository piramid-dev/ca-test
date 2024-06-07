import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import ssr from '@vitejs/plugin-ssr'
import { vercelPreset } from '@vercel/remix/vite'

import routes from './app/pages/_routes.cjs'

installGlobals()

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.css'],
      // ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}'],
      presets: [vercelPreset()],

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
    // ssr(),
  ],
  ssr: {
    noExternal: ['@phosphor-icons/react'],
  },
})
