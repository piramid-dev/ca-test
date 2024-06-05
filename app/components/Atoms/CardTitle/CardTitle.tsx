import classNames from 'classnames'
import type { FC } from 'react'

interface CardTitleBasicProps {
  variant?: 'dark' | 'light'
  eyelet?: string
  extraClasses?: string
  isInModal?: boolean
}

interface CardTitleMovieProps extends CardTitleBasicProps {
  title?: string
}

interface CardDirectorProps extends CardTitleBasicProps {
  firstname?: string
  lastname?: string
}

type CardTitleProps = CardTitleMovieProps | CardDirectorProps

const CardTitle: FC<CardTitleProps> = ({
  variant = 'dark',
  eyelet,
  extraClasses = '',
  isInModal = false,
  ...props
}) => {
  const titleBlock = () => {
    if ('firstname' in props && 'lastname' in props) {
      return (
        <span>
          {props.firstname ? (
            <>
              {props.firstname}
              <br />
            </>
          ) : null}
          {props.lastname}
        </span>
      )
    }
    if ('title' in props) {
      return <span>{props.title}</span>
    }
  }

  return (
    <div className={extraClasses}>
      {eyelet ? (
        <div
          className={classNames({
            'body-s font-sans mb-2 font-semibold': true,
            'text-white': variant === 'light',
            'text-black': variant === 'dark',
          })}
        >
          {eyelet}
        </div>
      ) : null}
      <div
        className={classNames({
          'font-serif break-word': true,
          h4: !isInModal,
          'body-xl': isInModal,
          'text-white': variant === 'light',
          'text-black': variant === 'dark',
        })}
      >
        {titleBlock()}
      </div>
    </div>
  )
}

export default CardTitle
