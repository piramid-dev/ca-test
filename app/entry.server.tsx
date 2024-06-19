import { PassThrough } from 'stream'

import type { EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { createReadableStreamFromReadable } from '@remix-run/node'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-fs-backend'

import { resources } from '../public/locales/resources.js'

import i18next from './i18next.server'
import i18n from './i18n' // your i18n configuration file
import { getLocale } from './utils'
import { IsBotProvider } from './providers/isBot'

const ABORT_DELAY = 5000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  if (isAuthorized(request)) {
    const callbackName = isbot(request.headers.get('user-agent'))
      ? 'onAllReady'
      : 'onShellReady'

    const instance = createInstance()
    const ns = i18next.getRouteNamespaces(remixContext)
    // let lng = await i18next.getLocale(request)
    // Check if url contains /it/ or /en/ and set lng accordingly
    const lng = getLocale(request)

    await instance
      .use(initReactI18next) // Tell our instance to use react-i18next
      .use(Backend) // Setup our backend
      .init({
        ...i18n, // spread the configuration
        lng, // The locale we detected above
        ns, // The namespaces the routes about to render wants to use
        resources,
      })

    return new Promise((resolve, reject) => {
      let didError = false

      const { pipe, abort } = renderToPipeableStream(
        <I18nextProvider i18n={instance}>
          <IsBotProvider isBot={isbot(request.headers.get('User-Agent') ?? '')}>
            <RemixServer context={remixContext} url={request.url} />
          </IsBotProvider>
        </I18nextProvider>,
        {
          [callbackName]: () => {
            const body = new PassThrough()

            responseHeaders.set('Content-Type', 'text/html')
            responseHeaders.set(
              'Content-Security-Policy',
              "frame-ancestors 'self' https://*.datocms.com",
            )

            resolve(
              new Response(createReadableStreamFromReadable(body), {
                headers: responseHeaders,
                status: didError ? 500 : responseStatusCode,
              }),
            )

            pipe(body)
          },
          onShellError(error: unknown) {
            reject(error)
          },
          onError(error: unknown) {
            didError = true
            console.error(error)
          },
        },
      )

      setTimeout(abort, ABORT_DELAY)
    })
  } else {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic',
      },
    })
  }
}

const isAuthorized = (request: Request) => {
  // Return true if development mode
  if (process.env.NODE_ENV === 'development') return true

  // If basic auth is not enabled, return true
  const BASIC_AUTH = process.env.BASIC_AUTH

  if (!BASIC_AUTH || BASIC_AUTH !== 'true') return true

  const header = request.headers.get('Authorization')

  if (!header) return false

  const base64 = header.replace('Basic ', '')
  const [username, password] = Buffer.from(base64, 'base64')
    .toString()
    .split(':')

  return username === process.env.USERNAME && password === process.env.PASSWORD
}
