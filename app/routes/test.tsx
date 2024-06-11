import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const baseUrl = url.origin

  const testApi = await fetch(`${baseUrl}/api/test`).then((res) => res.json())

  return { testApi }
}

const Test = () => {
  const data = useLoaderData<typeof loader>()
  const testApi = data.testApi

  return (
    <div>
      <h1 className="py-16">Hello - {testApi.hello}</h1>
    </div>
  )
}

export default Test
