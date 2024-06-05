import type { Meta, StoryObj } from '@storybook/react'

import CardTitle from './CardTitle'

const meta = {
  title: 'Atoms/CardTitle',
  component: CardTitle,
  tags: ['autodocs'],
  args: {
    eyelet: 'Area geografica',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Movie: Story = {
  args: {
    title: "L'uomo che non reggeva l'alcool",
    eyelet: 'Ivo Avido',
  },
}

export const Director: Story = {
  args: {
    firstname: 'Nome',
    lastname: 'Cognome',
  },
}
