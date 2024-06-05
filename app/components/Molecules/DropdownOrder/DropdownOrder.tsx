import classNames from 'classnames'
import { Children, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Types
import type { FC } from 'react'
// Hooks
import { useFilterSearch } from '~/hooks/useFilterSearch'
import type { ISortOption } from '../../../types/filter.interface'
// Components
import Dropdown from '../../Atoms/Dropdown'
import DropdownOrderItem from '../../Atoms/DropdownOrderItem'

interface DropdownOrderProps {
  /**
   * Dropdown options
   */
  options: ISortOption[]
  /**
   * Dropdown variant
   */
  variant?: 'light' | 'dark'
  /**
   * Dropdown preselected option
   */
  preselectedOption?: ISortOption
}

const DropdownOrder: FC<DropdownOrderProps> = ({
  options,
  variant = 'light',
  preselectedOption,
}) => {
  const { t } = useTranslation()
  const { order, setOrder } = useFilterSearch()

  const urlOption = options.find(
    (option) =>
      option.name === order.name && option.direction === order.direction,
  )

  const initialOption = urlOption || options[0]
  const [isDropdownClosed, setIsDropdownClosed] = useState(false)
  const [selectedOption, setSelectedOption] = useState<ISortOption | null>(
    initialOption,
  )

  useEffect(() => {
    if (preselectedOption) {
      setSelectedOption(preselectedOption)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectedOptions = (option: ISortOption) => {
    setIsDropdownClosed(true)
    setSelectedOption(option)
    // Set order to url
    const params = new URLSearchParams()
    params.set(option.name, option.direction)
    setOrder({ order: option.name, direction: option.direction })
    // Close dropdown
    setTimeout(() => setIsDropdownClosed(false))
  }

  const label = t(selectedOption?.label || '')

  return (
    <div className="flex flex-row items-baseline">
      <span
        className={classNames({
          'body-xs text-black/70 mr-4 font-sans': true,
          'text-white/70': variant === 'dark',
        })}
      >
        {t('sortBy')}:
      </span>
      <Dropdown
        label={selectedOption ? selectedOption.label : label}
        isClosed={isDropdownClosed}
        variant={variant}
        additionalClasses="mb-4 hover:mb-0 hover:pb-4"
      >
        {Children.toArray(
          options.map((option) => (
            <DropdownOrderItem
              label={option.label}
              direction={option.direction}
              alphabetically={option.alphabetically}
              onClick={() => handleSelectedOptions(option)}
            />
          )),
        )}
      </Dropdown>
    </div>
  )
}

export default DropdownOrder
