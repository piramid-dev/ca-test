import classNames from 'classnames'
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MagnifyingGlass } from 'phosphor-react'
import { Link } from '@remix-run/react'

import Button from '~/components/Atoms/Button'
import ButtonIcon from '~/components/Atoms/ButtonIcon'
import Logo from '~/components/Atoms/Logo'
import SearchModal from '~/components/Molecules/SearchModal'
import { useLocalizeLink } from '../../../hooks/useLocalizeLink'

interface Header {
  isHome?: Boolean
  isLogin?: Boolean
}
const Header: FC<Header> = ({ isHome = false, isLogin = false }) => {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const controls = useAnimation()
  const [searchOpen, setSearchOpen] = useState(false)
  const { l } = useLocalizeLink()

  useEffect(() => {
    if (isScrolled) {
      controls.start('collapsed')
    } else {
      controls.start('expanded')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrolled])

  // const { t } = useTranslation()
  // const { l } = useLocalizeLink()
  // const navigate = useNavigate()

  const variants = {
    expanded: { width: 'var(--navbar-width)' },
    collapsed: {
      width: 'var(--navbar-width-collapsed)',
      borderRadius: 8,
      boxShadow: 'var(--navbar-boxshadow)',
    },
  }

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest >= 80)
  })

  const loginButton = () =>
    isLogin ? (
      <ButtonIcon
        extraClasses="max-lg:hidden"
        variant="outline"
        size="small"
        icon="User"
      />
    ) : (
      <Button
        extraClasses="max-lg:hidden"
        label={t('LOGIN')}
        variant="outline"
        size="small"
      />
    )

  return (
    <>
      <motion.header
        initial="expanded"
        variants={variants}
        animate={controls}
        transition={{ duration: 0.2, ease: [0.07, 0.29, 0.99, 0.85] }}
        className="navbar sticky top-[10px] bg-dove mx-auto"
      >
        <div
          className={classNames({
            container: !isScrolled,
            'px-4': isScrolled,
          })}
        >
          <div
            className={classNames({
              'w-full flex justify-between items-center gap-x-4 lg:gap-x-6 transition-all ease-in':
                true,
              'py-4': !isScrolled,
              'py-3': isScrolled,
            })}
          >
            <Link to={l('/')}>
              {isScrolled ? (
                <Logo size="compressed" />
              ) : (
                <>
                  <Logo extraClasses="max-lg:hidden" />
                  <Logo extraClasses="lg:hidden" size="compressed" />
                </>
              )}
            </Link>
            {!isHome || (isHome && isScrolled) ? (
              <div
                className="max-w-[400px] w-full hover:cursor-pointer"
                onClick={() => setSearchOpen(true)}
              >
                <div className="relative w-full rounded-full overflow-hidden bg-dove text-black/30 flex items-center gap-x-1 border border-black/20 px-6 py-2">
                  <MagnifyingGlass className="text-black/30 w-6" />
                  <span className="relative inline-block px-3 body-m font-sans pointer-events-none before:content-[''] before:w-[1.2px] before:h-full before:inline-block before:bg-primary before:absolute before:animate-blink">
                    {t('header.search')}
                  </span>
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-end gap-x-3">
              {!isScrolled ? loginButton() : null}
              <ButtonIcon variant="outline" size="small" icon="HamburgerIcon" />
            </div>
          </div>
        </div>
      </motion.header>
      <SearchModal
        showModal={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
export default Header
