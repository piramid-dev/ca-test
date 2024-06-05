import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { CaretDown } from 'phosphor-react'
import type { FC } from 'react'

import Tab from '../Tab'

interface AccordionFilterProps {
  /**
   * Title of the accordion
   */
  title: string

  /**
   * Is the accordion open?
   * @default false
   */
  defaultOpen: boolean

  /**
   * Children of the accordion
   */
  children: React.ReactNode

  /**
   * Info label of the accordion
   * @optional
   * @default ''
   */
  // infoLabel?: string | React.ReactNode

  locked?: boolean
  icon?:
    | 'GridFour'
    | 'FilmStrip'
    | 'GlobeHemisphereWest'
    | 'Timer'
    | 'Folders'
    | 'Folder'
    | 'Translate'
  infoLabel?: string
}

const AccordionFilter: FC<AccordionFilterProps> = ({
  title,
  defaultOpen = false,
  children,
  icon = 'GridFour',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const controls = useAnimation()

  const variants = {
    expanded: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  }

  useEffect(() => {
    if (isOpen) {
      controls.start('expanded')
    } else {
      controls.start('collapsed')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <div
      className={classNames({
        'lg:px-0 w-full accordion-filter rounded-lg transition-all ease-[cubic-bezier(0.04, 0.62, 0.23, 0.98)]':
          true,
        'bg-dove duration-300': isOpen,
        'duration-300': !isOpen,
      })}
    >
      <div
        className="flex items-center pr-3 justify-between rounded-lg hover:bg-dove active:bg-dove"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Tab icon={icon} label={title} />
        <CaretDown
          className={classNames({
            '-rotate-180 transform': isOpen,
            'rotate-0 transform': !isOpen,
            'w-4 transition-all duration-300': true,
          })}
        />
      </div>
      <motion.div
        initial={defaultOpen ? 'expanded' : 'collapsed'}
        className="z-0 overflow-y-hidden px-3"
        variants={variants}
        animate={controls}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <div className="py-2">{children}</div>
      </motion.div>
    </div>
  )
}

export default AccordionFilter
