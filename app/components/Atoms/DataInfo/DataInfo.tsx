import type { FC } from 'react'
import classNames from 'classnames'
import { CheckCircle, XCircle, MinusCircle } from 'phosphor-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { removeProtocol } from '../../../lib/string.utils'
import type { Maybe } from '../../../lib/generated'

interface DataInfoProps {
  /**
   * Data name
   */
  data?: Maybe<string>

  /**
   * Data value
   */
  value?: Maybe<string>

  /**
   * Is the value a link?
   * @optional
   * @default false
   */
  valueIsLink?: boolean

  /**
   * Icon type
   * @optional
   * */
  icon?: 'CheckCircle' | 'XCircle' | 'MinusCircle'

  /**
   * Is the data blurred?
   * @optional
   * @default false
   */
  blurred?: boolean

  /**
   * Custom class
   */
  customClass?: string

  /**
   * Truncate or not?
   */
  truncate?: boolean
}

const DataInfo: FC<DataInfoProps> = ({
  data,
  value,
  valueIsLink = false,
  icon,
  blurred = false,
  customClass = '',
  truncate = false,
}) => {
  const iconType = {
    CheckCircle,
    XCircle,
    MinusCircle,
  }

  const { t } = useTranslation()

  if (value) {
    return (
      <div className="mt-4 first:mt-0">
        <div className="body-xs mb-2 flex flex-row items-center gap-[6px] font-sans font-semibold uppercase text-black text-left">
          {icon && iconType[icon]
            ? React.createElement(iconType[icon], {
                className: 'w-5 h-5 text-black/70',
              })
            : null}
          {t(data || '')}
        </div>
        <div
          className={classNames({
            'body-m font-semibold border-b border-black/20 pb-4 font-sans text-black':
              true,
            underline: valueIsLink,
            truncate: truncate,
            [customClass]: customClass,
          })}
        >
          <span
            className={classNames({
              'select-none blur whitespace-nowrap': blurred,
            })}
          >
            {valueIsLink ? (
              <a href={value} target="_blank" rel="noreferrer">
                {removeProtocol(value)}
              </a>
            ) : (
              value
            )}
          </span>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default DataInfo
