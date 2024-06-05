import type { Meta, StoryObj } from '@storybook/react'

import ArchiveTitle from './ArchiveTitle'

const meta = {
  title: 'Organisms/ArchiveTitle',
  component: ArchiveTitle,
  tags: ['autodocs'],
  args: {
    title: 'Archivio registi',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
} satisfies Meta<typeof ArchiveTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Topic: Story = {
  args: {
    ...Primary.args,
    title: 'Biodiversità',
    color: '#A4B2EA',
    image: 'https://picsum.photos/seed/picsum/1440/1440',
  },
}
