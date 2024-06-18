// import type { LoaderFunctionArgs } from '@remix-run/node'

// import routes from '~/pages/_routes.js'
// // @ts-ignore
// import products from './../json/product.json'

// type Route = {
//   path: string
//   originalPath: string
//   component: string
// }

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const staticSlugs = routes
//     .flatMap((route: Route) => {
//       if (route.originalPath.includes(':slug')) return { slug: '' }
//       return [{ slug: route.originalPath }, { slug: route.path }]
//     })
//     .filter((el) => el.slug !== '')

//   // At the moment we have just the italian product in product.json
//   const productsSlugs = products.flatMap((product: any) => {
//     const localizeSlug = (locale: string) =>
//       product.families[0]._allSlugLocales.filter(
//         (family: { locale: string; value: string }) => family.locale === locale,
//       )[0]
//     const typeEn = localizeSlug('en').value.split('/')[0]
//     const typeIt = localizeSlug('it').value.split('/')[0]

//     return [
//       { slug: `/skialper/products/${typeEn}/${product.slug}` },
//       { slug: `/it/skialper/prodotti/${typeIt}/${product.slug}` },
//     ]
//   })

//   const slugs = [...staticSlugs, ...productsSlugs]

//   return new Response(renderXML(slugs), {
//     headers: {
//       'Content-Type': 'application/xml; charset=utf-8',
//       'x-content-type-options': 'nosniff',
//       'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
//     },
//   })
// }

// const renderXML = (slugs: { slug?: string }[]) => {
//   const url = 'https://thebuyersguide.it'

//   const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${slugs.filter(Boolean).map(
//       (item) => `<url>
//       <loc>${url}${item.slug}</loc>
//     </url>`,
//     )}
//   </urlset>`

//   return sourceXML
// }
