import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from './Checkbox'

const meta = {
  title: 'Atoms Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxWithLabel: Story = {
  args: {
    label: 'Checkbox',
    name: 'checkbox',
  },
}

export const CheckboxWithoutLabel: Story = {
  args: {
    name: 'checkbox',
  },
}

export const CheckboxChecked: Story = {
  args: {
    label: 'Checkbox',
    name: 'checkbox',
    defaultChecked: true,
  },
}

export const ColoredCheckbox: Story = {
  args: {
    label: 'Checkbox',
    name: 'checkbox',
    color: '#F97316',
  },
}
