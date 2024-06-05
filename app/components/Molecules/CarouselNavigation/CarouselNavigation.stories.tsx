import type { Meta, StoryObj } from '@storybook/react'

import CarouselNavigation from './CarouselNavigation'

const meta = {
  title: 'Molecules/CarouselNavigation',
  component: CarouselNavigation,
  tags: ['autodocs'],
  args: {
    sliderRef: {},
  },
  decorators: [
    (Story) => (
      <div className="relative h-20 bg-black">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CarouselNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
