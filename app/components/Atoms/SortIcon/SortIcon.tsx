import { TrendDown, TrendUp } from 'phosphor-react'
import { createElement, type FC } from 'react'

interface SortIconProps {
  direction?: 'asc' | 'desc'
  alphabetically?: boolean
}

const SortIcon: FC<SortIconProps> = ({
  direction = 'asc',
  alphabetically = false,
}) => {
  const iconType = {
    asc: TrendUp,
    desc: TrendDown,
  }
  return alphabetically ? (
    <span className="ml-2 body-m font-sans">
      {direction === 'asc' ? '(A>Z)' : '(Z>A)'}
    </span>
  ) : (
    createElement(iconType[direction!], {
      className: 'ml-2 w-5 h-5',
      weight: 'regular',
      size: 20,
    })
  )
}

export default SortIcon
