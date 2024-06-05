import classNames from 'classnames'
import { motion } from 'framer-motion'
import { ArrowRight } from 'phosphor-react'
import type { FC } from 'react'
import { useState } from 'react'

import type { Maybe } from '~/lib/generated'

interface ButtonSpringProps {
  /**
   * Link label
   */
  label?: Maybe<string>
  children?: string
}

const ButtonSpring: FC<ButtonSpringProps> = ({ label = '', children = '' }) => {
  const [isHover, setIsHover] = useState(false)
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }

  return (
    <motion.div
      className={classNames({
        'flex w-fit items-center': true,
        'flex-row': !isHover,
        'flex-row-reverse underline': isHover,
      })}
      transition={spring}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <motion.div layout="position">
        <ArrowRight className="mr-2 h-5 w-5" />
      </motion.div>
      <motion.div layout="position">{label || children}</motion.div>
    </motion.div>
  )
}

export default ButtonSpring
