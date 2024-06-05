import type { FC, ReactNode } from 'react'
import { Children, useMemo, createRef, isValidElement } from 'react'
import classNames from 'classnames'
import { Scrollspy } from '@makotot/ghostui'
import { useTranslation } from 'react-i18next'
import { Form } from '@remix-run/react'

import { useContext } from '../../../hooks/useContext'
import Button from '../../Atoms/Button/Button'

interface UserProfileProps {
  /**
   * Sections labels to show in the nav
   */
  labels: Array<string>
  children?: ReactNode
}
const UserProfile: FC<UserProfileProps> = ({ children, labels }) => {
  if (isValidElement(children)) {
    children = children?.props.children
  } else {
    children = null
  }
  const arrayChildren = Children.toArray(children)
  const sectionRefs = useMemo(
    () => arrayChildren.map((i) => createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const { navIsOpen } = useContext() || { navIsOpen: false }
  const { t } = useTranslation()
  const { locale } = useContext()

  return (
    <section className="bg-dove-500">
      <div className="container">
        <div className="lg:flex py-6 lg:py-20 relative lg:gap-x-6 lg:mr-0 px-0">
          <div className="lg:hidden py-12 px-4">
            <h4 className="font-sans h3 mb-4">{t('welcome_account')}</h4>
            {t('notYou?')}
            <Form action="/logout" method="post" className="inline-block ml-3">
              <Button variant="secondary" type="submit">
                {t('logout')}
              </Button>
            </Form>
          </div>
          <div
            className={classNames(
              'sticky lg:w-3/12 lg:px-6 z-20 transition-all duration-200 ease-in-out mb-auto',
              {
                'top-0 lg:top-[12px]': !navIsOpen,
                'top-[60px] lg:top-[72px]': navIsOpen,
              },
            )}
          >
            <Scrollspy sectionRefs={sectionRefs} offset={-100}>
              {({ currentElementIndexInViewport }) => (
                <div className="lg:p-4 lg:bg-dove-300 lg:border lg:border-black lg:rounded-lg ">
                  <h4 className="hidden lg:block font-sans h4 lg:h4 max-lg:pb-12 max-lg:px-4">
                    {t('welcome_account')}
                  </h4>
                  <ul
                    data-cy="sidenav-wrapper"
                    className="py-3 lg:py-10 lg:-mx-4 pl-4 max-lg:flex max-lg:items-center max-lg:overflow-auto bg-black lg:bg-transparent lg:border-b border-black/40"
                  >
                    {labels.map((_, i) => (
                      <li
                        key={i}
                        className={classNames(
                          'block max-lg:px-2 font-sans body-f lg:font-bold',
                          {
                            ' text-white lg:text-black':
                              currentElementIndexInViewport === i,
                            'text-white/70 lg:text-black/70 ':
                              currentElementIndexInViewport !== i,
                            'lg:pb-6 ': i !== labels.length - 1,
                          },
                        )}
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
                  <div className="max-lg:hidden mt-10 -ml-3">
                    <Form
                      action={locale === 'it' ? '/it/logout' : '/logout'}
                      method="post"
                    >
                      <Button type="submit" variant="outline">
                        {t('logout')}
                      </Button>
                    </Form>
                  </div>
                </div>
              )}
            </Scrollspy>
          </div>
          <div
            data-cy="section-wrapper"
            className="lg:border-l lg:border-black/40 lg:w-9/12"
          >
            {arrayChildren.map((_, i) => (
              <div
                id={`section-${i}`}
                key={i}
                ref={sectionRefs[i]}
                // className={
                //   currentElementIndexInViewport === i ? "active" : ""
                // }
              >
                {arrayChildren[i]}
                {i !== arrayChildren.length - 1 ? (
                  <div className="divider h-[1px] lg:bg-black/40 my-16 lg:mx-12" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default UserProfile
