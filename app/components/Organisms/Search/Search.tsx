import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Fuse from 'fuse.js'
import { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useFetcher } from '@remix-run/react'
// Types
import type { MovieRecord, DirectorRecord } from '~/lib/generated'
// Utils
import { getAllMoviesUrl, movieCard } from '~/utils/movies'
import { getAllDirectorsUrl, directorCard } from '~/utils/directors'
// Hooks
import { useLocalizeLink } from '~/hooks/useLocalizeLink'
// Components
import Button from '~/components/Atoms/Button'
import Card from '~/components/Organisms/Card'

interface SearchProps {
  handleClose: () => void
  type?: 'movies' | 'directors'
  isMobile?: boolean
  placeholder?: string
  isInModal?: boolean
  clear?: boolean
  onSearchResultsChange?: (hasResults: boolean) => void
}

const Search: FC<SearchProps> = ({
  handleClose,
  type = 'movies',
  isMobile = false,
  placeholder,
  isInModal = false,
  clear,
  onSearchResultsChange,
}) => {
  const { t, i18n } = useTranslation()
  const { l } = useLocalizeLink()
  const locale = i18n.language || 'it'
  const initialData: Array<any> = []
  const [search, setSearch] = useState('')
  const fetcher = useFetcher()

  const [items, setItems] = useState<Array<any>>([])
  const [searchResults, setSearchResults] = useState<Array<any>>([])

  const defaultPlaceholder = placeholder ?? t('search')
  const baseSlug = type === 'movies' ? '/movies/' : '/directors/'

  const cardsWithProps: any[] = searchResults
    .map((item) => {
      if (type === 'movies') {
        const director = item?.directors ? item?.directors[0] : null
        return director ? movieCard(item, director) : null
      } else {
        const { lastName } = item
        return lastName ? directorCard(item) : null
      }
    })
    .filter((item) => item) // Remove null values

  const keys =
    type === 'movies'
      ? [
          'originalTitle',
          'internationTitle',
          'localizedTitle',
          'directors.fullName',
        ]
      : [
          'firstName',
          'lastName',
          'nationality',
          'movies.originalTitle',
          'movies.internationTitle',
          'movies.localizedTitle',
        ]

  const options = {
    includeScore: true,
    includeMatches: true,
    fuzzy: true,
    threshold: 0.2,
    keys,
  }

  const fuse = new Fuse(items, options)

  useEffect(() => {
    const query =
      type === 'movies'
        ? getAllMoviesUrl({ locale })
        : getAllDirectorsUrl({ locale })
    fetcher.load(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  // An effect for appending data to items state
  useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return
    }
    // If we have new data - append it
    if (fetcher.data) {
      const newItems = fetcher.data as MovieRecord[] | DirectorRecord[]
      setItems(newItems)
    }
  }, [fetcher.state, fetcher.data, type])

  const handleSearch = (event: React.FormEvent<EventTarget>) => {
    const { value } = event.target as HTMLInputElement
    setSearch(value)

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      setSearchResults(initialData)
      return
    }

    const results = fuse.search(value)
    const foundItems = results.map((result) => result.item)
    setSearchResults(foundItems)
  }

  useEffect(() => {
    if (clear) {
      setSearch('')
      setSearchResults(initialData)
      onSearchResultsChange && onSearchResultsChange(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear])

  useEffect(() => {
    if (search) {
      onSearchResultsChange && onSearchResultsChange(true)
    } else {
      onSearchResultsChange && onSearchResultsChange(false)
    }
  }, [search, onSearchResultsChange])

  return (
    <>
      <form
        id="search"
        className={classNames({
          'max-sm:max-w-[50%] max-sm:shrink max-md:max-w-[200px] md:grow':
            isInModal,
          // 'mb-4': moviesWithProps,
          // 'mb-0': !moviesWithProps,
        })}
      >
        <div className="relative w-full rounded-full overflow-hidden bg-dove text-black/70 flex items-center gap-x-1 border border-black/20 px-6 py-2">
          <MagnifyingGlass className="text-black/30 w-6" />

          <input
            autoFocus
            placeholder={defaultPlaceholder}
            value={search}
            name="search"
            type="text"
            onChange={handleSearch}
            className="inline-block w-full border-none caret-primary py-0 border-primary body-m font-sans focus:ring-0 focus:border-primary bg-dove placeholder-black/30"
          />
        </div>
      </form>

      <div
        className={classNames(
          'px-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3  lg:gap-3',
          {
            'max-h-[70vh] overflow-auto': !isMobile,
            'lg:grid-cols-4': !isInModal,
            'order-last shrink-0 w-full': isInModal,
            'my-8': search && searchResults,
          },
        )}
      >
        <AnimatePresence>
          {searchResults.length > 0 && search ? (
            <div className="body-xs font-semibold text-black/60 shrink-0 col-span-full uppercase mb-3">
              {t('search_results')}
            </div>
          ) : null}
          {cardsWithProps
            ? cardsWithProps.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                    staggerChildren: 0.5,
                    delayChildren: 0.3,
                  }}
                >
                  <span onClick={handleClose}>
                    <Card {...item} isInModal={isInModal} />
                  </span>
                </motion.div>
              ))
            : null}
        </AnimatePresence>
        {searchResults.length === 0 && search ? (
          <div className="lg:h-[70vh] col-span-2 lg:col-span-4 xl:col-span-5 flex items-center py-16 flex-col justify-center">
            <div className="font-sans body-l text-black/70 mb-8 text-center max-w-[340px]">
              {t('NoResults')}
            </div>
            <span onClick={handleClose}>
              <Button
                variant="secondary"
                to={l(`${baseSlug}/`)}
                label={t('NoResultsCTA')}
              />
            </span>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Search
