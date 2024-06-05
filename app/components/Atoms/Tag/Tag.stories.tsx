import type { Meta, StoryObj } from '@storybook/react'

import Tag from './Tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: {
    label: 'Categoria',
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const SingleTab: Story = {}
export const Tabs: Story = {
  render: (args) => (
    <div className="flex flex gap-x-2 max-w-64 w-full items-center">
      <Tag label="Montagna" />
      <Tag label="Natura" />
      <Tag label="Lorem ipsum" />
    </div>
  ),
}
