import type { Meta, StoryObj } from '@storybook/react'

import DataTable from './DataTable'

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    infos: [
      {
        data: 'titolo originale',
        value: 'Lorem ipsum',
      },
      {
        data: 'Titolo internazionale',
        value: 'Lorem ipsum',
      },
      {
        data: 'Genere',
        value: 'Dicumentario',
      },
    ],
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
export const Expandible: Story = {
  args: {
    infos: [
      {
        data: 'titolo originale',
        value: 'Lorem ipsum',
      },
      {
        data: 'Titolo internazionale',
        value: 'Lorem ipsum',
      },
      {
        data: 'Genere',
        value: 'Dicumentario',
      },
      {
        data: 'Paese',
        value: 'Lorem ipsum',
      },
      {
        data: 'anno',
        value: 'durata',
      },
      {
        data: 'consigliato',
        value: 'Dicumentario',
      },
      {
        data: 'produzione',
        value: 'Lorem ipsum',
      },
      {
        data: 'produttore',
        value: 'Lorem ipsum',
      },
      {
        data: 'Genere',
        value: 'Dicumentario',
      },
    ],
  },
}
