import type { Meta, StoryObj } from '@storybook/react'

import BoxedImage from './BoxedImage'
const meta = {
  title: 'Organisms/BoxedImage',
  component: BoxedImage,
  tags: ['autodocs'],
  args: {
    imageUrl: 'https://picsum.photos/1440/600',
  },
} satisfies Meta<typeof BoxedImage>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
