import type { Meta, StoryObj } from '@storybook/react'
// @ts-ignore
import allMovies from '~/json/allMovies.json'
import ArchiveMovies from './ArchiveMovies'

const meta = {
  title: 'Pages/ArchiveMovies',
  component: ArchiveMovies,
  tags: ['autodocs'],
  args: {
    // @ts-ignore
    movies: allMovies.en,
    title: 'Archivio film',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    filters: [
      {
        subject: 'countries',
        values: [
          { name: 'Italy', slug: 'italy' },
          { name: 'USA', slug: 'usa' },
          { name: 'France', slug: 'france' },
          { name: 'Germany', slug: 'germany' },
        ],
      },
      {
        subject: 'languages',
        values: [
          { name: 'Italian', slug: 'italian' },
          { name: 'English', slug: 'english' },
          { name: 'French', slug: 'french' },
          { name: 'German', slug: 'german' },
        ],
      },
      {
        subject: 'genres',
        values: [
          { name: 'Action', slug: 'action' },
          { name: 'Adventure', slug: 'adventure' },
          { name: 'Comedy', slug: 'comedy' },
          { name: 'Drama', slug: 'drama' },
        ],
      },
    ],
  },
} satisfies Meta<typeof ArchiveMovies>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
