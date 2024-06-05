import { datoQuerySubscription, loadFragments } from '~/lib/datocms'
// import { FavoritesFragmentQuery } from '~/lib/generated'
import { getUserId } from '~/session.server'

export const retrieveUser = async (request: any, userId?: string) => {
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)

  const _userId = userId || (await getUserId(request)) || search.get('userId')

  // const fragments = loadFragments([FavoritesFragmentQuery])
  const fragments = loadFragments([])

  const userQuery = `#graphql
  query ($idCommercelayer: String) {
    user(filter: {idCommercelayer: {eq: $idCommercelayer}}) {
      freePass
      name
      surname
      id
      idCommercelayer
      email
      favoriteProducts {
        ...favorites
      }
    }
  }
  ${fragments}
  `

  const datoQuerySub = await datoQuerySubscription({
    request,
    query: userQuery,
    variables: { idCommercelayer: _userId },
  })

  const { user } = datoQuerySub.datoQuerySubscription.initialData

  return user
}
