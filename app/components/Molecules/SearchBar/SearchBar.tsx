import type { FC } from 'react'
import Search from '../../Organisms/Search'

interface SearchBarProps {}
const SearchBar: FC<SearchBarProps> = () => {
  const closeSearch = () => console.log('closeSearch')
  return <Search handleClose={closeSearch} />
}
export default SearchBar
