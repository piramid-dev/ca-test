import { useAnimation, useIsPresent } from 'framer-motion'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import ButtonIcon from '~/components/Atoms/ButtonIcon'
interface QuoteProps {
  quote: string
  eyelet?: string
  wordLimit?: number
}
const Quote: FC<QuoteProps> = ({ quote, eyelet, wordLimit = 30 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const controls = useAnimation()
  const originalQuote = quote
  const words = quote.split(/\s+/)
  const content =
    words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : quote
  const [currentContent, setCurrentContent] = useState(content)

  useEffect(() => {
    if (isOpen) {
      controls.start('expanded')
      setCurrentContent(originalQuote)
    } else {
      controls.start('collapsed')
      setCurrentContent(content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const isPresent = useIsPresent()
  useEffect(() => {
    !isPresent && console.log("I've been removed!")
  }, [isPresent])
  return (
    <div className="container text-center lg:min-h-335px] flex flex-col items-center justify-center gap-6 py-16 overflow-hidden">
      {eyelet ? (
        <div className="uppercase body-s semibold">{eyelet}</div>
      ) : null}
      {words.length > wordLimit ? (
        <div
          className="overflow-hidden font-sans body-xl font-semibold space-y-4 grid"
          dangerouslySetInnerHTML={{ __html: currentContent }}
        ></div>
      ) : (
        <div
          className="font-sans body-xl font-semibold space-y-4 grid"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {words.length > wordLimit ? (
        <ButtonIcon
          icon={isOpen ? 'CaretUp' : 'CaretDown'}
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
        />
      ) : null}
    </div>
  )
}
export default Quote
