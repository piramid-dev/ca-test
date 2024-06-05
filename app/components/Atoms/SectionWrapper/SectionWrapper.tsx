import classNames from 'classnames'
import type { FC } from 'react'
import type { Maybe } from '../../../lib/generated'

interface SectionWrapperProps {
  id?: string
  container?: boolean
  background: 'dove' | 'white' | 'black' | 'transparent' | string // string è per codice colore custom, da categorie
  rounded?: boolean
  overlap?: boolean
  sectionClass?: string
  containerClass?: string
  overflowHidden?: boolean
  variant?: Maybe<'dark'>
  children: React.ReactNode
}

const SectionWrapper: FC<SectionWrapperProps> = ({
  id,
  container = true,
  background = 'dove',
  rounded = true,
  overlap = true,
  children,
  sectionClass = '',
  containerClass = '',
  overflowHidden = true,
  variant,
}) => {
  return (
    <section
      id={id}
      style={
        ['dove', 'white', 'black', 'transparent'].includes(background)
          ? undefined
          : { backgroundColor: background }
      }
      className={classNames({
        'bg-dove': background === 'dove',
        'bg-white': background === 'white',
        'bg-black': background === 'black',
        'text-white': variant === 'dark' || background === 'black',
        'overflow-hidden': overflowHidden,
        'rounded-t-3xl': rounded,
        // 'relative -mt-10 lg:-mt-5 max-lg:pb-10': overlap,
        'relative -mt-6 max-lg:pb-6': overlap,
        [sectionClass]: sectionClass,
      })}
    >
      <div
        className={classNames({
          container: container,
          'py-8 lg:py-16': container,
          [containerClass]: containerClass,
        })}
      >
        {children}
      </div>
    </section>
  )
}
export default SectionWrapper
