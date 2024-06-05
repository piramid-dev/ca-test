import type { Meta, StoryObj } from '@storybook/react'

import LinkBasic from './LinkBasic'

const meta = {
  title: 'Atoms/LinkBasic',
  component: LinkBasic,
  tags: ['autodocs'],
  args: {
    to: '/',
    label: 'Esplora',
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'dark', value: '#000' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
} satisfies Meta<typeof LinkBasic>

export default meta
type Story = StoryObj<typeof meta>

export const LinkDefault: Story = {
  args: {
    icon: true,
  },
}
export const MenuItem: Story = {
  args: {
    size: 'big',
  },
}
export const AuthorLink: Story = {
  args: {
    size: 'medium',
  },
}
export const White: Story = {
  args: {
    color: 'white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
