import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Check } from 'phosphor-react'

import ButtonIcon from '../../Atoms/ButtonIcon'

interface ShareButtonsProps {}
const ShareButtons: FC<ShareButtonsProps> = () => {
  const app_id = '967328664358413' // this app id owner is ale.vals@libero.it
  const sharerRef = useRef<any>(null)
  const controls = useAnimation()
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    sharerRef?.current?.appendChild(script)
  }, [])

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/dialog/share?app_id=${app_id}&display=popup&href=${window.location.href}`,
      'Share on',
      `width=600,height=400,left=${(window.innerWidth - 600) / 2},top=${
        (window.innerHeight - 400) / 4
      }`,
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${window.location.href}`,
      'Share on',
      `width=600,height=400,left=${(window.innerWidth - 600) / 2},top=${
        (window.innerHeight - 400) / 4
      }`,
    )
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    console.log(navigator.clipboard)
    controls.start('visible')
  }

  const shareOnMobile = async () => {
    try {
      await navigator.share({
        url: window.location.href,
      })
    } catch (err) {}
  }

  return (
    <div
      ref={sharerRef}
      className="flex justify-center items-center gap-x-2 py-6 lg:py-4 font-sans display-s"
    >
      <ButtonIcon icon="FacebookLogo" onClick={shareOnFacebook} />
      <ButtonIcon icon="TwitterLogo" onClick={shareOnTwitter} />
      <div className="relative hidden lg:inline-block">
        <ButtonIcon icon="ShareNetwork" onClick={copyLink} />
        <motion.span
          initial="hidden"
          variants={variants}
          animate={controls}
          transition={{
            duration: 0.8,
            ease: [0.04, 0.62, 0.23, 0.98],
            repeat: 1,
            repeatType: 'reverse',
          }}
          className="rounded-md bg-black/80 text-white body-xs font-sans px-3 py-1 flex items-center absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
        >
          <Check className="mr-1 " color="#14AE5C" size={14} />
          Link copiato
        </motion.span>
      </div>
      <ButtonIcon
        icon="ShareNetwork"
        extraClasses="lg:hidden"
        onClick={shareOnMobile}
      />
    </div>
  )
}
export default ShareButtons
