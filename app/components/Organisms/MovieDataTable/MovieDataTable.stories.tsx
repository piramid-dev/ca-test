import type { Meta, StoryObj } from '@storybook/react'

import MovieDataTable from './MovieDataTable'

const meta = {
  title: 'Organisms/MovieDataTable',
  component: MovieDataTable,
  tags: ['autodocs'],
  args: {
    basicInfo: [
      {
        data: 'titolo originale',
        value: 'Lorem ipsum',
      },
      {
        data: 'titolo internazionale',
        value: 'Lorem ipsum',
      },
      {
        data: 'genere',
        value: 'Lorem ipsum',
      },
      {
        data: 'paese',
        value: 'Lorem ipsum',
      },
      {
        data: 'anno',
        value: '2024',
      },
      {
        data: 'durata',
        value: '91"',
      },
    ],
  },
} satisfies Meta<typeof MovieDataTable>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
export const Expandible: Story = {
  args: {
    additionalInfos: [
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
