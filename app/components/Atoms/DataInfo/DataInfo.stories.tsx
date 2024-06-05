import type { Meta, StoryObj } from '@storybook/react'

import DataInfo from './DataInfo'

const meta = {
  title: 'Atoms/DataInfo',
  component: DataInfo,
  tags: ['autodocs'],
  args: {
    data: 'Taxonomy',
    value: 'Data',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataInfo>

export default meta
type Story = StoryObj<typeof meta>

export const InfoData: Story = {
  args: {
    data: 'Taxonomy',
    value: 'Data',
  },
}

export const InfoDataWithIcon: Story = {
  args: {
    data: 'Taxonomy',
    value: 'Data',
    icon: 'CheckCircle',
  },
}

export const InfoDataWithIconAndBlurredText: Story = {
  args: {
    data: 'Taxonomy',
    value: 'Data',
    icon: 'CheckCircle',
    blurred: true,
  },
}
