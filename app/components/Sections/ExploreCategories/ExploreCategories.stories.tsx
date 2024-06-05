import type { Meta, StoryObj } from '@storybook/react'

import ExploreCategories from './ExploreCategories'
const meta = {
  title: 'Sections/ExploreCategories',
  component: ExploreCategories,
  tags: ['autodocs'],
  args: {
    title: 'Esplora per area tematica',
    button: {
      to: '/',
      label: 'vedi tutti i film',
    },
    tags: [
      {
        color: '#CDD9F9',
        label: 'Acqua',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Biodiversità',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Ecosistemi',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Energia',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Cibo',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Sostenibilità',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Attivismo',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Cambiamento climatico',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Inqiunamento',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Aree geografiche',
        to: '/',
      },
    ],
  },
} satisfies Meta<typeof ExploreCategories>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    title: 'Esplora per area tematica',
    button: {
      to: '/',
      label: 'vedi tutti i film',
    },
    tags: [
      {
        color: '#CDD9F9',
        label: 'Acqua',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Biodiversità',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Ecosistemi',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Energia',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Cibo',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Sostenibilità',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Attivismo',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Cambiamento climatico',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Inqiunamento',
        to: '/',
      },
      {
        color: '#CDD9F9',
        label: 'Aree geografiche',
        to: '/',
      },
    ],
  },
}
