import type { Meta, StoryObj } from '@storybook/react'

import SectionWrapper from './SectionWrapper'

const sectionsColors = ['dove', '#A4B2EA', 'dove', 'black']

const meta = {
  title: 'Atoms/SectionWrapper',
  component: SectionWrapper,
  tags: ['autodocs'],
  args: {
    children: (
      <div className="flex flex-row gap-2">
        <div className="h-20 w-20 bg-red-500"></div>
        <div className="h-20 w-20 bg-red-500"></div>
        <div className="h-20 w-20 bg-red-500"></div>
        <div className="h-20 w-20 bg-red-500"></div>
        <div className="h-20 w-20 bg-red-500"></div>
        <div className="h-20 w-20 bg-red-500"></div>
      </div>
    ),
  },
} satisfies Meta<typeof SectionWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const SingleSection: Story = {
  args: {
    background: 'dove',
  },
}

export const SectionOverlap: Story = {
  args: {
    background: 'dove',
  },
  render: (args) => (
    <div>
      {sectionsColors.map((el, i) => (
        <SectionWrapper key={i} background={el} overlap={i !== 0}>
          {args.children}
        </SectionWrapper>
      ))}
    </div>
  ),
}

export const Dark: Story = {
  args: {
    background: 'black',
  },
  render: (args) => (
    <div>
      <SectionWrapper {...args}>
        <h3>Title</h3>
      </SectionWrapper>
    </div>
  ),
}
