import type { Meta, StoryObj } from '@storybook/react'

import StandardPage from '../Sections/StandardPage'
import HeroDirector from '../Organisms/HeroDirector'
import Carousel from '../Organisms/Carousel'
import ExploreCategories from '../Sections/ExploreCategories'

//👇 We're importing the necessary stories from ListItem
import { Primary } from '../Organisms/HeroDirector/HeroDirector.stories'
import { Director as CarouselMeta } from '../Organisms/Carousel/Carousel.stories'
import { Primary as ExploreCategoriesMeta } from '../Sections/ExploreCategories/ExploreCategories.stories'

const meta: Meta<typeof StandardPage> = {
  title: 'Pages/SingleDirector',
  component: StandardPage,
}

export default meta
type Story = StoryObj<typeof StandardPage>

export const Default: Story = {
  render: (args) => (
    // @ts-ignore
    <StandardPage {...args}>
      {/* @ts-ignore */}
      <HeroDirector {...Primary.args} />
      {/* @ts-ignore */}
      <Carousel {...CarouselMeta.args} overlap />
      {/* @ts-ignore */}
      <ExploreCategories {...ExploreCategoriesMeta.args} overlap />
    </StandardPage>
  ),
}
