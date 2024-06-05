import type { Meta, StoryObj } from '@storybook/react'

import BlockNoResults from './BlockNoResults'

const meta = {
  title: 'Organisms/BlockNoResults',
  component: BlockNoResults,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof BlockNoResults>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
