import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { getSession, commitSession } from '~/sessions'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  session.set('preview', 'yes')

  // Get params 'redirect' and 'secret' from request
  const url = new URL(request.url)
  const redirectUrl = url.searchParams.get('redirect') || '/'
  const secret = url.searchParams.get('secret')

  if (secret !== process.env.PREVIEW_MODE_SECRET) {
    return redirect('/')
  }

  return redirect(redirectUrl, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
