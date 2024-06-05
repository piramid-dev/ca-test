import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from './Dropdown'

const meta = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    label: 'Name',
    hasSubMenuPanel: false,
  },
  decorators: [
    (Story) => (
      <div className="h-48 flex">
        <span className="px-16"></span>
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const LightDropdown: Story = {
  args: {
    children: (
      <div className="w-fit rounded-xl bg-dove-300 p-4">
        <div>Item 1</div>
        <div>Item 2 with long name</div>
        <div>Item 3</div>
      </div>
    ),
  },
}

export const DarkDropdown: Story = {
  decorators: [
    (Story) => (
      <div className="h-48 bg-black p-5">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'dark',
    children: (
      <div className="w-fit rounded-xl bg-dove-300 p-4">
        <div>Item 1</div>
        <div className="whitespace-nowrap">Item 2 with long name</div>
        <div>Item 3</div>
      </div>
    ),
  },
}
