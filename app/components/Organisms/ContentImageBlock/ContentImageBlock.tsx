import type { FC } from 'react'

import type { ButtonProps } from '~/components/Atoms/Button/Button'
import type { Maybe } from '../../../lib/generated'

import Logo from '../../Atoms/Logo'
import SectionWrapper from '../../Atoms/SectionWrapper'
import Button from '../../Atoms/Button'

interface ContentImageBlockProps {
  eyelet?: Maybe<string>
  preTitle?: Maybe<string>
  title: string
  content: string
  background: 'dove' | 'white' | 'black' | 'transparent' | string
  overlap?: boolean
  overflowHidden?: boolean
  variant?: Maybe<'dark'>
  logo?: boolean
  button?: ButtonProps
  image: string
}

const ContentImageBlock: FC<ContentImageBlockProps> = ({
  eyelet,
  title,
  content,
  background,
  overflowHidden,
  overlap,
  variant = background === 'black' ? 'dark' : undefined,
  logo,
  button,
  image,
}) => {
  return (
    <SectionWrapper
      background={background}
      overlap={overlap}
      overflowHidden={overflowHidden}
      variant={variant}
      sectionClass="relative"
      containerClass="max-lg:pb-0"
    >
      <div className="lg:w-1/2 max-lg:py-16 lg:pb-8">
        {logo ? (
          <Logo
            extraClasses="mb-20"
            name="food_on_film"
            size="compressed"
            color={
              variant === 'dark' || background === 'black' ? 'white' : 'black'
            }
          />
        ) : null}
        {eyelet ? (
          <h6 className="body-xs mb-6 lg:mb-8 font-sans font-semibold uppercase">
            {eyelet}
          </h6>
        ) : null}
        <div className="lg:w-1/2">
          {' '}
          <h2 className="h2 font-sans">{title}</h2>
        </div>
        <div className="mt-6 lg:mt-8 lg:pr-6">{content}</div>
        {button ? (
          <Button
            extraClasses="mt-6 lg:mt-8"
            {...button}
            variant="outline"
            color={variant === 'dark' ? 'white' : 'black'}
          />
        ) : null}
      </div>

      <div
        style={{ backgroundImage: `url(${image})` }}
        className="bg-cover max-lg:-mx-4 h-[50vw] max-lg:translate-y-6 lg:h-full lg:w-1/2 lg:absolute right-0 bottom-0 lg:flex justify-end items-end overflow-hidden"
      />
    </SectionWrapper>
  )
}

export default ContentImageBlock
