import type { FC } from 'react'
import { useState } from 'react'

import Button from '../../Atoms/Button'
import Chip from '../../Atoms/Chip'
import type { Maybe } from '../../../lib/generated'

interface SuperCardProps {
  category?: Maybe<string>
  categoryColor?: Maybe<string>
  title?: Maybe<string>
  content?: Maybe<string>
  button?: {
    label: Maybe<string>
    to: Maybe<string>
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }
  image: Maybe<string>
}

const SuperCard: FC<SuperCardProps> = ({
  category,
  categoryColor,
  title,
  content,
  button,
  image = '',
}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      style={{
        backgroundColor:
          isHovered && categoryColor ? categoryColor : 'transparent',
      }}
      className="rounded-xl inner-border inner-border-black/20 p-4 lg:p-6 lg:flex overflow-hidden relative  ease-linear transition-all duration-300 delay-75"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="lg:w-3/5 lg:shrink-0 flex flex-col relative">
        {category ? (
          <Chip
            label={category}
            disabled={isHovered}
            categoryColor={categoryColor ? categoryColor : 'rgba(0,0,0,0.5)'}
          />
        ) : null}
        <div className="my-3 lg:my-auto">
          {title ? (
            <h2 className="h2 font-sans mb-4 lg:mb-8">{title}</h2>
          ) : null}
          {content ? (
            <div className="body-m text-black/70">{content}</div>
          ) : null}
        </div>
        {button ? (
          <Button
            to={button.to}
            label={button.label}
            onClick={button.onClick}
            icon="ArrowRight"
            inheritHoverStatus={isHovered}
          />
        ) : null}
      </div>
      {image ? (
        <div className="hidden lg:inline-block relative">
          <img src={image} alt="" className="w-full h-full object-fit" />
        </div>
      ) : null}
    </div>
  )
}

export default SuperCard
