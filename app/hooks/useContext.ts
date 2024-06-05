import { useOutletContext } from '@remix-run/react'

import type { ContextType } from '~/types/globalTypes'

export const useContext = () => {
  return useOutletContext<ContextType>()
}
