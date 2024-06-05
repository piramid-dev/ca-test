import { CaretDown } from '@phosphor-icons/react'
import classNames from 'classnames'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useFilterSearch } from '~/hooks/useFilterSearch'
// Types
import type { IFilterData } from '~/types/filter.interface'
// Utils
import { filterIcons } from '~/lib/filter.utils'
// Components
import Button from '~/components/Atoms/Button'
import Toggle from '~/components/Atoms/Toggle'
import Modal from '~/components/Molecules/Modal'
import AccordionFilterCheckbox from '../../Organisms/AccordionFilterCheckbox'

interface FiltersBlockProps {
  filters: IFilterData[]
  color?: string
  showMovieToggles?: boolean
}
const FiltersBlock: FC<FiltersBlockProps> = ({
  filters,
  color,
  showMovieToggles = false,
}) => {
  const { t } = useTranslation()
  const [filterOpen, setFilterOpen] = useState(false)
  const { activeFilters, setFilters, clearFilters } = useFilterSearch()
  const controls = useAnimation()
  const [isOpen, setIsOpen] = useState(false)
  // Handle toggle streaming
  const [streamingFilter, setStreamingFilter] = useState(false)
  // Handle toggle Food on film
  const [foodOnFilmFilter, setFoodOnFilmFilter] = useState(false)

  const variants = {
    expanded: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  }

  useEffect(() => {
    if (isOpen) {
      controls.start('expanded')
    } else {
      controls.start('collapsed')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleApplyFilter = () => {
    setFilterOpen(false)
  }

  const handleFilter = ({
    subject,
    value,
  }: {
    subject: string
    value: string
  }) => {
    setFilters(subject, value)
  }

  const handleCheckboxChange = (checkbox) => {
    const { subject, slug } = checkbox
    setFilters(subject, slug)
  }

  return (
    <>
      <div className="flex flex-wrap gap-x-2 lg:gap-x-4 gap-y-4 mb-6 lg:mb-16 max-lg:items-center max-lg:justify-between">
        <Button
          variant="outline"
          icon="SlidersHorizontal"
          label={t('filters')}
          size="small"
          onClick={() => setFilterOpen(!filterOpen)}
        />
        <CaretDown
          onClick={() => setIsOpen(!isOpen)}
          className={classNames({
            '-rotate-180 transform': isOpen,
            'rotate-0 transform': !isOpen,
            'lg:hidden w-4 transition-all duration-300': true,
          })}
        />

        <motion.div
          initial={isOpen ? 'expanded' : 'collapsed'}
          className="overflow-y-hidden lg:hidden shrink-0 grow w-full"
          variants={variants}
          animate={controls}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="filter-labels-container ">
            <div className="gap-x-2 gap-y-2  flex flex-wrap ">
              <ClearFilters
                filters={filters}
                color={color}
                activeFilters={activeFilters}
                setFilters={handleCheckboxChange}
              />
            </div>

            {showMovieToggles ? (
              <div className="mt-5 flex items-center gap-x-10 gap-y-2">
                {streamingFilter ? (
                  <Toggle
                    label={t('streaming')}
                    enabled={streamingFilter}
                    onToggle={() => setStreamingFilter(!streamingFilter)}
                  />
                ) : null}
                {foodOnFilmFilter ? (
                  <Toggle
                    label="Food on film"
                    enabled={foodOnFilmFilter}
                    onToggle={() => setFoodOnFilmFilter(!foodOnFilmFilter)}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </motion.div>

        {showMovieToggles || activeFilters?.length > 0 ? (
          <div className="filter-labels-container max-lg:hidden lg:border-l lg:border-black ">
            {activeFilters?.length > 0 ? (
              <div className="px-4 gap-x-4 flex flex-wrap">
                <ClearFilters
                  filters={filters}
                  color={color}
                  activeFilters={activeFilters}
                  setFilters={handleFilter}
                />
              </div>
            ) : null}

            {showMovieToggles ? (
              <div
                className={classNames(
                  'flex gap-y-2 px-4 items-center gap-x-10',
                  {
                    'my-2': activeFilters.length === 0,
                    'mt-4': activeFilters.length > 0,
                  },
                )}
              >
                <Toggle
                  label={t('streaming')}
                  enabled={streamingFilter}
                  onToggle={() => setStreamingFilter(!streamingFilter)}
                />
                <Toggle
                  label="Food on film"
                  enabled={foodOnFilmFilter}
                  onToggle={() => setFoodOnFilmFilter(!foodOnFilmFilter)}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <Modal
        showModal={filterOpen}
        title={t('filterBy')}
        onClose={() => setFilterOpen(false)}
      >
        <div className="relative">
          <ClearFilters
            filters={filters}
            color={color}
            activeFilters={activeFilters}
            setFilters={handleFilter}
          />
          {showMovieToggles ? (
            <div className="my-6 flex items-center gap-x-10">
              <Toggle
                label={t('streaming')}
                enabled={streamingFilter}
                onToggle={() => setStreamingFilter(!streamingFilter)}
              />
              <Toggle
                label="Food on film"
                enabled={foodOnFilmFilter}
                onToggle={() => setFoodOnFilmFilter(!foodOnFilmFilter)}
              />
            </div>
          ) : null}
          <div className="my-6 h-[190px] overflow-hidden">
            <div className="overflow-auto h-full">
              {filters.map((filter, index) => {
                const filterGroup = filter.values
                const subject = filter.subject

                return (
                  <div key={index}>
                    <AccordionFilterCheckbox
                      label={t(`filtersLabels.${subject}`)}
                      subject={subject}
                      checkboxes={filterGroup}
                      isOpen={false}
                      onChange={handleCheckboxChange}
                      activeFilters={activeFilters}
                      icon={filterIcons(subject)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex items-center bg-white gap-x-4 ">
            <Button
              extraClasses="w-full"
              linkCustomClasses="w-full"
              onClick={handleApplyFilter}
              label={t('applyFilters')}
            />
            <Button
              onClick={clearFilters}
              extraClasses="w-full"
              linkCustomClasses="w-full"
              label={t('removeFilters')}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
export default FiltersBlock

// ClearFilters component
const ClearFilters = ({ filters, activeFilters, setFilters, color }) => {
  return (
    <div className="flex gap-x-2">
      {filters.map((filter: IFilterData) => {
        const filterGroup = filter.values
        const subject = filter.subject

        const clearButtons = filterGroup
          .map((item) => {
            if (
              activeFilters &&
              activeFilters
                ?.find((item) => item.subject === subject)
                ?.values?.includes(item.slug)
            ) {
              return item
            } else {
              return null
            }
          })
          .filter((item) => item !== null)

        return (
          clearButtons.length > 0 &&
          clearButtons.map(
            (item, idx) =>
              item && (
                <Button
                  key={idx}
                  variant="filter"
                  icon="X"
                  label={item.name}
                  size="small"
                  color={color ? color : ''}
                  onClick={() => setFilters({ subject, value: item.slug })}
                />
              ),
          )
        )
      })}
    </div>
  )
}
