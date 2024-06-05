import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
}

interface GeneratePreviewUrlParams {
  item: {
    attributes: {
      slug: { en: string; it: string }
    }
  }
  itemType: {
    attributes: {
      api_key: string
    }
  }
  locale: string
  environmentId: string
  currentUser: any
}

// Generate preview url for a given item
const generatePreviewUrl = ({
  item,
  itemType,
  locale,
}: GeneratePreviewUrlParams) => {
  switch (itemType.attributes.api_key) {
    case 'article':
      const articlePath: string =
        locale === 'en' ? '/skialper/articles' : `/${locale}/skialper/articoli`
      return `${articlePath}/${
        item.attributes.slug[locale as keyof typeof item.attributes.slug] // Slug is localized
      }`
    case 'brand':
      const brandPath: string =
        locale === 'en' ? '/skialper/brands' : `/${locale}/skialper/marchi`
      return `${brandPath}/${item.attributes.slug}` // Slug is not localized
    default:
      return null
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // This will allow OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers })
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const rawBody = await request.text()
  const body = JSON.parse(rawBody)
  // console.log('++++body', body)

  const url = generatePreviewUrl(body)

  if (!url) {
    return json({ previewLinks: [] })
  }
  const baseUrl = process.env.PREVIEW_MODE_URL
    ? process.env.PREVIEW_MODE_URL
    : process.env.URL

  const previewLinks = [
    {
      label: 'Published version',
      url: `${baseUrl}/preview/stop?redirect=${url}`,
    },
    {
      label: 'Draft version',
      url: `${baseUrl}/preview/start?redirect=${url}&secret=${process.env.PREVIEW_MODE_SECRET}`,
    },
  ]

  return json(
    { previewLinks },
    {
      status: 200,
      headers,
    },
  )
}
