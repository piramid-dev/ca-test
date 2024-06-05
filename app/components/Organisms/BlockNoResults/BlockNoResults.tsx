import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../Atoms/Button'

interface BlockNoResultsProps {
  onResetFiltersClick?: () => void
}

const BlockNoResults: FC<BlockNoResultsProps> = ({ onResetFiltersClick }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center w-full">
      <img
        src="/assets/wooops.gif"
        className="-rotate-45"
        style={{ clipPath: 'ellipse(30% 40% at 50% 50%)' }}
        alt="whoops"
      />

      <div className="my-8">
        <div className="font-sans h4 text-black text-center">
          {t('filter-no-results.title')}
        </div>
        <div className="font-sans body-m text-black/70">
          {t('filter-no-results.subtitle')}
        </div>
      </div>
      <Button
        variant="secondary"
        label={t('filter-no-results.cta')}
        onClick={onResetFiltersClick}
      />
    </div>
  )
}

export default BlockNoResults
