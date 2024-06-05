import classNames from 'classnames'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

import type { Maybe } from '~/lib/generated'
import type { ICardInfo } from '~/types/card-info'

import DataInfo from '../../Atoms/DataInfo/DataInfo'
import ButtonIcon from '../../Atoms/ButtonIcon'

interface MovieDataTableProps {
  title?: Maybe<string>
  background?: 'white' | 'dove' | 'none'
  basicInfo: ICardInfo[]
  additionalInfos?: ICardInfo[]
  customClass?: string
  hasDivider?: boolean
}

const MovieDataTable: FC<MovieDataTableProps> = ({
  basicInfo,
  additionalInfos,
  customClass = '',
  background = 'none',
  hasDivider = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const controls = useAnimation()
  const variants = {
    expanded: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  }

  const onelines = basicInfo.slice(0, 4)
  const triplette = basicInfo.slice(4)

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
        'h-fit overflow-hidden rounded-xl border lg:max-w-md': true,
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
          {onelines.map((info, index) => (
            <DataInfo
              {...info}
              key={index}
              customClass={classNames({
                '!border-none': !hasDivider,
              })}
            />
          ))}
          {triplette?.length > 0 ? (
            <div className="md:flex gap-x-4 lg:w-full lg:justify-between">
              {triplette.map((info, index) => (
                <div className="md:w-1/2 mt-4" key={index}>
                  <DataInfo
                    {...info}
                    customClass={classNames({
                      '!border-none': !hasDivider,
                    })}
                  />
                </div>
              ))}
            </div>
          ) : null}

          {additionalInfos ? (
            <motion.div
              className="mt-4"
              initial="collapsed"
              variants={variants}
              animate={controls}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {additionalInfos?.map((info, index) => (
                <DataInfo
                  {...info}
                  key={index}
                  blurred={false}
                  customClass={classNames({
                    '!border-none !pb-0':
                      index === additionalInfos.length - 1 && isOpen,
                    '!border-none': !hasDivider,
                  })}
                />
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>
      {additionalInfos ? (
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
export type { MovieDataTableProps }
export default MovieDataTable
