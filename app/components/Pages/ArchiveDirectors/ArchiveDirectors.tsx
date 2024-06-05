import { useTranslation } from 'react-i18next'
import type { FC } from 'react'
import type { DirectorRecord, Maybe } from '~/lib/generated'
import type { IFilterData } from '~/types/filter.interface'

import ArchiveTitle from '~/components/Organisms/ArchiveTitle'
import FiltersBlock from '~/components/Sections/FiltersBlock'
import Card from '../../Organisms/Card'

interface FilterProps {
  title: string
  content?: Maybe<string>
  directors: DirectorRecord[]
  filters: IFilterData[]
}

const ArchiveDirectors: FC<FilterProps> = ({
  title,
  content = '',
  directors,
  filters,
}) => {
  const { t } = useTranslation()

  const directorsByLetter = directors.reduce<Record<string, DirectorRecord[]>>(
    (acc, el) => {
      const firstLetter = el.lastName ? el.lastName[0].toUpperCase() : ''

      if (firstLetter) {
        if (!acc[firstLetter]) {
          acc[firstLetter] = []
        }
        acc[firstLetter].push(el)
      }

      return acc
    },
    {},
  )

  return (
    <>
      <ArchiveTitle title={title} content={content} />
      <div className="container">
        <FiltersBlock filters={filters} />
        <div className="flex justify-between items-center gap-x-4 gap-y-3 my-6 lg:mt-16 lg:mb-10">
          <span className="body-s font-semibold text-black/70 uppercase">
            {directors.length} {t('total_directors')}
          </span>
        </div>

        {Object.keys(directorsByLetter)
          .sort()
          .map((letter) => (
            <div className="my-8 lg:my-10" key={letter}>
              <span className="rounded-full bg-primary text-black mb-6 h-8 w-8 lg:h-12 lg:w-12 inline-block h4 font-sans text-center !leading-[32px] lg:!leading-[48px]">
                {letter}
              </span>
              <div className="flex flex-wrap -mx-3 lg:-mx-6 gap-y-4 lg:gap-y-6 ">
                {directorsByLetter[letter].map((el) => (
                  <div key={el.id} className="w-1/2 lg:w-1/4 px-1.5 lg:px-3">
                    <Card
                      customClass="h-full"
                      to={el.slug || ''}
                      image={el.photo?.responsiveImage}
                      firstName={el.firstName || ''}
                      lastName={el.lastName}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default ArchiveDirectors
