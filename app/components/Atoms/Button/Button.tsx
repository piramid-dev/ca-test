import {
  ArrowRight,
  BookmarkSimple,
  DownloadSimple,
  MagnifyingGlass,
  Play,
  Printer,
  ShareNetwork,
  SlidersHorizontal,
  X,
} from '@phosphor-icons/react'
import { Link } from '@remix-run/react'
import classNames from 'classnames'
import type { FC, MouseEventHandler } from 'react'
import React from 'react'
import type { Maybe } from '../../../lib/generated'
// Components
import Dot from '../Dot'

interface ButtonProps {
  /**
   * Button size
   * @default 'normal'
   */

  size?: 'normal' | 'big' | 'small'
  /**
   * Is button primary or secondary?
   * @default 'outline'
   */
  variant?: 'outline' | 'dot' | 'flat' | 'filter' | string
  /**
   * Button color
   * @default 'black'
   */
  color?: 'black' | 'primary' | 'white' | string
  /**
   * Button contents
   */
  label?: string | React.ReactNode
  /**
   * Icon
   */
  icon?:
    | 'ArrowRight'
    | 'DownloadSimple'
    | 'Printer'
    | 'MagnifyingGlass'
    | 'Play'
    | 'ShareNetwork'
    | 'BookmarkSimple'
    | 'SlidersHorizontal'
    | Maybe<string>
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
   * button target
   */
  target?: string
  /**
   * Does link type has specific classes?
   */
  linkCustomClasses?: string

  /**
   * Has a specific font size?
   */
  extraClasses?: string

  /**
   * Optional class name
   */
  containerClassName?: string

  /* If button is in element and needs to be animated on parent or other element hover*/
  inheritHoverStatus?: boolean

  /* Content of the button */
  children?: React.ReactNode
}

/**
 * Primary UI component for user interaction
 */
const Button: FC<ButtonProps> = ({
  variant = 'outline',
  size = 'normal',
  color = 'black',
  icon = null,
  type = 'button',
  label = '',
  children,
  containerClassName = '',
  isSubmitting = false,
  disabled = false,
  to,
  target,
  onClick,
  linkCustomClasses,
  extraClasses = '',
  ...props
}) => {
  const iconWeight = 'light'

  const iconType = {
    ArrowRight,
    Printer,
    DownloadSimple,
    MagnifyingGlass,
    Play,
    ShareNetwork,
    BookmarkSimple,
    SlidersHorizontal,
    X,
  }

  const _label = isSubmitting ? 'Submitting...' : label

  const btnClasses = classNames({
    'box-border inline-flex items-center justify-center  p-2 lg:px-4 lg:py-2 whitespace-nowrap font-semibold ease-out transition-all duration-300':
      true,
    'rounded-full': variant !== 'flat',
    'body-l gap-x-2 lg:gap-x-3 ': size === 'normal',
    'body-s gap-x-1': size === 'small',
    'body-xl gap-x-1 lg:gap-x-3 ': size === 'big',
    'border text-black group-hover:text-white active:text-white active:border-2 group-hover:bg-black active:bg-black':
      variant === 'outline' && color === 'black',
    'border text-white group-hover:text-black active:text-black active:border-2 group-hover:bg-white active:bg-white':
      variant === 'outline' && color === 'white',
    'border border-primary text-primary group-hover:text-white group-hover:bg-primary  active:text-white active:border border-primary active:bg-primary':
      variant === 'outline' && color === 'primary',
    'text-white group-hover:text-black active:text-black':
      variant === 'flat' && color === 'white',
    'text-black group-hover:text-black active:text-black': variant === 'flat',
    'bg-white border group-hover:font-normal group-hover:text-white active:font-normal overflow-hidden group-hover:border group-hover:border-black active:border-2':
      variant === 'dot',
    '!p-2.5 lg:!p-4': !label,
    '!cursor-not-allowed': isSubmitting || disabled,
    'opacity-50 pointer-events-none': disabled,
    'border text-black': variant === 'filter',
    'bg-black/40': variant === 'filter' && color === '',
  })

  const labelClasses = classNames('text-center', {
    'ease-out transition-all duration-200': variant === 'dot',
    'group-hover:-translate-x-[24px] group-hover:md:-translate-x-[32px]':
      size === 'normal' && variant === 'dot',
    'group-hover:-translate-x- group-hover:md:-translate-x-5':
      size === 'small' && variant === 'dot',
    'group-hover:-translate-x-5 group-hover:md:-translate-x-8':
      size === 'big' && variant === 'dot',
  })
  function btnContent() {
    return (
      <>
        {variant === 'dot' ? <Dot color={color} size={size} /> : null}
        <span className={labelClasses}> {children ? children : _label}</span>

        {icon
          ? React.createElement(iconType[icon], {
              weight: iconWeight,
              className: classNames({
                'w-5 md:w-7 h-5 md:h-7': size === 'normal',
                'w-4 md:w-5 h-4 md:h-5': size === 'small',
                'w-5 md:w-8 h-5 md:h-8': size === 'big',
                absolute: variant === 'dot',
                'right-0 opacity-0 hidden': variant === 'dot',
                'group-hover:right-[10px] group-hover:md:right-[14px]':
                  variant === 'dot' && size === 'normal',
                'group-hover:right-[8px] group-hover:md:right-[10px]':
                  variant === 'dot' && size === 'small',
                'group-hover:right-[10px] group-hover:md:right-[10px]':
                  variant === 'dot' && size === 'big',
              }),
            })
          : null}
        {variant === 'dot' ? (
          <span
            className={classNames({
              'inline-block overflow-hidden ': true,
              'w-5 h-5': size !== 'small',
              'w-4 h-4': size === 'small',
            })}
          >
            <ArrowRight className="w-full h-full text-black group-hover:text-white opacity-0 translate-x-[100%] group-hover:translate-x-[0] group-hover:opacity-100 group-hover:linear ease-in duration-[180ms]" />
          </span>
        ) : null}
      </>
    )
  }

  const customColor =
    color !== 'primary' &&
    color !== 'black' &&
    color !== 'white' &&
    variant !== 'dot'
      ? { backgroundColor: color }
      : {}
  return (
    <span
      className={classNames({
        'group relative inline-block font-sans bg-blend-multiply': true,
        [containerClassName]: true,
        [extraClasses]: true,
      })}
    >
      {to ? (
        <Link
          to={to}
          target={target}
          className={[btnClasses, linkCustomClasses].join(' ')}
          style={customColor}
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
          style={customColor}
          className={[btnClasses, linkCustomClasses].join(' ')}
          onClick={onClick}
          {...props}
        >
          {btnContent()}
        </button>
      )}
    </span>
  )
}
export type { ButtonProps }
export default Button
