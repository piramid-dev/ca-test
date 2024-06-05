import type { FC } from 'react'
import { Link } from '@remix-run/react'
import classNames from 'classnames'
import { ArrowRight } from '@phosphor-icons/react'

interface LinkBasic {
  /**
   * Link to path
   * @default '/'
   */
  to: string
  /**
   * Link label
   */
  label: string
  /**
   * Size
   */
  size?: 'normal' | 'medium' | 'big'
  /**
   * Color
   */
  color?: 'black' | 'white'
  /**
   * Has icon
   */
  icon?: boolean
  /**
   * Has extra classes
   */
  extraClasses?: string
}

const LinkBasic: FC<LinkBasic> = ({
  to,
  label,
  color = 'black',
  size = 'normal',
  icon,
  extraClasses = '',
}) => {
  return (
    <Link
      className={classNames({
        'relative inline-flex items-center overflow-hidden font-sans hover:opacity-100 active:opacity-100 transition-all duration-300':
          true,
        'body-xs opacity-80': size === 'normal',
        'h4 opacity-80': size === 'medium',
        'h1 opacity-90 transition-all duration-300': size === 'big',
        'text-white': color === 'white',
        'items-center gap-x-1': icon,
        [extraClasses]: true,
      })}
      to={to}
    >
      <span className="relative">
        <span
          className={classNames({
            'lined relative overflow-hidden': true,
            'lined-xl': size === 'big',
            [color]: true,
          })}
        >
          {label}
        </span>
      </span>
      {icon ? <ArrowRight /> : null}
    </Link>
  )
}

export default LinkBasic
