import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import SiteNavMobile from './SiteNavMobile'

const meta = {
  title: 'Organisms/SiteNavMobile',
  component: SiteNavMobile,
  tags: ['autodocs'],
  args: {
    isOpen: false,
    products: {
      styleTitle: 'Esplora per stile',
      allProductsLinkLabel: 'Tutti i prodotti',
      allProductsLinkTo: '/',
      categoryCards: [
        {
          title: 'Scialpinismo',
          cards: [
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
          ],
        },
        {
          title: 'Splitnoard',
          cards: [
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
          ],
        },
      ],
      columnOne: [
        {
          main: {
            label: 'Scialpinismo',
          },
          subLinks: [
            {
              label: 'Scarponi',
              to: '/',
            },
            {
              label: 'Sci',
              to: '/',
            },
            {
              label: 'Attacchi',
              to: '/',
            },
            {
              label: 'Pelli',
              to: '/',
            },
            {
              label: 'Bastoni',
              to: '/',
            },
          ],
        },
        {
          main: {
            label: 'Splitboards',
            to: '/',
          },
          subLinks: [
            {
              label: 'Scarponi',
              to: '/',
            },
            {
              label: 'Tavole',
              to: '/',
            },
            {
              label: 'Attacchi',
              to: '/',
            },
            {
              label: 'Pelli',
              to: '/',
            },
            {
              label: 'Bastoni',
              to: '/',
            },
          ],
        },
      ],
      columnTwo: [
        {
          main: {
            label: 'Attrezzatura alpinistica',
          },
          subLinks: [
            {
              label: 'Ramponi',
              to: '/',
            },
            {
              label: 'Picozze',
              to: '/',
            },
            {
              label: 'Imbarcature e cordini',
              to: '/',
            },
          ],
        },
        {
          main: {
            label: 'Sicurezza',
            to: '/',
          },
          subLinks: [
            {
              label: 'ARTVA',
              to: '/',
            },
            {
              label: 'Scialpinismo',
              to: '/',
            },
          ],
        },
      ],
    },
    brands: {
      styleTitle: 'Inside the brands',
      allProductsLinkLabel: '',
      allProductsLinkTo: '',
      categoryCards: [
        {
          title: 'Scialpinismo',
          cards: [
            {
              title: 'Brand name',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Breand 2',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
            {
              title: 'Free',
              to: '/',
              imageUrl: 'https://picsum.photos/id/120/3500/2095',
            },
          ],
        },
      ],
      columnOne: [
        {
          main: {
            label: 'All Brands',
          },
          subLinks: [
            {
              label: 'Brand name',
              to: '/',
            },
            {
              label: 'B name 2',
              to: '/',
            },
            {
              label: 'B name 3',
              to: '/',
            },
          ],
        },
      ],
    },
    locale: 'it',
    user: {},
    validPass: false,
    handleClose: () => {},
  },
  decorators: [
    (Story) => (
      <div className="">
        <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>
        <div className="bg-green-500 h-screen"></div>
        <div className="bg-red-500 h-screen"></div>
        <div className="bg-black h-screen"></div>
      </div>
    ),
  ],
} satisfies Meta<typeof SiteNavMobile>

export default meta
type Story = StoryObj<typeof meta>

export const Primarydsasd: Story = {}
