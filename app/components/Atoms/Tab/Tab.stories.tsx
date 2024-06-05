import type { Meta, StoryObj } from '@storybook/react'

import Tab from './Tab'

const meta = {
  title: 'Atoms/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: {
    label: 'Categoria',
    icon: 'FilmStrip',
  },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const SingleTab: Story = {}
export const Tabs: Story = {
  render: (args) => (
    <div className="flex flex-col gap-y-1 max-w-64 w-full">
      <Tab label="Tematica" icon="Folders" />
      <Tab label="Genere" icon="FilmStrip" />
      <Tab label="Paese" icon="GlobeHemisphereWest" />
      <Tab label="Durata" icon="Timer" to="/" />
    </div>
  ),
}
