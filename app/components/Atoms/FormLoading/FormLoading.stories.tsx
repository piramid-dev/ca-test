import type { Meta, StoryObj } from '@storybook/react'

import FormLoading from './FormLoading'

const meta = {
  title: 'Atoms/FormLoading',
  component: FormLoading,
  tags: ['autodocs'],
  args: {
    title: 'Loading',
    description: 'Please wait...',
  },
} satisfies Meta<typeof FormLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
