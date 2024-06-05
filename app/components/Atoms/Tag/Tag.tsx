import { Link } from '@remix-run/react'
import classNames from 'classnames'
import type { FC, MouseEventHandler } from 'react'
import React from 'react'
import type { Maybe } from '../../../lib/generated'
interface TabProps {
  to?: Maybe<string>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  label: string
  extraClasses?: string
}

const Tag: FC<TabProps> = ({ to, onClick, label, extraClasses = '' }) => {
  const tabClasses = classNames({
    'relative body-s py-2 px-4 inner-border inner-border-black/70 text-black/70 !leading-none items-center rounded-full  font-sans font-semibold transition-all duration-300':
      true,
  })

  return to ? (
    <Link
      to={to}
      className={tabClasses}
      onClick={
        onClick as MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
      }
    >
      <span className="inline-block">{label}</span>
    </Link>
  ) : (
    <span onClick={onClick} className={tabClasses}>
      <span className="inline-block">{label}</span>
    </span>
  )
}

export default Tag
