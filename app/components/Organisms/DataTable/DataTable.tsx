import classNames from 'classnames'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

import type { Maybe } from '~/lib/generated'
import type { ICardInfo } from '~/types/card-info'

import DataInfo from '../../Atoms/DataInfo/DataInfo'
import ButtonIcon from '../../Atoms/ButtonIcon'

interface DataTableProps {
  title?: Maybe<string>
  background?: 'white' | 'dove' | 'none'
  infos: ICardInfo[]
  customClass?: string
  hasDivider?: boolean
}

const DataTable: FC<DataTableProps> = ({
  infos,
  customClass = '',
  background = 'none',
  hasDivider = true,
}) => {
  const showMore = infos.length > 5
  const [isOpen, setIsOpen] = useState(false)
  const rows = infos.slice(0, 5)
  const additionalRows = infos.slice(5)
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
        'h-fit overflow-hidden rounded-xl border border-black/20 max-w-md':
          true,
        [customClass]: customClass,
        'bg-dove-300': background === 'dove',
        'bg-white': background === 'white',
      })}
    >
      <div className="py-4 w-full">
        <div
          className={classNames({
            'relative px-4': true,
          })}
        >
          {rows.map((info, index) => (
            <DataInfo
              {...info}
              key={index}
              blurred={false}
              customClass={classNames({
                '!border-none !pb-0': index === rows.length - 1 && !showMore,
                '!border-none': !hasDivider,
              })}
            />
          ))}

          {additionalRows?.length > 0 ? (
            <motion.div
              className="mt-4"
              initial="collapsed"
              variants={variants}
              animate={controls}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {additionalRows?.map((info, index) => (
                <DataInfo
                  {...info}
                  key={index}
                  blurred={false}
                  customClass={classNames({
                    '!border-none !pb-0': index === rows.length - 1 && isOpen,
                    '!border-none': !hasDivider,
                  })}
                />
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>
      {showMore ? (
        <div className="text-center mb-4">
          <ButtonIcon
            icon="CaretDown"
            variant="outline"
            extraClasses={classNames({
              '-rotate-180 transform': isOpen,
              'rotate-0 transform': !isOpen,
              'transition-all duration-300': true,
            })}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      ) : null}
    </div>
  )
}

export default DataTable
