import type { FC } from 'react'
import { Link } from '@remix-run/react'
import { Image } from 'react-datocms'
import classNames from 'classnames'
import { truncatePhrase } from '~/utils'
import { useLocalizeLink } from '~/hooks/useLocalizeLink'
// Components
import Logo from '~/components/Atoms/Logo'
import type { Maybe, ResponsiveImage } from '../../../lib/generated'
import ButtonIcon from '../../Atoms/ButtonIcon/ButtonIcon'
import CardTitle from '../../Atoms/CardTitle'

interface CardBaseProps {
  id?: string
  type?: 'shelf' | 'search'
  eyelet?: string
  image: Maybe<ResponsiveImage> | undefined
  customClass?: string
  to: string
  isInModal?: boolean
}

interface CardMovieProps extends CardBaseProps {
  title?: string
  category?: string
  categoryColor?: string
  isFoodOnFilm?: boolean
  content?: Maybe<string>
}

interface CardDirectorProps extends CardBaseProps {
  firstName?: string
  lastName?: string
}

type CardProps = CardMovieProps | CardDirectorProps

const Card: FC<CardProps> = ({
  id,
  eyelet,
  customClass = '',
  image,
  type = 'shelf',
  to,
  isInModal = false,
  ...props
}) => {
  const { l } = useLocalizeLink()
  const isDirectorCard = 'firstName' in props && 'lastName' in props
  const title = 'title' in props ? props.title : undefined
  const category =
    'category' in props && props.category !== '' ? props.category : undefined
  const categoryColor =
    'categoryColor' in props && props.categoryColor ? props.categoryColor : ''
  const content =
    'content' in props && props.content !== '' ? props.content : undefined

  const shortContent = truncatePhrase(content, 16)

  return (
    <Link id={id} to={l(to)} className="relative">
      <div
        className={classNames({
          'h-full overflow-hidden rounded-xl relative border-2 border-black/20 max-w-80 group flex flex-col':
            true,
          'card-archive': category !== '',
          [customClass]: customClass,
        })}
      >
        <div className="overflow-hidden shrink-0">
          {'isFoodOnFilm' in props && props.isFoodOnFilm ? (
            <Logo
              extraClasses="absolute top-2 right-4 z-[2]"
              name="food_on_film"
              size="compressed"
              color="white"
            />
          ) : null}
          {image ? (
            <Image
              data={image}
              className={classNames(
                'w-full h-full scale-1 group-hover:scale-[1.05] transition-all duration-700',
                {
                  'aspect-square': !isDirectorCard,
                  'aspect-portrait': isDirectorCard,
                },
              )}
              objectFit="cover"
              objectPosition="center"
            />
          ) : (
            <div className="w-full h-full aspect-square scale-1 bg-black/40" />
          )}
        </div>
        <div className="relative  -mt-[45px] grow">
          {!isDirectorCard && category ? (
            <div
              style={{ backgroundColor: categoryColor }}
              className="-translate-y-2 group-hover:-translate-y-7 rounded-t-xl h-full w-full uppercase text-white px-4 py-2 absolute body-xs font-semibold  ease-out transition-all duration-300"
            >
              {category}
            </div>
          ) : null}
          <div className="w-full bg-white rounded-t-xl  flex flex-col relative p-4 h-full">
            <div className="pb-6">
              {isDirectorCard ? (
                <CardTitle
                  eyelet={eyelet}
                  firstname={props.firstName}
                  lastname={props.lastName}
                  isInModal={isInModal}
                />
              ) : (
                <CardTitle
                  title={title}
                  eyelet={eyelet}
                  isInModal={isInModal}
                />
              )}
            </div>
            <div
              className={classNames({
                'h-full': true,
                'flex flex-col gap-3': content !== '',
              })}
            >
              {content && type === 'shelf' && !isDirectorCard ? (
                <div
                  className="body-s font-sans text-black truncate-3-lines hidden lg:block"
                  dangerouslySetInnerHTML={{ __html: shortContent }}
                />
              ) : null}
              {type === 'shelf' ? (
                <ButtonIcon
                  extraClasses="ml-auto mt-auto shrink-0 max-lg:hidden"
                  icon="ArrowRight"
                  variant="outline"
                  size="small"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
