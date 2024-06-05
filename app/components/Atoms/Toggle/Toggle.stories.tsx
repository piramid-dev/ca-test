import type { Meta, StoryObj } from '@storybook/react'

import Toggle from './Toggle'

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    enabled: false,
    label: 'Attributo',
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const ToggleEnabled: Story = {}

export const ToggleDisabled: Story = {
  args: {
    enabled: false,
  },
}
