import type { FC } from 'react'

import { useTranslation } from 'react-i18next'
import type { ResponsiveImageType } from 'react-datocms'
import { Image } from 'react-datocms'
import type { Maybe } from '~/lib/generated'
import Button from '../../Atoms/Button'

type HeroTags = {
  to?: Maybe<string>
  label: string
}

interface HeroMovieProps {
  title: string
  image: Maybe<ResponsiveImageType> | undefined
  mainCategory?: { label?: string; color?: string; url?: string } | null
  tags?: HeroTags[]
  movieLink?: Maybe<string>
  trailerLink?: Maybe<string>
  kit?: Maybe<string>
}

const HeroMovie: FC<HeroMovieProps> = ({
  title,
  image,
  mainCategory,
  tags,
  movieLink,
  trailerLink,
  kit,
}) => {
  const { t } = useTranslation()

  return (
    <section className="h-screen md:h-[80vh] lg:h-[80vh] bg-cover relative max-lg:pb-16">
      {image ? (
        <div className="absolute top-0 w-full h-full">
          <Image
            data={image}
            objectFit="cover"
            layout="fill"
            objectPosition="center"
          />
        </div>
      ) : null}
      <span className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30" />
      <div className="container py-4 lg:py-16 flex flex-col justify-between h-full relative">
        {mainCategory ? (
          <div className="flex items-center gap-x-3 gap-y-3 lg:gap-x-2 lg:gap-y-2 flex-wrap">
            <Button
              label={mainCategory.label}
              color={mainCategory.color}
              to={mainCategory.url}
              variant="dot"
              size="small"
            />
            {tags
              ? tags.map((el, i) => (
                  <Button
                    key={i}
                    {...el}
                    size="small"
                    variant="outline"
                    color="white"
                  />
                ))
              : null}
          </div>
        ) : null}
        {movieLink ? (
          <div className="text-center">
            <Button
              label={t('playMovie')}
              variant="outline"
              color="white"
              icon="Play"
              to={movieLink}
            />
          </div>
        ) : null}
        <div className="text-white max-lg:-mt-10">
          <h1 className="font-serif h1">{title}</h1>
          <div className="mt-4 md:flex md:justify-between flex-wrap">
            <div className="flex items-center gap-y-2 gap-x-2 lg:gap-x-5">
              {trailerLink ? (
                <Button
                  variant="outline"
                  color="white"
                  to={trailerLink}
                  label={t('trailer')}
                  icon="Play"
                  size="small"
                />
              ) : null}
              <Button
                variant="outline"
                color="white"
                label={t('save')}
                icon="BookmarkSimple"
                size="small"
              />
              <Button
                variant="outline"
                color="white"
                label={t('share')}
                icon="ShareNetwork"
                size="small"
              />
            </div>
            <div className="flex items-center gap-x-2 gap-y-2 lg:gap-x-5 max-lg:mt-2 flex-wrap">
              <Button
                variant="outline"
                color="white"
                label={t('print')}
                icon="Printer"
                size="small"
              />
              {kit ? (
                <Button
                  variant="outline"
                  color="white"
                  to={kit}
                  label={t('kit')}
                  icon="DownloadSimple"
                  size="small"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroMovie
