import classNames from 'classnames'
import type { FC } from 'react'
// import { useTranslation } from 'react-i18next'
import { Link } from '@remix-run/react'
import { useEffect, useState } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import { User, SignOut } from '@phosphor-icons/react'

// import { useReturnUrl } from '~/hooks/useReturnUrl'

import { useLocalizeLink } from '../../../hooks/useLocalizeLink'
// import Button from '../../Atoms/Button/Button'
// import LinkBasic from '../../Atoms/LinkBasic/LinkBasic'
import Dropdown from '../../Atoms/Dropdown/Dropdown'
// import SiteNavMobile from '../SiteNavMobile/SiteNavMobile'
// import Search from '../../Organisms/Search'
import Logo from '../../Atoms/Logo/Logo'

interface SiteNavProps {
  navIsOpen: boolean
  navIsVisible: boolean
  user: Object
  validPass: boolean
  locale: string
  page_url_it?: string
  page_url_en?: string
  additionalNavClass?: string
}

const SiteNav: FC<SiteNavProps> = ({
  navIsOpen,
  navIsVisible,
  // user,
  // validPass,
  locale,
  page_url_it = '/',
  page_url_en = '/en/',
  additionalNavClass = '',
}) => {
  // const { t } = useTranslation()
  const { l } = useLocalizeLink()

  const [isLangDropdownClosed, setIsLangDropdownClosed] = useState(false)
  const [dropdownLabel, setDropdownLabel] = useState(locale?.toUpperCase())
  // const [menuMobileVisibility, setMenuMobileVisibility] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSearch, setShowSearch] = useState(false)

  function handleOnToggleMobileMenu() {
    // setMenuMobileVisibility((menuMobileVisibility) => !menuMobileVisibility)
  }

  const handleSelectedOptions = (option: string) => {
    setIsLangDropdownClosed(true)
    setDropdownLabel(option)
    setTimeout(() => setIsLangDropdownClosed(false))
  }

  // Remove scroll on body when search is open
  useEffect(() => {
    document.body.style.overflow = showSearch ? 'hidden' : ''
  }, [showSearch])

  // const loginUrl = useReturnUrl()

  return (
    <>
      <nav className="bg-white w-full relative h-[100px] z-1000">
        <div className="container relative h-full">
          <div className="relative h-full flex justify-center items-center">
            <div className="lg:hidden mr-4" onClick={handleOnToggleMobileMenu}>
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.75 9C23.75 9.19891 23.671 9.38968 23.5303 9.53033C23.3897 9.67098 23.1989 9.75 23 9.75H1C0.801088 9.75 0.610322 9.67098 0.46967 9.53033C0.329018 9.38968 0.25 9.19891 0.25 9C0.25 8.80109 0.329018 8.61032 0.46967 8.46967C0.610322 8.32902 0.801088 8.25 1 8.25H23C23.1989 8.25 23.3897 8.32902 23.5303 8.46967C23.671 8.61032 23.75 8.80109 23.75 9ZM1 1.75H23C23.1989 1.75 23.3897 1.67098 23.5303 1.53033C23.671 1.38968 23.75 1.19891 23.75 1C23.75 0.801088 23.671 0.610322 23.5303 0.46967C23.3897 0.329018 23.1989 0.25 23 0.25H1C0.801088 0.25 0.610322 0.329018 0.46967 0.46967C0.329018 0.610322 0.25 0.801088 0.25 1C0.25 1.19891 0.329018 1.38968 0.46967 1.53033C0.610322 1.67098 0.801088 1.75 1 1.75ZM23 16.25H1C0.801088 16.25 0.610322 16.329 0.46967 16.4697C0.329018 16.6103 0.25 16.8011 0.25 17C0.25 17.1989 0.329018 17.3897 0.46967 17.5303C0.610322 17.671 0.801088 17.75 1 17.75H23C23.1989 17.75 23.3897 17.671 23.5303 17.5303C23.671 17.3897 23.75 17.1989 23.75 17C23.75 16.8011 23.671 16.6103 23.5303 16.4697C23.3897 16.329 23.1989 16.25 23 16.25Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="lg:absolute lg:w-3/12 left-0 mr-auto">
              <Link to={l('/')}>
                <Logo />
              </Link>
            </div>

            <div className="flex absolute right-0 items-center">
              {/* <Button
                containerClassName="hidden lg:block mr-2"
                type="submit"
                variant="outline"
                icon="MagnifyingGlass"
                onlyIcon={true}
                onClick={() => setShowSearch(true)}
              /> */}

              <Dropdown
                label={dropdownLabel}
                isClosed={isLangDropdownClosed}
                variant="light"
                additionalClasses="hidden lg:block ml-4"
                rightAlign={true}
              >
                <a
                  href={page_url_en}
                  onClick={() => handleSelectedOptions('EN')}
                  className="font-sans body-m bg-dove-300 hover:bg-white py-2 pl-4 pr-12 text-center block border-b border-black"
                >
                  English
                </a>
                <a
                  href={page_url_it}
                  onClick={() => handleSelectedOptions('IT')}
                  className="font-sans body-m bg-dove-300 hover:bg-white py-2 pl-4 pr-12 text-center block "
                >
                  Italiano
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      <nav
        style={{ height: '60px' }}
        className={classNames(
          'bg-white w-full fixed top-0 z-1000 transition-transform duration-200 ease-in-out',
          {
            '-translate-y-full': !navIsOpen,
            'opacity-100': navIsVisible,
            'opacity-0': !navIsVisible,
            [additionalNavClass]: additionalNavClass !== '' && !navIsVisible,
          },
        )}
      >
        <div className="container h-full">
          <div className="relative h-full flex justify-center items-center">
            <div className="lg:hidden mr-4" onClick={handleOnToggleMobileMenu}>
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.75 9C23.75 9.19891 23.671 9.38968 23.5303 9.53033C23.3897 9.67098 23.1989 9.75 23 9.75H1C0.801088 9.75 0.610322 9.67098 0.46967 9.53033C0.329018 9.38968 0.25 9.19891 0.25 9C0.25 8.80109 0.329018 8.61032 0.46967 8.46967C0.610322 8.32902 0.801088 8.25 1 8.25H23C23.1989 8.25 23.3897 8.32902 23.5303 8.46967C23.671 8.61032 23.75 8.80109 23.75 9ZM1 1.75H23C23.1989 1.75 23.3897 1.67098 23.5303 1.53033C23.671 1.38968 23.75 1.19891 23.75 1C23.75 0.801088 23.671 0.610322 23.5303 0.46967C23.3897 0.329018 23.1989 0.25 23 0.25H1C0.801088 0.25 0.610322 0.329018 0.46967 0.46967C0.329018 0.610322 0.25 0.801088 0.25 1C0.25 1.19891 0.329018 1.38968 0.46967 1.53033C0.610322 1.67098 0.801088 1.75 1 1.75ZM23 16.25H1C0.801088 16.25 0.610322 16.329 0.46967 16.4697C0.329018 16.6103 0.25 16.8011 0.25 17C0.25 17.1989 0.329018 17.3897 0.46967 17.5303C0.610322 17.671 0.801088 17.75 1 17.75H23C23.1989 17.75 23.3897 17.671 23.5303 17.5303C23.671 17.3897 23.75 17.1989 23.75 17C23.75 16.8011 23.671 16.6103 23.5303 16.4697C23.3897 16.329 23.1989 16.25 23 16.25Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="lg:absolute lg:w-3/12 left-0 mr-auto">
              <Link to={l('/')}>
                <Logo size="compressed" />
              </Link>
            </div>

            <div className="flex absolute right-0">
              {/* <Button
                containerClassName="hidden lg:block mr-2 my-auto"
                type="submit"
                variant="outline"
                icon="MagnifyingGlass"
                onClick={() => setShowSearch(true)}
              /> */}

              <Dropdown
                label={dropdownLabel}
                isClosed={isLangDropdownClosed}
                variant="light"
                additionalClasses="hidden lg:block ml-4 my-auto"
                rightAlign={true}
              >
                <a
                  href={page_url_en}
                  onClick={() => handleSelectedOptions('EN')}
                  className="font-sans body-m bg-dove-300 hover:bg-white py-2 pl-4 pr-12 text-center block border-b border-black"
                >
                  English
                </a>
                <a
                  href={page_url_it}
                  onClick={() => handleSelectedOptions('IT')}
                  className="font-sans body-m bg-dove-300 hover:bg-white py-2 pl-4 pr-12 text-center block "
                >
                  Italiano
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      {/* <SiteNavMobile
        isOpen={menuMobileVisibility}
        handleClose={handleOnToggleMobileMenu}
        locale={locale}
        products={subMenuProps}
        brands={subMenuProps2}
        page_url_en={page_url_en}
        page_url_it={page_url_it}
        user={user}
        validPass={validPass}
      /> */}

      {/* <AnimatePresence>
        {showSearch ? (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0, pointerEvents: 'none' }}
            className="fixed w-full h-full z-100 p-10 pt-20 top-0 hidden lg:block"
            transition={{
              ease: 'easeInOut',
              duration: 0.3,
            }}
          >
            <div
              className="bg-black opacity-60 absolute top-0 left-0 w-full h-full"
              onClick={() => setShowSearch(false)}
            ></div>
            <div className="max-w-5xl rounded relative mx-auto">
              <div className="bg-dove-500 rounded-xl overflow-hidden shadow-xl">
                <Search handleClose={() => setShowSearch(false)} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence> */}
    </>
  )
}

export default SiteNav
