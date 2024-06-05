import type { DirectorRecord, ResponsiveImage } from '~/lib/generated'
import type { IFilterData } from '~/types/filter.interface'
import type { IDirectorData } from '~/types/director.interface'

export const directorCard = (director: DirectorRecord) => {
  const { id, firstName, lastName, countries, photo, slug } = director

  const defaultImage = {
    src: '/assets/avatar.jpeg',
    width: 350,
  } as ResponsiveImage

  return {
    id,
    eyelet: countries?.map((nation) => nation).join(', '),
    firstName: firstName || null,
    lastName: lastName || null,
    image: photo ? photo.responsiveImage : defaultImage,
    to: `/directors/${slug}`,
  }
}

// Get directors url
export const getDirectorUrl = ({
  baseUrl = '',
  locale = 'en',
  page = 1,
  paramsString,
}) => {
  return `${baseUrl}/api/get-directors/${locale}/${page}/${paramsString}`
}

// Get all directors url
export const getAllDirectorsUrl = ({ baseUrl = '', locale, page = 'all' }) => {
  return `${baseUrl}/api/get-directors/${locale}/${page}/`
}

// Get directors from the /api/get-directors
export const getDirectors = async ({
  baseUrl,
  locale,
  page = 1,
  paramsString,
}) => {
  const directors: IDirectorData = await fetch(
    getDirectorUrl({ baseUrl, locale, page, paramsString }),
  ).then((res) => res.json())

  return directors
}

// Get director filters
export const getDirectorFilters = async ({ baseUrl, locale }) => {
  const filters: IFilterData[] = await fetch(
    `${baseUrl}/api/get-director-filters/${locale}/`,
  ).then((res) => res.json())

  return filters
}
