import type { Meta, StoryObj } from '@storybook/react'

import DownloadItem from './DownloadItem'

const meta = {
  title: 'Organisms/DownloadItem',
  component: DownloadItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Top stories su al Tonale',
    button: {
      link: '/',
      label: 'Download',
    },
  },
  decorators: [(Story) => <div className="">{Story()}</div>],
} satisfies Meta<typeof DownloadItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const DownloadList: Story = {
  render: (args) => (
    <div className="container">
      <DownloadItem title="High quality photo" button={args.button} />
      <DownloadItem title="High quality poster" button={args.button} />
      <DownloadItem title="Press Kit" button={args.button} />
    </div>
  ),
}
