import { useTranslation } from 'react-i18next'
import type { LoaderFunction } from '@remix-run/node'

import ErrorBlock from '../components/Errors/ErrorBlock'

export const loader: LoaderFunction = async () => {
  return new Response('Not Found', {
    status: 404,
  })
}

export default function PageNotFound(): JSX.Element {
  const { t } = useTranslation()
  return <ErrorBlock text={t('pageNotFound')} />
}
