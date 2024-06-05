import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { Maybe } from '../../../lib/generated'
import Quote from '../../Organisms/Quote'
import SectionWrapper from '../../Atoms/SectionWrapper'

interface QuoteProps {
  quote: Maybe<string> | undefined
  eyelet?: string
  categoryColor: string | undefined
}
const DirectorQuote: FC<QuoteProps> = ({ quote, eyelet, categoryColor }) => {
  const { t } = useTranslation()
  const _eyelet = eyelet || t('moviePage.directorNotes')

  return (
    <SectionWrapper background={categoryColor || '#cccccc'}>
      <Quote eyelet={_eyelet} quote={quote || ''} />
    </SectionWrapper>
  )
}
export default DirectorQuote
