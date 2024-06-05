import type { FC } from 'react'

import type { Maybe } from '../../../lib/generated'

import SectionWrapper from '../../Atoms/SectionWrapper'

interface TitleTextBlockProps {
  eyelet?: Maybe<string>
  preTitle?: Maybe<string>
  title: string
  content: Maybe<string>
  background?: 'dove' | 'white' | 'black' | 'transparent' | string
  overlap?: boolean
  overflowHidden?: boolean
  variant?: 'dark'
}

const TitleTextBlock: FC<TitleTextBlockProps> = ({
  eyelet,
  preTitle,
  title,
  content,
  background = 'dove',
  overflowHidden,
  overlap,
  variant,
}) => {
  return (
    <SectionWrapper
      background={background}
      overlap={overlap}
      overflowHidden={overflowHidden}
      variant={variant}
    >
      <div className="lg:w-10/12">
        {eyelet ? (
          <h6 className="body-xs mb-6 lg:mb-8 font-sans font-semibold uppercase">
            {eyelet}
          </h6>
        ) : null}
        <h2 className="h2 italic font-sans">
          {preTitle ? (
            <span className="not-italic block">{preTitle}</span>
          ) : null}{' '}
          {title}
        </h2>
        {content ? (
          <div
            className="mt-6 lg:mt-8 grid space-y-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : null}
      </div>
    </SectionWrapper>
  )
}

export default TitleTextBlock
