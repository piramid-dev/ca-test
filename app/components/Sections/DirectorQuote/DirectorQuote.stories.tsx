import type { Meta, StoryObj } from '@storybook/react'

import DirectorQuote from './DirectorQuote'
const meta = {
  title: 'Sections/DirectorQuote',
  component: DirectorQuote,
  tags: ['autodocs'],
  args: {
    quote:
      'Fare sempre le stesse cose non aiuta a certo migliorarsi, bisogna fare anche quello che davvero non ci piace.',
    eyelet: 'note di regia',
    categoryColor: '#A4B2EA',
  },
} satisfies Meta<typeof DirectorQuote>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    quote:
      'Fare sempre le stesse cose non aiuta a certo migliorarsi, bisogna fare anche quello che davvero non ci piace. Fare sempre le stesse cose non aiuta a certo migliorarsi, bisogna fare anche quello che davvero non ci piace. Fare sempre le stesse cose non aiuta a certo migliorarsi, bisogna fare anche quello che davvero non ci piace. Fare sempre le stesse cose non aiuta a certo migliorarsi, bisogna fare anche quello che davvero non ci piace.',
    eyelet: 'note di regia',
    categoryColor: '#A4B2EA',
  },
}
