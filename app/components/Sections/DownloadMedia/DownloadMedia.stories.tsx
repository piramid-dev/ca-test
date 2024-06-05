import type { Meta, StoryObj } from '@storybook/react'

import DownloadMedia from './DownloadMedia'
const meta = {
  title: 'Sections/DownloadMedia',
  component: DownloadMedia,
  tags: ['autodocs'],
  args: {
    title: 'Download e media',
    image: {
      src: 'https://picsum.photos/seed/picsum/800/1200',
      alt: 'alt',
      width: 1200,
    },
    items: [
      {
        title: 'Top stories su al Tonale',
        button: {
          link: '/',
          label: 'Download',
        },
      },
      {
        title: 'Top stories su al Tonale',
        button: {
          link: '/',
          label: 'Download',
        },
      },
      {
        title: 'Top stories su al Tonale',
        button: {
          link: '/',
          label: 'Download',
        },
      },
    ],
  },
} satisfies Meta<typeof DownloadMedia>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    title: 'Download e media',
    image: {
      src: 'https://picsum.photos/seed/picsum/800/1200',
      alt: 'alt',
      width: 1200,
    },
    items: [
      {
        title: 'Top stories su al Tonale',
        button: {
          link: '/',
          label: 'Download',
        },
      },
      {
        title: 'Top stories su al Tonale',
        button: {
          link: '/',
          label: 'Download',
        },
      },
      {
        title: 'Top stories su al Tonale',
        button: {
          link: '/',
          label: 'Download',
        },
      },
    ],
  },
}
