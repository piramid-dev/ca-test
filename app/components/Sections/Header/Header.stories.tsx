import type { Meta, StoryObj } from '@storybook/react'

import Header from './Header'
const meta = {
  title: 'Sections/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    isHome: false,
    isLogin: false,
  },
} satisfies Meta<typeof Header>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  render: (args) => (
    <>
      <Header {...args} />
      <div className="h-screen bg-black"></div>
      <div className="h-screen bg-primary"></div>
    </>
  ),
}
export const Homepage: Story = {
  render: (args) => (
    <>
      <Header isHome={true} isLogin={true} />
      <div className="h-screen bg-black"></div>
      <div className="h-screen bg-primary"></div>
    </>
  ),
}
