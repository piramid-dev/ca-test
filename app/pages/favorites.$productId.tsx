import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import datoCmsClient from '~/lib/datocms.server'
import { retrieveUser } from '~/graphql/common-queries.graphql'
import { getLocale } from '~/utils'
import { getSession, commitSession } from '~/sessions'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { productId } = params
  const client = datoCmsClient()
  const user = await retrieveUser(request)
  const session = await getSession(request.headers.get('Cookie'))
  // Get referer from session
  const referer = session.get('referer')

  // Get current page url from request
  const currentUrl = new URL(request.url)
  const locale = getLocale(request)
  const joinPage =
    locale === 'it' ? '/it/skialper/registrati' : '/skialper/join'

  // Set context to favorites
  session.set('context', 'favorites')

  let urlRedirect = ''
  if (referer) {
    urlRedirect = referer
  } else {
    urlRedirect = request.headers.get('Referer') || '/'
    // Set referer in session
    session.set('referer', urlRedirect)
  }

  // If user is not logged in, or product id is not present, redirect to login page
  if (!user || !productId) {
    return redirect(joinPage + '?returnUrl=' + currentUrl, {
      headers: { 'Set-Cookie': await commitSession(session) },
    })
  }

  const userId = user?.id
  const userFavorites: Array<{ id: string }> = user?.favoriteProducts
  let newFavorites: Array<{ id: string }> = []

  // if user has already liked the product, remove it from the list
  if (userFavorites?.find((fav) => fav?.id === productId)) {
    newFavorites = userFavorites.filter(
      (fav: { id: string }) => fav.id !== productId,
    )
  } else {
    newFavorites = [...userFavorites, { id: productId }]
  }

  // favorite_products accept an array of strings
  const newFavoritesIds = newFavorites.map((fav) => fav.id)

  await client.items.update(userId, {
    favorite_products: newFavoritesIds,
  })

  // Empty session referer in session
  session.set('referer', '')

  // redirect to refer page
  return redirect(urlRedirect, {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}
