import type { Meta, StoryObj } from '@storybook/react'

import ButtonIcon from './ButtonIcon'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atoms/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
    },
  },
} satisfies Meta<typeof ButtonIcon>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Fill: Story = {
  args: {
    variant: 'fill',
    icon: 'HamburgerIcon',
  },
}

export const FillDisabled: Story = {
  args: {
    variant: 'fill',
    icon: 'HamburgerIcon',
    disabled: true,
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    icon: 'ArrowRight',
  },
}

export const OutlineDisabled: Story = {
  args: {
    variant: 'outline',
    icon: 'ArrowRight',
    disabled: true,
  },
}

export const Flat: Story = {
  args: {
    icon: 'HamburgerIcon',
    variant: 'flat',
  },
}
export const FlatDisabled: Story = {
  args: {
    icon: 'HamburgerIcon',
    variant: 'flat',
    disabled: true,
  },
}
