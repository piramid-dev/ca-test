import type { Meta, StoryObj } from '@storybook/react'

import SuperCard from './SuperCard'

const meta = {
  title: 'Organisms/SuperCard',
  component: SuperCard,
  tags: ['autodocs'],
  args: {
    title: 'Area geografica',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipi elit, sed diam nonummy nibh euismod',
    image: 'https://picsum.photos/seed/picsum/800/800',
  },
} satisfies Meta<typeof SuperCard>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    category: 'Sostenibilità',
    categoryColor: '#BBD25F',
    title: 'Lorem ipsum food waste lipsum',
    content:
      'Mattis eget sed faucibus magna vulputate pellentesque a diam tincidunt.Velit purus egestas tellus phasellus.',
    button: {
      to: '/',
      label: 'Scopri di più',
    },
  },
}
