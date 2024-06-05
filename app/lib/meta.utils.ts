import type { MovieRecord, DirectorRecord } from '~/lib/generated'

export const metaFromMovie = (movie: MovieRecord) => {
  const {
    originalTitle,
    // internationalTitle,
    // localizedTitle,
    abstract,
    plot,
    // director,
    // slug,
    // topics,
    cover,
  } = movie

  let title = originalTitle
  title += ' - CinemAmbiente Media'

  return [
    { title: title },
    {
      property: 'og:title',
      content: title,
    },
    {
      name: 'description',
      content: abstract ? abstract : plot?.substring(0, 160),
    },
    {
      property: 'og:image',
      content: cover?.responsiveImage?.src,
    },
  ]
}

export const metaFromDirector = (director: DirectorRecord) => {
  const { fullName, bio, photo } = director

  let title = fullName
  title += ' - CinemAmbiente Media'

  return [
    { title },
    {
      property: 'og:title',
      content: title,
    },
    {
      name: 'description',
      content: bio ? bio?.substring(0, 160) : '',
    },
    {
      property: 'og:image',
      content: photo?.responsiveImage?.src,
    },
  ]
}

// export const metaFromArticle = (article: ArticleRecord, common: any) => {
//   const { title: articleTitle, metadata } = article || {}

//   const hero = article?.modules?.find(
//     (module: ArticleModelModulesField) => module.__typename === 'HeroRecord',
//   ) as HeroRecord

//   let title = metadata ? metadata.title : articleTitle
//   title += ` - ${common.blogHeading}`
//   title += " - The Skialper Buyer's Guide"
//   const description = metadata ? metadata.description : ''

//   const media =
//     metadata && metadata.image
//       ? metadata.image.responsiveImage?.src
//       : hero?.image?.responsiveImage?.src
//   return [
//     { title: title },
//     {
//       property: 'og:title',
//       content: title,
//     },
//     {
//       property: 'og:image',
//       content: media,
//     },
//     {
//       name: 'description',
//       content: description,
//     },
//   ]
// }

// type ILocation = {
//   pathname: string
//   search: string
// }

// export const metaFromFamily = (
//   family: ProductFamilyRecord,
//   location: ILocation,
// ) => {
//   const { name, _allReferencingScopes } = family
//   let title = name

//   if (_allReferencingScopes && _allReferencingScopes.length > 0) {
//     title += ` - ${_allReferencingScopes[0].name}`
//   }
//   title += " - The Skialper Buyer's Guide"

//   const metas = [
//     { title: title },
//     {
//       property: 'og:title',
//       content: title,
//     },
//     {
//       name: 'description',
//       content: family.description,
//     },
//     {
//       name: 'og:image',
//       content: family.image?.responsiveImage?.src,
//     },
//     {
//       tagName: '',
//       rel: '',
//       href: '',
//     },
//   ]

//   if (location) {
//     metas.push({
//       tagName: 'link',
//       rel: 'canonical',
//       href: location.pathname + location.search,
//     })
//   }

//   return metas
// }

// export const metaFromPerson = (person: PersonRecord, common: any) => {
//   const { name, description } = person

//   let title = name
//   title += ` - ${common.teamHeading}`
//   title += " - The Skialper Buyer's Guide"

//   return [
//     { title: title },
//     {
//       property: 'og:title',
//       content: title,
//     },
//     {
//       name: 'description',
//       content: description,
//     },
//   ]
// }
