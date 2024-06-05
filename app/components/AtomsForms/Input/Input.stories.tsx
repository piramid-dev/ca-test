import type { Meta, StoryObj } from '@storybook/react'

import Input from './Input'

const meta = {
  title: 'Atoms Form/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    name: 'input',
    type: 'text',
    placeholder: 'Placeholder',
    label: 'Input',
    formId: 'formid',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputWithAllProps: Story = {
  args: {
    helpText: 'Help text',
  },
}

export const InputWithoutHelpText: Story = {}

export const InputDisabledWithAllProps: Story = {
  args: {
    disabled: true,
    helpText: 'Help text',
  },
}

export const InputDisabledWithoutHelpText: Story = {
  args: {
    disabled: true,
  },
}

export const InputWithError: Story = {
  args: {
    error: {
      message: 'Error message',
      type: 'error',
    },
  },
}
