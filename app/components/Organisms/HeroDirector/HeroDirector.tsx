import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-datocms'
import type { ResponsiveImageType } from 'react-datocms'

import type { Maybe } from '~/lib/generated'
import type { ICardInfo } from '~/types/card-info'

import SectionWrapper from '~/components/Atoms/SectionWrapper'
import Button from '../../Atoms/Button'
import DataTable from '../DataTable'

interface HeroDirectorProps {
  firstname?: Maybe<string>
  lastname: string
  image: Maybe<ResponsiveImageType> | undefined
  directorInfo: ICardInfo[]
  bio?: Maybe<string>
}

const HeroDirector: FC<HeroDirectorProps> = ({
  firstname,
  lastname,
  image,
  bio,
  directorInfo,
}) => {
  const { t } = useTranslation()
  return (
    <SectionWrapper
      rounded={false}
      background="dove"
      containerClass="lg:flex lg:justify-between lg:gap-x-4"
    >
      <div className="lg:w-8/12 max-lg:mb-6 lg:pb-8">
        <h1 className="h1 font-sans">
          {firstname}
          <br />
          {lastname}
        </h1>
        <div className="flex items-center gap-x-6 pt-6 lg:pt-8 pb-16">
          <Button
            variant="outline"
            label={t('share')}
            icon="ShareNetwork"
            size="small"
          />
          <Button
            variant="outline"
            label={t('print')}
            icon="Printer"
            size="small"
          />
        </div>
        {bio ? (
          <div>
            <h6 className="body-xs font-sans font-semibold uppercase mb-4">
              {t('biography')}
            </h6>
            <div
              className="body-l font-sans grid space-y-4"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          </div>
        ) : null}
      </div>
      <div className="lg:w-3/12">
        <div className="overflow-hidden rounded-3xl mb-6">
          {image ? <Image data={image} /> : null}
        </div>
        <DataTable background="white" infos={directorInfo} />
      </div>
    </SectionWrapper>
  )
}

export default HeroDirector
