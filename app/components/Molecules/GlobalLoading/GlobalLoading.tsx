import type { FC } from 'react'
import { useNavigation } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'

const GlobalLoading: FC = () => {
  const transition = useNavigation()
  const showLoader = transition.state !== 'idle'

  const variants = {
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        key="global-loader"
        variants={variants}
        animate={showLoader ? 'show' : 'hide'}
        className="fixed pointer-events-none inset-0 w-screen h-screen bg-[#ececec] flex flex-col items-center justify-center z-[9999]"
      >
        <img src="/assets/loader2.gif" className="w-40" alt="" />
      </motion.div>
    </AnimatePresence>
  )
}

export default GlobalLoading
