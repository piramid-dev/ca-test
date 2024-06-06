import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment, useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useFetcher } from '@remix-run/react'
import { useLocalizeLink } from '~/hooks/useLocalizeLink'
// Types
import type { IFilterData } from '~/types/filter.interface'
import type { MovieRecord, DirectorRecord } from '~/lib/generated'
// Utils
import { filterIcons, filterType, countItemsByFilter } from '~/lib/filter.utils'
// Utils
import { getAllMoviesUrl } from '~/utils/movies'
import { getAllDirectorsUrl } from '~/utils/directors'
// Components
import Button from '~/components/Atoms/Button'
import SwitchSearch from '~/components/Atoms/SwitchSearch'
import Tab from '~/components/Atoms/Tab'
import ButtonIcon from '../../../components/Atoms/ButtonIcon'
import Search from '../../Organisms/Search'

interface SearchModalProps {
  showModal?: boolean
  onClose: (value: boolean) => void
}
const SearchModal: FC<SearchModalProps> = ({ showModal = true, onClose }) => {
  const { t, i18n } = useTranslation()
  const { l } = useLocalizeLink()
  const locale = i18n.language || 'it'
  const closeSearch = () => console.log('closeSearch')
  const data: any = useLoaderData()
  const fetcher = useFetcher()

  const movieFilters = data?.movieFilters as IFilterData[]
  const directorFilters = data?.directorFilters as IFilterData[]

  const [open, setOpen] = useState(showModal)

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false) // se false è "movies" se true è "directors"
  const [clearSerch, setClearSearch] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState(movieFilters)
  const [activeTab, setActiveTab] = useState(0)
  const [hasSearchResults, setHasSearchResults] = useState(false)
  const [items, setItems] = useState<Array<any>>([])

  const isMoviesSelected = !isSwitchEnabled

  useEffect(() => {
    const query = isMoviesSelected
      ? getAllMoviesUrl({ locale })
      : getAllDirectorsUrl({ locale })
    fetcher.load(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoviesSelected])

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
  }, [fetcher.state, fetcher.data])

  useEffect(() => {
    setOpen(showModal)
  }, [showModal])

  const handleClose = (event: any) => {
    setOpen(false)
    onClose(false)
    setClearSearch(true)
  }

  const handleSwitchChange = (enabled: boolean) => {
    setIsSwitchEnabled(enabled)
    setClearSearch(true)
    enabled
      ? setSelectedCategories(directorFilters)
      : setSelectedCategories(movieFilters)
    setActiveTab(0)
  }

  const handleSearchResultsChange = (hasResults: boolean) => {
    setClearSearch(false)
    setHasSearchResults(hasResults)
  }

  const linkWithFilters = (subject: string, slug: string) => {
    const base = isMoviesSelected ? `/movies/` : `/directors/`
    return `${base}?q=${subject}+${slug}`
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
            onClick={handleClose}
          />
        </Transition.Child>
        <div className="fixed top-0 inset-x-0 z-10 w-screen overflow-y-auto">
          <div className="lg:flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:p-6 md:max-w-[80%] lg:max-w-[660px] xl:max-w-[700px] h-[97vh] sm:h-[90vh]  lg:h-full lg:max-h-[95vh] m-auto">
                <div className="relative max-lg:flex max-lg:flex-col w-full h-full">
                  <div className="flex justify-between items-center flex-wrap gap-x-4 lg:gap-x-10">
                    <Search
                      isInModal={true}
                      handleClose={() => closeSearch()}
                      type={isSwitchEnabled ? 'directors' : 'movies'}
                      placeholder={
                        isSwitchEnabled
                          ? t('header.searchDirectors')
                          : t('header.searchMovies')
                      }
                      clear={clearSerch}
                      onSearchResultsChange={handleSearchResultsChange}
                    />

                    <SwitchSearch
                      leftLabel={t('movies')}
                      rightLabel={t('directors')}
                      onToggle={handleSwitchChange}
                    />

                    <ButtonIcon
                      variant="outline"
                      size="small"
                      icon="X"
                      onClick={handleClose}
                      extraClasses="max-lg:hidden"
                    />
                  </div>

                  {!hasSearchResults ? (
                    <div className="my-8 max-lg:order-3 ">
                      <span className="body-xs font-semibold text-black/60 shrink-0 col-span-full uppercase mb-3">
                        {isSwitchEnabled
                          ? t('exploreDirectors')
                          : t('exploreMovies')}
                      </span>
                      <div className="flex max-lg:flex-col  overflow-hidden h-[70vh] lg:h-[550px]">
                        <div className="lg:w-3/12 max-lg:overflow-hidden">
                          <div className="max-lg:flex max-lg:items-center max-lg:overflow-auto max-lg:w-full max-lg:gap-x-1">
                            {selectedCategories &&
                              Array.isArray(selectedCategories) &&
                              selectedCategories?.map((el, i) => (
                                <Tab
                                  extraClasses={classNames(
                                    'w-full  lg:rounded-r-none',
                                    { '!bg-dove': i === activeTab },
                                  )}
                                  onClick={() => setActiveTab(i)}
                                  key={i}
                                  label={t(`filtersLabels.${el.subject}`)}
                                  icon={filterIcons(el.subject)}
                                />
                              ))}
                          </div>
                        </div>
                        <div
                          className={classNames({
                            'lg:w-9/12 bg-dove rounded-lg  p-2 lg:py-4 max-lg:my-1 h-full overflow-hidden mb-10':
                              true,
                            'lg:rounded-tl-none': activeTab === 0,
                            'lg:rounded-bl-none':
                              activeTab === selectedCategories.length - 1,
                          })}
                        >
                          {selectedCategories &&
                            Array.isArray(selectedCategories) &&
                            selectedCategories?.map((el, i) => (
                              <div key={i}>
                                {i === activeTab ? (
                                  <div className="overflow-y-auto h-full pb-6">
                                    <div className="flex flex-wrap gap-x-2 gap-y-2 ">
                                      {(() => {
                                        return el.values
                                          .map((item, idx) => {
                                            // Count how many item per filter
                                            const count = countItemsByFilter(
                                              items,
                                              el.subject,
                                              item.name,
                                            )

                                            // Create the link for every filter
                                            const link = l(
                                              linkWithFilters(
                                                el.subject,
                                                item.slug,
                                              ),
                                            )

                                            if (count > 0) {
                                              switch (filterType(el.subject)) {
                                                case 'category':
                                                  return (
                                                    <Button
                                                      key={idx}
                                                      variant="dot"
                                                      color={
                                                        item?.color?.hex ||
                                                        'black'
                                                      }
                                                      size="small"
                                                      label={item.name}
                                                      to={link}
                                                      onClick={handleClose}
                                                    />
                                                  )

                                                case 'list':
                                                  return (
                                                    <div
                                                      key={idx}
                                                      className="flex justify-between items-center w-full shrink-0"
                                                    >
                                                      <Button
                                                        color="black"
                                                        variant="flat"
                                                        size="small"
                                                        label={item.name}
                                                        to={link}
                                                        onClick={handleClose}
                                                      />
                                                      <span className="body-xs text-black/70">
                                                        {count}
                                                      </span>
                                                    </div>
                                                  )

                                                default:
                                                  return (
                                                    <Button
                                                      key={idx}
                                                      size="small"
                                                      label={item.name}
                                                      to={link}
                                                      onClick={handleClose}
                                                    />
                                                  )
                                              }
                                            } else {
                                              return null
                                            }
                                          })
                                          .filter((el) => el)
                                      })()}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="lg:hidden text-center  order-last max-md:absolute bottom-0 left-0 w-full bg-white pt-3">
                    <Button
                      icon="X"
                      linkCustomClasses="uppercase"
                      onClick={handleClose}
                      label={t('close')}
                      size="small"
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default SearchModal
