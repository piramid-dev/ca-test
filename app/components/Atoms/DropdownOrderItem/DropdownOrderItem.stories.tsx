import type { Meta, StoryObj } from '@storybook/react'

import DropdownOrderItem from './DropdownOrderItem'

const meta = {
  title: 'Atoms/DropdownOrderItem',
  component: DropdownOrderItem,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <div className="w-fit">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownOrderItem>

export default meta
type Story = StoryObj<typeof meta>

export const LightLabelAscending: Story = {
  args: {
    label: 'Nome',
    direction: 'asc',
  },
}

export const LightLabelDescending: Story = {
  args: {
    label: 'Nome',
    direction: 'desc',
  },
}

export const LightLabelAlphabetical: Story = {
  args: {
    label: 'Nome',
    alphabetically: true,
    direction: 'asc',
  },
}

export const LightLabelReverseAlphabetical: Story = {
  args: {
    label: 'Nome',
    alphabetically: true,
    direction: 'desc',
  },
}
