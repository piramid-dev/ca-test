import type { Meta, StoryObj } from '@storybook/react'

import Card from './Card'

const meta = {
  title: 'Organisms/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    eyelet: 'Nome Cognome',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipi elit, sed diam nonummy nibh euismod',
    image: {
      src: 'https://picsum.photos/seed/picsum/800/800',
      srcSet: 'https://picsum.photos/seed/picsum/800/800',
      webpSrcSet: 'https://picsum.photos/seed/picsum/800/800',
      sizes: '800px',
      alt: 'alt',
      width: 800,
      height: 800,
      aspectRatio: 1,
    },
    to: '/',
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const MovieShelf: Story = {
  args: {
    category: 'Aree geografiche',
    categoryColor: '#ED704F',
    type: 'shelf',
    title: 'Acqua corrente',
  },
}

export const MovieSearch: Story = {
  args: {
    ...MovieShelf.args,
    type: 'search',
  },
}

export const MovieFood: Story = {
  args: {
    ...MovieShelf.args,
    isFoodOnFilm: true,
  },
}

export const DirectorShelf: Story = {
  args: {
    eyelet: 'Paese di origine',
    type: 'shelf',
    firstName: 'nome',
    lastName: 'Cognome',
  },
}

export const DirectorSearch: Story = {
  args: {
    ...DirectorShelf.args,
    type: 'search',
  },
}
