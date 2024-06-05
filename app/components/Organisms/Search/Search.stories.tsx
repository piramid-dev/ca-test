import type { Meta, StoryObj } from '@storybook/react'

import Search from './Search'
const meta = {
  title: 'Organisms/Search',
  component: Search,
  tags: ['autodocs'],
  args: {
    handleClose: () => console.log('closeSearch'),
    isInModal: false,
    isMobile: false,
    type: 'movies',
    placeholder: 'Cerca',
    clear: false,
    onSearchResultsChange: () => console.log('searchResultsChange'),
  },
} satisfies Meta<typeof Search>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
