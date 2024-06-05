import type { Meta, StoryObj } from '@storybook/react'

import Logo from './Logo'

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: {
    to: '/',
    size: 'full',
    color: 'coloured',
    name: 'site',
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {}

export const Compressed: Story = {
  args: {
    color: 'black',
    size: 'compressed',
  },
}
export const FoodOnFilmLogo: Story = {
  args: {
    size: 'full',
    color: 'coloured',
    name: 'food_on_film',
  },
}
