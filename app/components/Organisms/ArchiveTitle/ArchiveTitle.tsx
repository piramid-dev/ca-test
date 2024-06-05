import classNames from 'classnames'
import type { FC } from 'react'
import type { Maybe } from '../../../lib/generated'
import SectionWrapper from '../../Atoms/SectionWrapper'
interface ArchiveTitleProps {
  title: string
  content?: Maybe<string>
  color?: string
  image?: string
}

const ArchiveTitle: FC<ArchiveTitleProps> = ({
  title,
  content,
  color,
  image,
}) => {
  return (
    <SectionWrapper
      background={color ? color : 'white'}
      overflowHidden={false}
      rounded={false}
      sectionClass={classNames({
        'mb-8 md:mb-16': color,
        'max-md:min-h-[76vh] md:h-[76vh] ': color || image,
      })}
      containerClass="md:flex items-center justify-between gap-x-6 h-full"
    >
      <div
        className={classNames({
          'md:w-7/12': !color,
          'md:w-5/12': color || image,
        })}
      >
        <h1 className="h1 font-sans">{title}</h1>
        {content ? (
          <div
            className={classNames({
              'body-xl mt-4 font-serif': color,
              'body-xl font-semibold mt-4': !color,
            })}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : null}
      </div>
      {image ? (
        <div className="max-md:mt-12 md:w-5/12">
          <img
            src={image}
            className="w-full h-full object-cover aspect-square"
            alt={`Archive ${title}`}
          />
        </div>
      ) : null}
    </SectionWrapper>
  )
}

export default ArchiveTitle
