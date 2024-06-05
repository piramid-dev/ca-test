import {
  FilmStrip,
  GlobeHemisphereWest,
  GridFour,
  Timer,
  Folders,
  Folder,
  Translate,
  AddressBook,
} from '@phosphor-icons/react'
import { Link } from '@remix-run/react'
import classNames from 'classnames'
import React from 'react'
import type { FC, MouseEventHandler } from 'react'
import type { Maybe } from '../../../lib/generated'

interface TabProps {
  to?: Maybe<string>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  label: string
  icon?:
    | 'GridFour'
    | 'FilmStrip'
    | 'GlobeHemisphereWest'
    | 'Timer'
    | 'Folders'
    | 'Folder'
    | 'Translate'
    | 'AddressBook'
  extraClasses?: string
}

const Tab: FC<TabProps> = ({ to, onClick, label, icon, extraClasses = '' }) => {
  const tabClasses = classNames({
    'relative flex body-s gap-x-2 lg:gap-x-3 p-2 lg:p-3 !leading-none items-center rounded-lg hover:bg-dove active:bg-dove font-sans font-semibold transition-all duration-300':
      true,
    [extraClasses]: true,
  })

  const iconType = {
    GridFour,
    FilmStrip,
    GlobeHemisphereWest,
    Timer,
    Folders,
    Folder,
    Translate,
    AddressBook,
  }

  const iconContent = () =>
    icon && React.createElement(iconType[icon], { className: 'w-6 h-6' })

  return to ? (
    <Link
      to={to}
      className={tabClasses}
      onClick={
        onClick as MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
      }
    >
      {iconContent()}
      {label}
    </Link>
  ) : (
    <button onClick={onClick} className={tabClasses}>
      {iconContent()}
      {label}
    </button>
  )
}

export default Tab
