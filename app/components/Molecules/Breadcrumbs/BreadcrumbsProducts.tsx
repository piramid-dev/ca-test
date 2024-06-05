import type { FC } from 'react'

import Breadcrumbs from '~/components/Molecules/Breadcrumbs/Breadcrumbs'

interface BreadcrumbsProductsProps {
  /**
   * Family name
   * @default ''
   */
  familyName?: string
  /**
   * Family slug
   * @default ''
   */
  familySlug?: string
  scopeName?: string
  scopeSlug?: string
}

const BreadcrumbsProducts: FC<BreadcrumbsProductsProps> = ({
  familyName,
  familySlug = '',
  scopeName,
  scopeSlug = '',
}) => {
  const breadcrumbs = [
    {
      name: 'products',
      href: '/products',
    },
    {
      name: scopeName || '',
      href: scopeSlug ? `/scopes/${scopeSlug}` : '#',
    },
    {
      name: familyName || '',
      href: familySlug ? `/products/${familySlug}` : '#',
    },
  ]

  return <Breadcrumbs pages={breadcrumbs} />
}

export default BreadcrumbsProducts
