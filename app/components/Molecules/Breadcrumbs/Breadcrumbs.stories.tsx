import type { Meta, StoryObj } from '@storybook/react'

import Breadcrumbs from './Breadcrumbs'

const meta = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    pages: [
      {
        name: 'Livello 01',
        href: '/livello-01',
      },
      {
        name: 'Livello 02',
        href: '/livello-02',
      },
      {
        name: 'Livello 03',
        href: '/livello-03',
      },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
