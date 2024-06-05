import { useTranslation } from 'react-i18next'
import { useRouteError, isRouteErrorResponse } from '@remix-run/react'

import ErrorBlock from './ErrorBlock'

const ErrorBoundary = () => {
  const { t } = useTranslation()
  const error: any = useRouteError()
  console.log('--- Error', error)

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return <ErrorBlock text={t('pageNotFound')} /> // Page not found
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  return <ErrorBlock text={t('somethingWentWrong')} />
}

export default ErrorBoundary
