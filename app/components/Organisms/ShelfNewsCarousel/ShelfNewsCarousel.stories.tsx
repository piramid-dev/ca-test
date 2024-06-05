import type { Meta, StoryObj } from '@storybook/react'

import ShelfNewsCarousel from './ShelfNewsCarousel'

const meta = {
  title: 'Organisms/ShelfNewsCarousel',
  component: ShelfNewsCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Top stories su al Tonale',
    showAllLabel: 'Vedi tutti',
    showAllTo: '/',
    news: [
      {
        type: 'about',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
          { label: 'Cultura', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'culture',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'brand',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'blog',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'culture',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
    ],
  },
  decorators: [(Story) => <div className="">{Story()}</div>],
} satisfies Meta<typeof ShelfNewsCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const CarouselWithMoreThanThreeCards: Story = {}

export const DarkCarouselWithMoreThanThreeCards: Story = {
  args: {
    variant: 'dark',
  },
}

export const CarouselWithThreeCards: Story = {
  args: {
    news: [
      {
        type: 'about',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
          { label: 'Cultura', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'culture',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'brand',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
    ],
  },
}

export const CarouselWithALotOfCards: Story = {
  args: {
    news: [
      {
        type: 'about',
        title: 'Il test',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
          { label: 'Cultura', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'culture',
        title: 'Il test del mezzalama',
        description: 'eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'brand',
        title: 'Il test del mezzalama in notturna che va almeno su tre righe ',
        description: 'dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'blog',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'culture',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'about',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
          { label: 'Cultura', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'culture',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'brand',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'blog',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
      {
        type: 'culture',
        title: 'Il test del mezzalama',
        description:
          'Gravida sit ullamcorper eget dignissim Gravida sit ullamcorper eget dignissim',
        chips: [
          { label: 'Tour', variant: 'transparent', to: '' },
          { label: 'Light', variant: 'transparent', to: '' },
        ],
        color: 'red',
        imageUrl: '/assets/mock-news.png',
        image: {
          src: 'https://picsum.photos/seed/picsum/200/300',
          alt: 'alt',
          width: 200,
        },
      },
    ],
  },
}
