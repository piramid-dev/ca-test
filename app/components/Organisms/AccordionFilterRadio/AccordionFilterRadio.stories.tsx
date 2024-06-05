import type { Meta, StoryObj } from '@storybook/react'

import AccordionFilterRadio from './AccordionFilterRadio'

const meta = {
  title: 'Organisms/AccordionFilterRadio',
  component: AccordionFilterRadio,
  tags: ['autodocs'],
  args: {
    label: 'Tipo di skier',
    isOpen: false,
  },
  decorators: [
    (Story) => (
      <div className="h-40 w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccordionFilterRadio>

export default meta
type Story = StoryObj<typeof meta>

export const ClosedAccordion: Story = {
  args: {
    radios: [
      {
        label: 'Unisex',
        name: 'type',
        value: true,
      },
      {
        label: 'Made for ladies',
        name: 'type',
        value: false,
      },
      {
        label: 'Made for kids',
        name: 'type',
        value: false,
      },
    ],
  },
}

export const OpenAccordion: Story = {
  args: {
    isOpen: true,
    radios: [
      {
        label: 'Unisex',
        name: 'type_2',
        value: true,
      },
      {
        label: 'Made for ladies',
        name: 'type_2',
        value: false,
      },
      {
        label: 'Made for kids',
        name: 'type_2',
        value: false,
      },
    ],
  },
}

export const LockedAccordion: Story = {
  args: {
    locked: true,
    radios: [
      {
        label: 'Unisex',
        name: 'type_2',
        value: true,
      },
      {
        label: 'Made for ladies',
        name: 'type_2',
        value: false,
      },
      {
        label: 'Made for kids',
        name: 'type_2',
        value: false,
      },
    ],
  },
}
