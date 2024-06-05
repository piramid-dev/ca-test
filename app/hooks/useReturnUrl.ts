import { useLocalizeLink } from './useLocalizeLink'

export const useReturnUrl = () => {
  const { l } = useLocalizeLink()
  const currentUrl =
    typeof window !== 'undefined' ? window.location.pathname : ''
  const currentSearch =
    typeof window !== 'undefined' ? window.location.search : ''

  const notNeedReturn =
    currentUrl === l('/login') ||
    currentUrl === l('/password-recovery') ||
    currentUrl === l('/subscription') ||
    currentUrl.endsWith('skialper') ||
    currentUrl.endsWith('skialper/')

  const returnUrl = encodeURIComponent(`${currentUrl}${currentSearch}`)

  return notNeedReturn
    ? l('/login')
    : encodeURI(`${l('/login')}?returnUrl=${returnUrl}`)
}
