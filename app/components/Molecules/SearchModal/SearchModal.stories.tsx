import type { Meta, StoryObj } from '@storybook/react'

import SearchModal from './SearchModal'

const meta = {
  title: 'Organisms/SearchModal',
  component: SearchModal,
  tags: ['autodocs'],
  args: {
    onClose: () => {
      console.log('onclose')
    },
  },
} satisfies Meta<typeof SearchModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
