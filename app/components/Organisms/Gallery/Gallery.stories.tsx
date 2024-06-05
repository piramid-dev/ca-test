import type { Meta, StoryObj } from '@storybook/react'

import Gallery from './Gallery'

const meta = {
  title: 'Organisms/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Top stories su al Tonale',
    images: [
      {
        src: 'https://picsum.photos/seed/picsum/200/300',
        alt: 'alt',
        width: 200,
      },
    ],
  },
  decorators: [(Story) => <div className="">{Story()}</div>],
} satisfies Meta<typeof Gallery>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Gallery',
    backgroundColor: 'dove',
    images: [
      {
        src: 'https://picsum.photos/seed/picsum/1440/600',
        alt: 'alt',
        width: 1440,
      },
      {
        src: 'https://picsum.photos/seed/picsum/1440/600',
        alt: 'alt',
        width: 1440,
      },
    ],
  },
}
