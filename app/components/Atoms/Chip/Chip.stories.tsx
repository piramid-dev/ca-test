import type { Meta, StoryObj } from '@storybook/react'
import Chip from './Chip'

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    label: 'Esplora',
    disabled: false,
    categoryColor: '#A4B2EA',
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'dark', value: '#eee' },
        { name: 'light', value: '#fff' },
      ],
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: {
    backgrounds: { default: 'dark', value: '#f7f7f7' },
  },
}
