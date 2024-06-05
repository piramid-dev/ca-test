import type { Meta, StoryObj } from '@storybook/react'
// @ts-ignore
import allDirectors from '~/json/allDirectors.json'
import ArchiveDirectors from './ArchiveDirectors'

const meta = {
  title: 'Pages/ArchiveDirectors',
  component: ArchiveDirectors,
  tags: ['autodocs'],
  args: {
    // @ts-ignore
    directors: allDirectors.en,
    title: 'Archivio registi',
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
        subject: 'alphabetic',
        values: [
          { name: 'A', slug: 'a' },
          { name: 'B', slug: 'b' },
          { name: 'C', slug: 'c' },
          { name: 'D', slug: 'd' },
        ],
      },
    ],
  },
} satisfies Meta<typeof ArchiveDirectors>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
