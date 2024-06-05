import type { Meta, StoryObj } from '@storybook/react'

import ShareButtons from './ShareButtons'
const meta = {
  title: 'Organisms/ShareButtons',
  component: ShareButtons,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ShareButtons>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
