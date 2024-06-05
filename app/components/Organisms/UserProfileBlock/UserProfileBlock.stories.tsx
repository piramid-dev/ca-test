import type { Meta, StoryObj } from '@storybook/react'

import UserProfileBlock from './UserProfileBlock'
// const infosDemo = [
//   {
//     data: 'Atteggiamento',
//     value: 'Alpinista',
//   },
//   {
//     data: 'Arco di curva indicato',
//     value: 'Medio raggio',
//   },
//   {
//     data: 'Lo sapevi che è usato da',
//     value: 'Bode Miller, Tommy Cardelli',
//   },
// ]
const meta = {
  title: 'Organisms/UserProfileBlock',
  component: UserProfileBlock,
  tags: ['autodocs'],
  args: {
    title: 'Titolo del blocco',
    children: <div>content</div>,
  },
} satisfies Meta<typeof UserProfileBlock>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
