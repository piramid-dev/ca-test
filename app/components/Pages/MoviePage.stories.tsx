import type { Meta, StoryObj } from '@storybook/react'

import StandardPage from '../Sections/StandardPage'
import HeroMovie from '../Organisms/HeroMovie'
import MovieIntro from '../Sections/MovieIntro'
import DirectorQuote from '../Sections/DirectorQuote'
import TitleTextBlock from '../Organisms/TitleTextBlock'
import ContentImageBlock from '../Organisms/ContentImageBlock'
import Gallery from '../Organisms/Gallery'
import DownloadMedia from '../Sections/DownloadMedia'
import Carousel from '../Organisms/Carousel'
import ExploreCategories from '../Sections/ExploreCategories'

//👇 We're importing the necessary stories from ListItem
import { Primary } from '../Organisms/HeroMovie/HeroMovie.stories'
import { Primary as MovieIntroMeta } from '../Sections/MovieIntro/MovieIntro.stories'
import { Primary as DirectorQuoteMeta } from '../Sections/DirectorQuote/DirectorQuote.stories'
import { Primary as ApprofondimentoMeta } from '../Organisms/TitleTextBlock/TitleTextBlock.stories'
import { Primary as TematicaMeta } from '../Organisms/ContentImageBlock/ContentImageBlock.stories'
import { Primary as GalleryMeta } from '../Organisms/Gallery/Gallery.stories'
import { Primary as DowloadMediaMeta } from '../Sections/DownloadMedia/DownloadMedia.stories'
import { Primary as CarouselMeta } from '../Organisms/Carousel/Carousel.stories'
import { Primary as ExploreCategoriesMeta } from '../Sections/ExploreCategories/ExploreCategories.stories'

const meta: Meta<typeof StandardPage> = {
  title: 'Pages/SingleMovie',
  component: StandardPage,
}

export default meta
type Story = StoryObj<typeof StandardPage>

export const Default: Story = {
  render: (args) => (
    <StandardPage {...args}>
      {/* @ts-ignore */}
      <HeroMovie {...Primary.args} />
      {/* @ts-ignore */}
      <MovieIntro {...MovieIntroMeta.args} />
      {/* @ts-ignore */}
      <DirectorQuote {...DirectorQuoteMeta.args} />
      {/* @ts-ignore */}
      <TitleTextBlock {...ApprofondimentoMeta.args} overlap />
      {/* @ts-ignore */}
      <ContentImageBlock {...TematicaMeta.args} overlap />
      {/* @ts-ignore */}
      <Gallery {...GalleryMeta.args} overlap />
      {/* @ts-ignore */}
      <DownloadMedia {...DowloadMediaMeta.args} />
      {/* @ts-ignore */}
      <Carousel {...CarouselMeta.args} overlap />
      {/* @ts-ignore */}
      <ExploreCategories {...ExploreCategoriesMeta.args} overlap />
    </StandardPage>
  ),
}
