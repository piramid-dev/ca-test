import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuerySubscription } from 'react-datocms'

import StandardPage from '~/components/Sections/StandardPage/StandardPage'
import { datoQuerySubscription, loadFragments } from '~/lib/datocms'
import { ResponsiveImageFragmentQuery } from '~/lib/generated'
import { getLocale } from '~/utils'
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const credit = (data?.pageData.initialData as any).credit
  let title = credit.metadata?.title
    ? credit.metadata?.title
    : credit.heroHeading
  title += ` - The Skialper Buyer's Guide`

  return [
    { title: title },
    {
      name: 'description',
      content: credit.metadata?.description,
    },
    {
      name: 'og:title',
      content: credit.metadata?.title,
    },
    {
      name: 'og:description',
      content: credit.metadata?.description,
    },
    {
      name: 'og:image',
      content: credit.metadata?.image?.responsiveImage.src,
    },
  ]
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const slug = params.slug
  const locale = getLocale(request)
  const fragments = loadFragments([ResponsiveImageFragmentQuery])
  const initialQuery = `#graphql
    query page($locale: SiteLocale) {
      credit:credit(locale: $locale) {
        id
        metadata{
          title
          description
          image{
            responsiveImage(
              imgixParams: { fm: jpg }
            ) {
              ...responsiveImage
            }
          }
        }
        modules{
          ... on HeadingRecord{
            __typename
            text
            size
          }
          ... on ContentRecord{
            __typename
            text
          }
        }
      }
    }
    ${fragments}
  `

  const datoQuerySubArticle = await datoQuerySubscription({
    request,
    query: initialQuery,
    variables: { locale, slug }, // The number of items passed to the query
  })

  return {
    pageData: datoQuerySubArticle.datoQuerySubscription,
  }
}

export default function Index() {
  // const { t } = useTranslation()
  // const { l } = useLocalizeLink()
  // const { user } = useContext()
  const { pageData } = useLoaderData<any>()
  const { data: page } = useQuerySubscription(pageData)
  const modules = page.credit.modules
  console.log(modules)

  return <StandardPage>Credits Page</StandardPage>
}
