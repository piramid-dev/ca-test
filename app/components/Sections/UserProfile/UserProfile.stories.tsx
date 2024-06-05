import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router'

// import CardBasic from '../../Organisms/CardBasic/CardBasic'
import UserProfileBlock from '../../Organisms/UserProfileBlock/UserProfileBlock'
// import ShelfProductCarousel from '../../Organisms/ShelfProductCarousel/ShelfProductCarousel'

import UserProfile from './UserProfile'

// const prodDemo = [
//   {
//     id: '1',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
//   {
//     id: '2',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '/assets/mock-sci.png',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
//   {
//     id: '3',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '/assets/mock-sci.png',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
//   {
//     id: '4',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '/assets/mock-sci.png',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
//   {
//     id: '5',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '/assets/mock-sci.png',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
//   {
//     id: '6',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '/assets/mock-sci.png',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
//   {
//     id: '7',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '/assets/mock-sci.png',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
//   {
//     id: '8',
//     name: 'Zero G',
//     brand: { name: 'Lange', slug: 'lange' },
//     chips: ['Tour', 'Sci'],
//     awards: [
//       { name: 'green', color: 'green' } as any,
//       { name: 'smart', color: 'silver' } as any,
//       { name: 'pro', color: 'silver' } as any,
//     ],
//     testedPreview: 'TESTED',
//     firstInfo: 'Larg. centro: 64mm',
//     secondInfo: 'Peso: 780gr',
//     imageUrl: '/assets/mock-sci.png',
//     to: '/url',
//     family: 'Sci',
//     image: {
//       src: 'https://picsum.photos/seed/picsum/200/300',
//       alt: 'alt',
//       width: 200,
//     },
//   },
// ]
// const infosDemo = [
//   {
//     data: 'Atteggiamento',
//     value: 'Alpinista',
//   },
//   {
//     data: 'Arco di curva indicato',
//     value: 'Medio raggio',
//   },
//   {
//     data: 'Lo sapevi che è usato da',
//     value: 'Bode Miller, Tommy Cardelli',
//   },
// ]

const meta = {
  title: 'Sections/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  args: {
    labels: ['Preferiti', 'Abbonamento', 'Account', 'Indirizzi'],
    children: (
      <>
        {/* <ShelfProductCarousel
          background="dove-500"
          title="I tuoi preferiti"
          products={prodDemo}
          isUserFavoriteCarousel
        /> */}
        <UserProfileBlock title="I tuoi ordini">
          <div className="lg:w-1/2">
            {/* <CardBasic
              title="Lorem ipsum dolor"
              infos={infosDemo}
              hasDivider={false}
            /> */}
          </div>
        </UserProfileBlock>
        <UserProfileBlock title="Dettagli dell'account">
          <div className="lg:w-1/2">
            {/* <CardBasic
              title="Profilo e sicurezza"
              infos={infosDemo}
              button={
                <span className="cursor-pointer font-sans body-l !font-semibold">
                  Modifica
                  <ArrowRight size={24} className="ml-2 inline-block" />
                </span>
              }
            /> */}
          </div>
        </UserProfileBlock>
      </>
    ),
  },
  decorators: [
    // SEE: https://github.com/remix-run/remix/discussions/6273#discussioncomment-5820820
    (Story) => <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>,
  ],
} satisfies Meta<typeof UserProfile>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
