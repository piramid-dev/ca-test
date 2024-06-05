import classNames from 'classnames'
import type { FC, MouseEventHandler } from 'react'
import React from 'react'
import { Link } from '@remix-run/react'
import {
  ArrowRight,
  ArrowLeft,
  CaretRight,
  CaretLeft,
  CaretDown,
  CaretUp,
  X,
  FacebookLogo,
  TwitterLogo,
  ShareNetwork,
  Play,
  User,
} from '@phosphor-icons/react'

import type { Maybe } from '../../../lib/generated'
import HamburgerIcon from '../../Icons/HamburgerIcon'

interface ButtonProps {
  /**
   * Is button primary or secondary?
   * @default 'primary'
   */
  variant?: 'fill' | 'outline' | 'flat'
  darkMode?: boolean
  icon:
    | 'HamburgerIcon'
    | 'ArrowRight'
    | 'ArrowLeft'
    | 'CaretRight'
    | 'CaretLeft'
    | 'CaretDown'
    | 'CaretUp'
    | 'X'
    | 'FacebookLogo'
    | 'TwitterLogo'
    | 'ShareNetwork'
    | 'Play'
    | 'User'
  size?: 'normal' | 'small'
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Is form submitting
   */
  isSubmitting?: boolean
  /**
  /**
   * Is form disabled
   */
  disabled?: boolean
  /**
   * Optional click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * button to link
   */
  to?: Maybe<string>

  /**
   * Optional class name
   */
  extraClasses?: string
}

/**
 * Primary UI component for user interaction
 */
const ButtonIcon: FC<ButtonProps> = ({
  variant = 'primary',
  icon = 'HamburgerIcon',
  type = 'button',
  extraClasses = '',
  isSubmitting = false,
  disabled = false,
  to,
  size,
  darkMode,
  onClick,
  ...props
}) => {
  const iconType = {
    ArrowRight,
    ArrowLeft,
    CaretRight,
    CaretLeft,
    CaretDown,
    CaretUp,
    X,
    FacebookLogo,
    TwitterLogo,
    ShareNetwork,
    Play,
    User,
  }

  const btnClasses = classNames({
    'box-border flex items-center justify-center whitespace-nowrap rounded-full p-2 transition-all duration-300':
      true,
    'border border-black hover:bg-black active:bg-black text-black  hover:text-white active:text-white':
      variant === 'outline' && !darkMode,
    'bg-black hover:bg-white lg:hover:inner-border lg:hover:inner-border-black  active:inner-border text-white hover:text-black':
      variant === 'fill',
    'border border-white hover:bg-white active:bg-white text-white hover:text-black active:text-black':
      variant === 'outline' && darkMode,
    'w-9 h-9 lg:w-11 lg:h-11': size === 'normal',
    'w-8 h-8 lg:w-9 lg:h-9': size === 'small',
    '!cursor-not-allowed': isSubmitting || disabled,
    'opacity-50 pointer-events-none': disabled,
    // '!p-3 lg:hover:border-black/90 lg:hover:inner-border-none !inner-border-[none] active:inner-border-[3px]':
    //   variant === 'outline-icon',
  })

  function btnContent() {
    if (icon === 'HamburgerIcon') {
      return React.createElement(HamburgerIcon, {
        color: variant === 'outline' ? 'black' : 'white',
      })
    }
    return React.createElement(iconType[icon])
  }
  return (
    <span
      className={classNames({
        'group relative inline-block font-sans bg-blend-multiply': true,
        [extraClasses]: true,
      })}
    >
      {to ? (
        <Link
          to={to}
          className={[btnClasses].join(' ')}
          onClick={
            onClick as MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
          }
        >
          {btnContent()}
        </Link>
      ) : (
        <button
          type={type}
          disabled={isSubmitting || disabled}
          className={btnClasses}
          onClick={onClick}
          {...props}
        >
          {btnContent()}
        </button>
      )}
    </span>
  )
}

export default ButtonIcon
