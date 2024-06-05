import { CaretRight } from '@phosphor-icons/react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { useLocalizeLink } from '../../../hooks/useLocalizeLink'

interface BreadcrumbsProps {
  /**
   * Breadcrumbs pages
   * @default []
   */
  pages: { name: string; href: string }[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ pages }) => {
  const { t } = useTranslation()
  const { l } = useLocalizeLink()
  return (
    <nav
      className="w-full border-b border-t border-black py-2 relative z-50 bg-white"
      aria-label="Breadcrumb"
    >
      <div className="container">
        <ol className="flex items-center">
          {pages.map((page) => {
            if (page.name !== '' && page.href) {
              return (
                <li key={page.name} className="flex flex-row items-center">
                  <div>
                    <a
                      href={l(page.href)}
                      className="body-s hover:text-gray-700 font-sans font-semibold text-black"
                    >
                      {t(page.name)}
                    </a>
                  </div>
                  <CaretRight
                    className="mx-2 w-2 shrink-0 text-black"
                    aria-hidden="true"
                  />
                </li>
              )
            }

            return null
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumbs
