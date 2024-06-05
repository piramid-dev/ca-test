import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { CaretDown } from 'phosphor-react'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@remix-run/react'

import { useOnHoverOutside } from '../../../hooks/useOnHoverOutside'

interface DropdownProps {
  /**
   * Dropdown label
   */
  label: string

  /**
   * Dropdown contents
   */
  children: React.ReactNode

  /**
   * Is dropdown open
   */
  isClosed?: boolean

  /**
   * Dropdown variant
   */
  variant?: 'light' | 'dark'

  /**
   * Dropdown variant
   */
  hasSubMenuPanel?: boolean

  additionalClasses?: string

  icon?: React.ReactNode

  smallSubMenuPanel?: boolean

  rightAlign?: boolean

  centertAlign?: boolean

  centerAlign?: boolean

  showCaret?: boolean
}
const Dropdown: FC<DropdownProps> = ({
  label,
  children,
  isClosed,
  variant = 'light',
  hasSubMenuPanel = false,
  additionalClasses = '',
  icon,
  smallSubMenuPanel,
  rightAlign = false,
  centerAlign = false,
  showCaret = true,
}) => {
  const dropdownRef = useRef<any>(null)
  const [isHover, setIsHover] = useState(false)
  const navigation = useNavigation()

  if (isHover && navigation.state !== 'idle') {
    setIsHover(false)
  }

  useOnHoverOutside(dropdownRef, () => {
    setIsHover(false)
  })

  useEffect(() => {
    isClosed && setIsHover(false)
  }, [isClosed])

  function removePanel() {
    setIsHover(false)
    //setScrollY(window.pageYOffset);
    //console.log(new Date().getTime());
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', removePanel)
    }
    watchScroll()
    return () => {
      window.removeEventListener('scroll', removePanel)
    }
  })

  return (
    <div className={' group z-50 ' + additionalClasses} ref={dropdownRef}>
      <div
        onMouseEnter={() => {
          setIsHover(true)
        }}
      >
        <span
          className={classNames({
            'flex w-fit cursor-pointer flex-row items-center rounded-xl px-2 py-1 relative':
              true,
            'bg-dove': isHover,
          })}
        >
          <span className="body-xs font-semibold font-sans min-w-[1.4em] text-right flex flex-row items-center">
            {label} {icon}
          </span>
          {showCaret ? (
            <CaretDown
              className={classNames({
                'ml-1 h-3 w-3 transition-all duration-300': true,
                '-rotate-180': isHover,
              })}
            />
          ) : null}

          {hasSubMenuPanel ? (
            <AnimatePresence>
              {isHover ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 z-50 bottom-[-18px] transform-y-full "
                >
                  <svg
                    className=""
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 1L1 7H13L7 1Z" fill="#ECECE5" />
                    <path d="M1 7L7 1L13 7" stroke="black" />
                  </svg>
                </motion.div>
              ) : null}
            </AnimatePresence>
          ) : null}
        </span>
        <AnimatePresence>
          {isHover ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=""
            >
              {hasSubMenuPanel ? (
                <div className="absolute w-full pointer-events-none left-0">
                  <div
                    className={classNames({
                      'mx-auto pointer-events-auto pt-4': true,
                      'w-9/12': !smallSubMenuPanel,
                      'w-1/3': smallSubMenuPanel,
                    })}
                  >
                    <div className="bg-dove flex flex-row items-center justify-center border border-black rounded-xl overflow-hidden">
                      {children}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={classNames({
                    'absolute mt-2 border border-black/20 rounded-xl overflow-hidden bg-white':
                      true,
                    'right-0': rightAlign,
                    'left-1/2 -translate-x-1/2': centerAlign,
                  })}
                >
                  {children}
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Dropdown
