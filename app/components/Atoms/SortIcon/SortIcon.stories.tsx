import type { Meta, StoryObj } from '@storybook/react'

import SortIcon from './SortIcon'

const meta = {
  title: 'Atoms/SortIcon',
  component: SortIcon,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SortIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
