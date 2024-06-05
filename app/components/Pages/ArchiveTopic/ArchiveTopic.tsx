import { useTranslation } from 'react-i18next'
import type { FC } from 'react'
import type { Maybe, MovieRecord } from '~/lib/generated'
import type { IFilterData, ISortOption } from '~/types/filter.interface'

import DropdownOrder from '~/components/Molecules/DropdownOrder'
import ArchiveTitle from '~/components/Organisms/ArchiveTitle'
import FiltersBlock from '~/components/Sections/FiltersBlock'
import Card from '../../Organisms/Card'

interface FilterProps {
  title: string
  color: string
  content?: Maybe<string>
  image?: string
  movies: MovieRecord[]
  filters: IFilterData[]
}

const ArchiveTopic: FC<FilterProps> = ({
  title,
  color,
  content = '',
  image,
  movies,
  filters,
}) => {
  const { t } = useTranslation()

  const sortOptions: ISortOption[] = [
    {
      name: 'year',
      label: t('filtersLabels.yearAsc'),
      alphabetically: false,
      direction: 'asc',
    },
    {
      name: 'year',
      label: t('filtersLabels.yearDesc'),
      alphabetically: false,
      direction: 'desc',
    },
    {
      name: 'originalTitle',
      label: 'A - Z',
      alphabetically: true,
      direction: 'asc',
    },
    {
      name: 'originalTitle',
      label: 'Z - A',
      alphabetically: true,
      direction: 'desc',
    },
  ]

  return (
    <>
      <ArchiveTitle
        title={title}
        content={content}
        color={color}
        image={image}
      />
      <div className="container">
        <FiltersBlock filters={filters} color={color} />

        <div className="flex justify-between items-center gap-x-4 gap-y-3 my-6 lg:mt-16 lg:mb-10">
          <span className="body-s font-semibold text-black/70 uppercase">
            {movies.length} {t('totalMovies')}
          </span>
          <DropdownOrder options={sortOptions} />
        </div>
        <div className="flex flex-wrap -mx-3 lg:-mx-6 gap-y-4 lg:gap-y-6 ">
          {movies
            ? movies.map((el) => (
                <div key={el.id} className="w-1/2 lg:w-1/4 px-1.5 lg:px-3">
                  <Card
                    customClass="h-full"
                    to={el.slug}
                    title={el.originalTitle}
                    image={el.cover.responsiveImage}
                    {...el}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  )
}

export default ArchiveTopic
