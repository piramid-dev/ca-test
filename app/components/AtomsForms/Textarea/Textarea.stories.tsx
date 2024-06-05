import type { Meta, StoryObj } from '@storybook/react'

import Textarea from './Textarea'

const meta = {
  title: 'Atoms Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    name: 'textarea',
    placeholder: 'Placeholder',
    label: 'Textarea',
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const TextareaWithAllProps: Story = {
  args: {
    helpText: 'Help text',
  },
}

export const TextareaWithoutHelpText: Story = {}

export const TextareaDisabledWithAllProps: Story = {
  args: {
    disabled: true,
    helpText: 'Help text',
  },
}

export const TextareaDisabledWithoutHelpText: Story = {
  args: {
    disabled: true,
  },
}

export const TextareaWithError: Story = {
  args: {
    error: {
      message: 'Error message',
      type: 'error',
    },
  },
}
