import type { Meta, StoryObj } from '@storybook/react'

import VideoLightbox from './VideoLightbox'
const meta = {
  title: 'Organisms/VideoLightbox',
  component: VideoLightbox,
  tags: ['autodocs'],
  args: {
    videoUrl: 'https://www.youtube.com/watch?v=gnIfjpFz1WU',
    videoCover: 'https://picsum.photos/seed/picsum/1200/800',
  },
} satisfies Meta<typeof VideoLightbox>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
