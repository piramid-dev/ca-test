import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { MovieDataTableProps } from '../../Organisms/MovieDataTable/MovieDataTable'
import type { Maybe } from '../../../lib/generated'
import { useLocalizeLink } from '../../../hooks/useLocalizeLink'
import Button from '../../Atoms/Button'
import LinkBasic from '../../Atoms/LinkBasic'
import SectionWrapper from '../../Atoms/SectionWrapper'
import MovieDataTable from '../../Organisms/MovieDataTable'

type MovieTags = {
  to?: Maybe<string>
  label: string
}

type Directors = {
  to: string
  label: string
}

interface MovieIntroProps {
  directors: Directors[]
  eyelet?: Maybe<string>
  contentTitle?: Maybe<string>
  content?: Maybe<string>
  tags?: MovieTags[]
  movieTable?: MovieDataTableProps
}

const MovieIntro: FC<MovieIntroProps> = ({
  directors,
  eyelet,
  contentTitle,
  content,
  tags,
  movieTable,
}) => {
  const { t } = useTranslation()
  const { l } = useLocalizeLink()

  const directorsLink = directors.map((director) => ({
    label: director.label,
    to: l(director.to), // Localized link
  }))

  return (
    <SectionWrapper
      background="dove"
      overlap
      containerClass="lg:flex lg:justify-between"
    >
      <div className="max-lg:mb-12 lg:w-7/12">
        {eyelet ? (
          <h6 className="body-xs mb-2 font-sans font-semibold uppercase">
            {t(eyelet)}
          </h6>
        ) : null}
        <div className="mb-10">
          {directors
            ? directorsLink.map((director, index) => (
                <div key={index}>
                  <LinkBasic {...director} size="medium" />
                </div>
              ))
            : null}
        </div>
        {contentTitle ? (
          <h6 className="body-xs mb-2 font-sans font-semibold uppercase ">
            {contentTitle}
          </h6>
        ) : null}
        {content ? (
          <div
            className="mb-10 body-m"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        ) : null}
        {tags ? (
          <div>
            <h6 className="body-xs mb-3 font-sans font-semibold uppercase">
              {t('tag')}
            </h6>
            <div className="flex items-center gap-x-2">
              {tags.map((tag, i) => (
                <Button size="small" disabled key={i} {...tag} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="lg:w-4/12">
        {movieTable ? <MovieDataTable {...movieTable} /> : null}
      </div>
    </SectionWrapper>
  )
}

export default MovieIntro
