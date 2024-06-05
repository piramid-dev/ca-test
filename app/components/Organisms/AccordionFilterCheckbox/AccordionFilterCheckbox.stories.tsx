import type { Meta, StoryObj } from '@storybook/react'

import AccordionFilterCheckbox from './AccordionFilterCheckbox'

const meta = {
  title: 'Organisms/AccordionFilterCheckbox',
  component: AccordionFilterCheckbox,
  tags: ['autodocs'],
  args: {
    subject: 'subject',
    label: 'Nome del filtro',
    isOpen: false,
    checkboxes: [
      {
        label: 'Attributo',
        name: 'attribute1',
        value: false,
      },
      {
        label: 'Attributo',
        name: 'attribute2',
        value: false,
      },
      {
        label: 'Attributo',
        name: 'attribute3',
        value: false,
      },
      {
        label: 'Attributo',
        name: 'attribute4',
        value: true,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="h-96 w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccordionFilterCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const ClosedAccordion: Story = {}

export const OpenAccordion: Story = {
  args: {
    isOpen: true,
    checkboxes: [
      {
        label: 'Attributo',
        name: 'attribute_1',
        value: false,
      },
      {
        label: 'Attributo',
        name: 'attribute_2',
        value: true,
      },
      {
        label: 'Attributo',
        name: 'attribute_3',
        value: false,
      },
    ],
  },
}
