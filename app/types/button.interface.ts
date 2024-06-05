import type { Maybe } from '~/lib/generated'

export interface IButton {
  /**
   * Is button primary or secondary?
   * @default 'primary'
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'outline-inverted'
    | 'outline-dark'
    | 'tertiary'
    | 'filter'
    | 'filter-active'
    | 'transparent'
  /**
   * Button contents
   */
  label?: string | React.ReactNode
  children?: string
  /**
   * Icon
   */
  icon?:
    | null
    | 'ArrowRight'
    | 'Star'
    | 'LockKey'
    | 'Funnel'
    | 'CaretDown'
    | 'X'
    | 'ArrowLeft'
    | 'Play'
    | 'FacebookLogo'
    | 'TwitterLogo'
    | 'ShareNetwork'
    | 'MagicWand'
    | 'ArrowsClockwise'
    | 'Info'
    | 'ShareNetwork'
    | 'SignOut'
  /**
   * Icon position
   */
  iconPos?: 'left' | 'right'
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
   * Has a specific font size?
   */
  extraClasses?: string

  /**
   * Is compressed?
   */
  isCompressed?: boolean

  /**
   * Optional class name
   */
  containerClassName?: string
}
