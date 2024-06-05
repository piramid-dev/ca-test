import type { Meta, StoryObj } from '@storybook/react'

import SiteFooter from './SiteFooter'
const meta = {
  title: 'Organisms/SiteFooter',
  component: SiteFooter,
  tags: ['autodocs'],
  args: {
    isLoggedInd: false,
    projectCol: {
      to: '/',
      img: 'https://picsum.photos/300/70',
      alt: 'Città di Torino - logo',
    },
    supportCol: [
      {
        to: '/',
        img: 'https://picsum.photos/200/100',
        alt: 'Città di Torino - logo',
      },
      {
        img: 'https://picsum.photos/120/86',
        alt: 'Città di Torino - logo',
      },
      {
        to: '/',
        img: 'https://picsum.photos/300/300',
      },
    ],
    navigation: {
      first: [
        { to: '/archivio-film', label: 'Archivio Film' },
        { to: '/archivio-registi', label: 'Archivio Registi' },
        { to: '/food-on-film', label: 'Food on Film' },
      ],
      second: [
        { to: '/about', label: 'About' },
        { to: '/contatti', label: 'Contatti' },
        { to: '/credits', label: 'Credits' },
      ],
      third: [
        { to: '/faq', label: 'FAQ' },
        { to: '/cookie', label: 'Cookie' },
        { to: '/privacy', label: 'Privacy' },
      ],
    },
  },
} satisfies Meta<typeof SiteFooter>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
