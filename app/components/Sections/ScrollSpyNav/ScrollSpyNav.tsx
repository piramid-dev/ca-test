import { Scrollspy } from '@makotot/ghostui'
import classNames from 'classnames'
import type { FC } from 'react'
import React, { Children, useMemo, createRef } from 'react'

import { useContext } from '../../../hooks/useContext'

interface ScrollSpyNavProps {
  /**
   * Sections labels to show in the nav
   */
  labels: Array<string>
  /**
   * Childrens
   */
  children?: React.ReactNode
}

const ScrollSpyNav: FC<ScrollSpyNavProps> = ({ children, labels }) => {
  if (React.isValidElement(children)) {
    children = children?.props.children
  } else {
    children = null
  }
  const { navIsOpen } = useContext() || { navIsOpen: false }
  const arrayChildren = Children.toArray(children)

  //   if (!React.isValidElement(children)) return

  // const sectionRefs = [
  //   useRef<HTMLDivElement>(null),
  //   useRef<HTMLDivElement>(null),
  //   useRef<HTMLDivElement>(null),
  //   useRef<HTMLDivElement>(null),
  //   useRef<HTMLDivElement>(null)
  // ];

  const sectionRefs = useMemo(
    () => arrayChildren.map((i) => createRef<HTMLUListElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <div className="relative">
      <Scrollspy sectionRefs={sectionRefs} offset={-100}>
        {({ currentElementIndexInViewport }) => (
          <>
            <div
              className={classNames(
                'sticky z-10 bg-black text-white/70 transition-all duration-200 ease-in-out',
                {
                  'top-0': !navIsOpen,
                  'top-[60px]': navIsOpen,
                },
              )}
            >
              <ul
                data-cy="nav-wrapper"
                className="body-m flex w-full list-none gap-x-8 overflow-auto whitespace-nowrap px-4 py-4 font-sans md:justify-center"
              >
                {labels.map((_, i) => (
                  <li
                    key={i}
                    className={classNames('inline-block', {
                      'text-white': currentElementIndexInViewport === i,
                    })}
                  >
                    {/* <span className="cursor-pointer" onClick={ () => sectionRefs[i]?.current?.scrollIntoView( { behavior: "smooth", block: "start", inline: "start" } ) }>{labels[i]} </span> */}
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        window.scrollTo({
                          behavior: 'smooth',
                          top:
                            sectionRefs[i].current!.getBoundingClientRect()
                              .top -
                            document.body.getBoundingClientRect().top -
                            70,
                        })
                      }
                    >
                      {labels[i]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-cy="section-wrapper" className="!bg-red-500">
              {arrayChildren.map((_, i) => (
                <ul
                  id={`section-${i}`}
                  key={i}
                  ref={sectionRefs[i]}
                  // className={
                  //   currentElementIndexInViewport === i ? "active" : ""
                  // }
                >
                  {arrayChildren[i]}
                </ul>
              ))}
            </div>
          </>
        )}
      </Scrollspy>
    </div>
  )
}

export default ScrollSpyNav
