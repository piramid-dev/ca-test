import type { Meta, StoryObj } from '@storybook/react'

import StandardPage from './StandardPage'

const meta = {
  title: 'Sections/StandardPage',
  component: StandardPage,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof StandardPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
