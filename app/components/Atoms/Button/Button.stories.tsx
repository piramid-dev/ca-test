import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: 'Button',
  },
  argTypes: {
    icon: {
      control: 'select',
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'dark', value: '#afafaf' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {}
export const DefaultIcon: Story = {
  args: {
    ...Default.args,
    icon: 'ArrowRight',
  },
}

export const Primary: Story = {
  args: {
    ...DefaultIcon.args,
    color: 'primary',
  },
}

export const Flat: Story = {
  args: {
    variant: 'flat',
    icon: 'ArrowRight',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Dot: Story = {
  args: {
    variant: 'dot',
    color: '#CDD9F9',
    size: 'normal',
    icon: 'ArrowRight',
  },
}
