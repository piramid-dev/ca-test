import type { Meta, StoryObj } from '@storybook/react'

import HeroMovie from './HeroMovie'

const meta = {
  title: 'Organisms/HeroMovie',
  component: HeroMovie,
  args: {
    title: 'Section title',
    image: {
      src: 'https://picsum.photos/seed/picsum/1440/600',
      alt: 'alt',
      width: 1440,
    },
  },
} satisfies Meta<typeof HeroMovie>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    title: 'Section title',
    image: {
      src: 'https://picsum.photos/seed/picsum/1440/600',
      alt: 'alt',
      width: 1440,
    },
    mainCategory: { label: 'Biodiversità', color: '#A4B2EA', url: '#' },
    tags: [
      { to: '/', label: 'Lorem ipsum' },
      { to: '/', label: 'Lorem ipsum' },
    ],
    movieLink: '#',
    trailerLink: '#',
    kit: '#',
  },
}
