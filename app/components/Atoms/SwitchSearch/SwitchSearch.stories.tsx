import type { Meta, StoryObj } from '@storybook/react'

import SwitchSearch from './SwitchSearch'

const meta = {
  title: 'Atoms/SwitchSearch',
  component: SwitchSearch,
  tags: ['autodocs'],
  args: {
    rightLabel: 'Film',
    leftLabel: 'Registi',
  },
} satisfies Meta<typeof SwitchSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
