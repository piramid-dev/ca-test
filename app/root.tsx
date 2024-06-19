import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  useLoaderData,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Form,
} from '@remix-run/react'
import { json } from '@remix-run/node'
import { useChangeLanguage } from 'remix-i18next/react'
import { useTranslation } from 'react-i18next'
import { useScroll, useVelocity } from 'framer-motion'
import { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
// import {
//   // logout,
//   getUserId,
// } from '~/session.server'
// import SiteNav from '~/components/Organisms/SiteNav/SiteNav'
// Types
import type { IFilterData } from '~/types/filter.interface'
// Utils
import { getLocale } from '~/utils'
import { getMovieFilters } from '~/utils/movies'
import { getDirectorFilters } from '~/utils/directors'
// import { useLocalizeLink } from '~/hooks/useLocalizeLink'
// import { getUserCL, hasUserValidPassCL } from '~/utils/users'
import { getSession } from '~/sessions'
import { useIsBot } from './providers/isBot'

// Components
import SiteFooter from './components/Organisms/SiteFooter'
import GlobalLoading from './components/Molecules/GlobalLoading'
import Button from './components/Atoms/Button'
import Header from './components/Sections/Header'
// Style
import stylesheet from '~/tailwind.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = getLocale(request)
  const url = new URL(request.url)
  const baseUrl = url.origin

  console.log('locale ----->', locale)
  console.log('baseUrl ----->', baseUrl)

  // const url = new URL(request.url)
  // const search = new URLSearchParams(url.search)
  // const userId = (await getUserId(request)) || search.get('userId')
  // const userEmail = (await getUserEmail(request)) || search.get('userEmail')
  // const userAccessToken =
  //   (await getUserAccessToken(request)) || search.get('accessToken')

  // if (userId && userAccessToken) {
  //   try {
  //     user = await getUserCL(userAccessToken, userId)
  //     validPass = await hasUserValidPassCL(userAccessToken, userId, skuCode)
  //   } catch (error) {
  //     console.log('Error: ', error)
  //     // If the user is not found the token is not valid, clean the session
  //     return logout(request)
  //   }
  // }

  // Get filters form the /api/get-movie-filters
  // const movieFilters: IFilterData[] = await getMovieFilters({ baseUrl, locale })
  // const directorFilters: IFilterData[] = await getDirectorFilters({
  //   baseUrl,
  //   locale,
  // })

  // const testApi = await fetch(`${baseUrl}/api/test`).then((res) => res.json())

  // console.log('testApi ----->', testApi)

  // console.log('---- movieFilters', movieFilters)

  // const datoQuerySub = await datoQuerySubscription({
  //   request,
  //   query: scopesQuery,
  //   variables: { locale, email: userEmail },
  // })

  const session = await getSession(request.headers.get('Cookie'))

  return json({
    movieFilters: [],
    directorFilters: [],
    locale,
    // @ts-ignore
    previewEnabled: session.has('preview'),
  })
}

export default function App() {
  // Get the locale from the loader
  const { locale, previewEnabled } = useLoaderData<typeof loader>()

  // let loaderData = useRouteLoaderData<typeof loader>('routes/($lang)')
  // let locale = loaderData?.locale ?? 'en'

  // console.log(loaderData, loaderData)

  // const { l } = useLocalizeLink()
  const { i18n } = useTranslation()
  const isBot = useIsBot()

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale)

  const threshold = 20 // only slide it back when scrolling back at velocity above this positive (or zero) value
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const [isScrollingBack, setIsScrollingBack] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true) // true if the page is not scrolled or fully scrolled back
  const [isInView, setIsInView] = useState(true)
  // TODO: detect if is home page
  // Detect if is home page
  const isHome = false

  const siteFooterProps = {
    isLoggedInd: false,
    projectCol: {
      to: '/',
      img: 'https://picsum.photos/300/70',
      alt: 'Città di Torino - logo',
    },
    supportCol: [
      {
        to: '/',
        img: 'https://picsum.photos/200/100',
        alt: 'Città di Torino - logo',
      },
      {
        img: 'https://picsum.photos/120/86',
        alt: 'Città di Torino - logo',
      },
      {
        to: '/',
        img: 'https://picsum.photos/300/300',
      },
    ],
    navigation: {
      first: [
        { to: '/film', label: 'Archivio Film' },
        { to: '/registi', label: 'Archivio Registi' },
        { to: '/food-on-film', label: 'Food on Film' },
      ],
      second: [
        { to: '/about', label: 'About' },
        { to: '/contatti', label: 'Contatti' },
        { to: '/credits', label: 'Credits' },
      ],
      third: [
        { to: '/faq', label: 'FAQ' },
        { to: '/cookie', label: 'Cookie' },
        { to: '/privacy', label: 'Privacy' },
      ],
    },
  }

  useEffect(
    () =>
      scrollVelocity.on('change', (latest) => {
        if (latest > 0) {
          setIsScrollingBack(false)
          return
        }
        if (latest < -threshold) {
          setIsScrollingBack(true)
          return
        }
      }),
    [scrollVelocity],
  )

  useEffect(
    () => scrollY.on('change', (latest) => setIsAtTop(latest <= 100)),
    [scrollY],
  )

  useEffect(
    () => setIsInView(isScrollingBack || isAtTop),
    [isScrollingBack, isAtTop],
  )

  // useEffect(() => {
  //   // @ts-ignore
  //   if (typeof lb_cs !== 'undefined') {
  //     // @ts-ignore
  //     lb_cs('6512b2863c3fe60019825432')
  //   }
  // }, [])

  // useEffect(() => {
  //   const tagManagerArgs = {
  //     gtmId: 'GTM-NDNN7NXF',
  //   }
  //   TagManager.initialize(tagManagerArgs)
  // }, [])

  return (
    <html lang={locale} dir={i18n.dir()} className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/assets/site.webmanifest"></link>
        <script
          type="text/javascript"
          src="https://app.legalblink.it/api/scripts/lb_cs.js"
        ></script>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div id="main-wrapper">
          {previewEnabled ? (
            <Form
              method="get"
              action="/preview/stop"
              className="fixed bottom-10 left-10 z-100"
            >
              <Button type="submit">Exit preview mode</Button>
            </Form>
          ) : null}
          {/* <SiteNav
            navIsVisible
            navIsOpen={isInView ? !isAtTop : false}
            user={user}
            validPass={validPass || freePass}
            locale={locale}
          /> */}
          <Header isHome={isHome} />
          {isBot ? null : <GlobalLoading />}
          <Outlet
            context={{
              navIsOpen: isInView && !isAtTop,
              locale,
            }}
          />
          <SiteFooter {...siteFooterProps} />
          <ScrollRestoration />
          {isBot ? null : <Scripts />}
        </div>
      </body>
    </html>
  )
}
