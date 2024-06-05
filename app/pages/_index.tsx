// import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
import { useTranslation } from 'react-i18next'

// import { useLoaderData } from '@remix-run/react'
import Button from '~/components/Atoms/Button'
import { useLocalizeLink } from '~/hooks/useLocalizeLink'
// import { useContext } from '~/hooks/useContext'
// import HomeHero from '~/components/Sections/HomeHero'
// import FeaturedPostsCarousel from '~/components/Organisms/FeaturedPostsCarousel/FeaturedPostsCarousel'
// import LaunchBannerCarousel from '~/components/Organisms/LaunchBannerCarousel/LaunchBannerCarousel'
// import Masonry from '~/components/Organisms/Masonry/Masonry'
// import ShelfStyleCarousel from '~/components/Organisms/ShelfStyleCarousel/ShelfStyleCarousel'
// import SectionFullSuperButtons from '~/components/Organisms/SectionFullSuperButtons/SectionFullSuperButtons'
// import SectionFullWidth from '~/components/Organisms/SectionFullWidth/SectionFullWidth'
// import ShelfProductCarousel from '~/components/Organisms/ShelfProductCarousel/ShelfProductCarousel'
// import ShelfBrandCarousel from '~/components/Organisms/ShelfBrandCarousel/ShelfBrandCarousel'
// import ShelfNewsCarousel from '~/components/Organisms/ShelfNewsCarousel/ShelfNewsCarousel'
// import SectionTwoCols from '~/components/Organisms/SectionTwoCols/SectionTwoCols'
// import ShelfTeamCarousel from '~/components/Organisms/ShelfTeamCarousel/ShelfTeamCarousel'
// import { datoQuerySubscription, loadFragments } from '~/lib/datocms'
// import { useArticleCardProps } from '~/hooks/useArticleCardProps'
// import { useCardProps } from '~/hooks/useCardProps'
// import { useContext } from '~/hooks/useContext'
// import { getUserId } from '~/session.server'
// import type { PersonRecord, LauncherRecord } from '~/lib/generated'
// import { ResponsiveImageFragmentQuery } from '~/lib/generated'
// import i18next from '~/i18next.server'
// import { getLocale } from '~/utils'
// import { Link } from '@remix-run/react'

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   const home = (data?.homeData.initialData as any).home
//   const title = home.metadata?.title ? home.metadata?.title : home.heroHeading
//   //title += ` - The Skialper Buyer's Guide`

//   return [
//     { title: title },
//     {
//       name: 'description',
//       content: home.metadata?.description,
//     },
//     {
//       name: 'og:title',
//       content: title, //home.metadata?.title,
//     },
//     {
//       name: 'og:description',
//       content: home.metadata?.description,
//     },
//     {
//       name: 'og:image',
//       content: home.metadata?.image?.responsiveImage.src,
//     },
//   ]
// }

export default function Index() {
  const { t } = useTranslation()
  const { l } = useLocalizeLink()
  // const { isUser, validPass } = useContext()

  const { i18n } = useTranslation()
  const locale = i18n.language

  // const { homeData } = useLoaderData<any>()
  // const home = homeData.initialData.home

  return (
    <div>
      <h1 className="h3">home - {locale}</h1>
      <Button to={l('/movies')} icon="ArrowRight">
        {t('movies')}
      </Button>{' '}
      <Button to={l('/directors')} icon="ArrowRight">
        {t('directors')}
      </Button>{' '}
    </div>
  )
}
