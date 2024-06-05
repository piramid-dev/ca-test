import type { Meta, StoryObj } from '@storybook/react'

import SearchBar from './SearchBar'

const meta = {
  title: 'Organisms/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    name: 'input',
    type: 'text',
    placeholder: 'Placeholder',
    label: 'Input',
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
