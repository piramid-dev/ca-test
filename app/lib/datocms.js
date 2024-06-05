import { print } from 'graphql'
import tiny from 'tiny-json-http'

import { getSession } from '../sessions'

export async function load({ query, variables, preview }) {
  let endpoint = 'https://graphql.datocms.com'

  const _query = typeof query === 'string' ? query : query.loc.source.body

  if (process.env.DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.DATOCMS_ENVIRONMENT}`
  }

  if (preview) {
    endpoint += `/preview`
  }

  const { body } = await tiny.post({
    url: endpoint,
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_READONLY_TOKEN}`,
    },
    data: {
      query: _query,
      variables,
    },
  })

  if (body.errors) {
    console.error('Ouch! The query has some errors!', body.errors)
    throw body.errors
  }

  return body.data
}

export function loadFragments(fragments) {
  return fragments.map(print).join('\n')
}

export async function datoQuerySubscription({ request, ...gqlRequest }) {
  const session = await getSession(request.headers.get('Cookie'))
  const previewEnabled = session.get('preview')

  return {
    datoQuerySubscription: previewEnabled
      ? {
          ...gqlRequest,
          preview: true,
          initialData: await load({ ...gqlRequest, preview: true }),
          token: process.env.DATOCMS_READONLY_TOKEN,
          environment: process.env.DATOCMS_ENVIRONMENT || null,
        }
      : {
          enabled: false,
          initialData: await load(gqlRequest),
        },
  }
}
