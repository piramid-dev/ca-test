import classNames from 'classnames'
import type { FC } from 'react'

import type { Maybe } from '../../../lib/generated'

interface ChipProps {
  label?: Maybe<string>
  disabled?: boolean
  categoryColor?: string
  extraClasses?: string
}

/**
 * Chip component
 */
const Chip: FC<ChipProps> = ({
  label,
  disabled,
  categoryColor,
  extraClasses = '',
}) => {
  return (
    <div
      className={classNames(
        'relative flex items-center gap-x-2 py-1 pr-4 body-s font-semibold !leading-none',
        {
          [extraClasses]: true,
        },
      )}
    >
      <span className="w-6 h-6 inline-block relative overflow-hidden rounded-full">
        <span
          style={{ backgroundColor: categoryColor }}
          className={classNames(
            'absolute inset-0 rounded-full ease-linear transition-all duration-300',
            {
              'scale-1': !disabled,
              'scale-0': disabled,
            },
          )}
        />
        <span className="absolute inset-0 rounded-full bg-white/70 animate-pulse" />
        <span className="inner-border-2 inner-border-white absolute inset-0 rounded-full  " />
      </span>
      {label}
    </div>
  )
}

export default Chip
