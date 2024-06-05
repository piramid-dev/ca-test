import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { Spinner } from 'phosphor-react'

interface InfiniteScrollerProps {
  children: any
  loading: boolean
  loadNext: () => void
}

const InfiniteScroller: FC<InfiniteScrollerProps> = ({
  children,
  loading,
  loadNext,
}) => {
  const scrollListener = useRef(loadNext)

  const onScroll = () => {
    const documentHeight = document.documentElement.scrollHeight
    const scrollDifference = Math.floor(window.innerHeight + window.scrollY)
    const footerHeight =
      document.getElementById('mainFooter')?.clientHeight || 0
    const scrollEnded = documentHeight - footerHeight < scrollDifference

    if (scrollEnded && !loading) {
      scrollListener.current()
    }
  }

  useEffect(() => {
    scrollListener.current = loadNext
  }, [loadNext])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {children}

      {loading ? (
        <div className="pt-24 container flex justify-center">
          <Spinner size={32} className="animate-spin-slow" />
        </div>
      ) : null}
    </>
  )
}

export default InfiniteScroller
