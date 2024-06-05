import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { XCircle } from 'phosphor-react'
import { useCookies } from 'react-cookie'

import type { Maybe } from '~/lib/generated'

interface SiteTopBarProps {
  content?: Maybe<string>
}

const SiteTopBar: FC<SiteTopBarProps> = ({ content }) => {
  const [cookies, setCookie] = useCookies(['topBar'])
  const [showTopBar, setShowTopBar] = useState(false)

  useEffect(() => {
    setShowTopBar(cookies.topBar === 'closed' ? false : true)
  }, [cookies])

  const handleCloseClick = (event: any) => {
    //event.stopPropagation()
    setCookie('topBar', 'closed', { path: '/', maxAge: 259200 }) // 3 days
    setShowTopBar(false)
  }
  if (!content || !showTopBar) return null
  return (
    <>
      {content ? (
        <div className="site-top-bar bg-black text-white text-center font-sans body-s relative">
          <div className="container py-1">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <XCircle
            className="absolute top-px right-2 cursor-pointer opacity-70 hover:opacity-100"
            size="24"
            onClick={handleCloseClick}
          />
        </div>
      ) : null}
    </>
  )
}

export default SiteTopBar
