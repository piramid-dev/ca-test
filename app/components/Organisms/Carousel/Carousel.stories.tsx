import type { Meta, StoryObj } from '@storybook/react'
import Card from '../Card'
import metaDefault, { MovieShelf, DirectorShelf } from '../Card/Card.stories'
import Carousel from './Carousel'
// Import meta from card stories

const num = 6
const items = Array.from({ length: num }, (_, i) => i)

const movieArgs = { ...metaDefault.args, ...MovieShelf.args }
const directorArgs = { ...metaDefault.args, ...DirectorShelf.args }

const meta = {
  title: 'Organisms/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Top stories su al Tonale',
    content:
      'Velit purus egestas tellus phasellus. Mattis eget sed faucibus magna vulputate pellentesque a diam tincidunt. Aenean malesuada tellus tellus faucibus mauris quisque mauris in.',
  },
  decorators: [(Story) => <div className="">{Story()}</div>],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Il futuro del mondo',
    content:
      'Velit purus egestas tellus phasellus. Mattis eget sed faucibus magna vulputate pellentesque a diam tincidunt. Aenean malesuada tellus tellus faucibus mauris quisque mauris in.',
    backgroundColor: '#A4B2EA',
    category: {
      label: 'Biodiversity',
      color: '#A4B2EA',
    },
    image: 'https://picsum.photos/seed/picsum/800/800',
    children: items.map((el, i) => <Card key={i} {...movieArgs} />),
    button: {
      label: 'Scopri di più',
      to: '/',
    },
  },
}

export const Director: Story = {
  args: {
    title: 'Scopri tutti i film di Nome Regista',
    content:
      'Velit purus egestas tellus phasellus. Mattis eget sed faucibus magna vulputate pellentesque a diam tincidunt. Aenean malesuada tellus tellus faucibus mauris quisque mauris in.',
    backgroundColor: 'black',
    eyelet: 'approfondimento',
    children: items.map((el, i) => <Card key={i} {...directorArgs} />),
  },
}
