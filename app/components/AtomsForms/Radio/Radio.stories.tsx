import type { Meta, StoryObj } from '@storybook/react'

import Radio from './Radio'

const meta = {
  title: 'Atoms Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    name: 'radio_check_0',
    defaultChecked: false,
    label: 'Radio',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const RadioChecked: Story = {
  args: {
    label: 'Radio',
    name: 'radio_check',
    defaultChecked: true,
  },
}

export const RadioUnchecked: Story = {
  args: {
    label: 'Radio',
    name: 'radio_uncheck',
    defaultChecked: false,
  },
}
