import type { RefObject } from 'react'
import { useEffect } from 'react'

export function useOnHoverOutside(ref: RefObject<any>, handler: Function) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mouseover', listener)
    return () => {
      document.removeEventListener('mouseout', listener)
    }
  }, [ref, handler])
}
