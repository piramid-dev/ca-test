import classNames from 'classnames'
import type { FC } from 'react'

interface DotProps {
  /**
   * Dot size
   * @default 'normal'
   */

  size?: 'normal' | 'big' | 'small'
  color: string
}

/**
 * Primary UI component for user interaction
 */
const Dot: FC<DotProps> = ({ size = 'normal', color = '#CDD9F9' }) => {
  const btnClasses = classNames({
    'rounded-full relative  inline-block  transition-all group-hover:scale-[150]  group-hover:ease-in group-hover:duration-[1400ms] linear duration-[900ms]':
      true,
    'w-5 h-5 md:w-7 md:h-7': size === 'normal',
    'w-4 h-4 md:w-5 md:h-5': size === 'small',
    'w-5 h-5 md:w-8 md:h-8': size === 'big',
  })

  return <span style={{ backgroundColor: color }} className={btnClasses} />
}

export default Dot
