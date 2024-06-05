import { Link } from '@remix-run/react'
import classNames from 'classnames'
import type { FC } from 'react'
import SiteLogo from './svg/SiteLogo'
import FoodOnFilmLogo from './svg/FoodOnFilmLogo'

interface LogoProps {
  name?: 'site' | 'food_on_film'
  size?: 'full' | 'compressed'
  color?: 'coloured' | 'black' | 'dove' | 'white'
  to?: string
  extraClasses?: string
}

/**
 * Primary UI component for user interaction
 */
const Logo: FC<LogoProps> = ({
  name = 'site',
  size = 'full',
  color = 'coloured',
  extraClasses = '',
  to,
  ...props
}) => {
  const btnClasses = classNames({
    'inline-block': true,
    'text-black': color === 'black',
    'text-dove': color === 'dove',
    'text-white': color === 'white',
  })

  return (
    <div
      className={classNames({
        'inline-block': true,
        [extraClasses]: true,
      })}
    >
      {to ? (
        <Link to={to} className={btnClasses}>
          {name === 'food_on_film' ? (
            <FoodOnFilmLogo size={size} color={color} />
          ) : (
            <SiteLogo size={size} color={color} />
          )}
        </Link>
      ) : (
        <span className={btnClasses}>
          {name === 'food_on_film' ? (
            <FoodOnFilmLogo size={size} color={color} />
          ) : (
            <SiteLogo size={size} color={color} />
          )}
        </span>
      )}
    </div>
  )
}

export default Logo
