/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import LinkBasic from '~/components/Atoms/LinkBasic'

// import { useLocalizeLink } from '~/hooks/useLocalizeLink'
import type { Maybe } from '~/lib/generated'

import Button from '~/components/Atoms/Button'
import Logo from '~/components/Atoms/Logo'
import SectionWrapper from '~/components/Atoms/SectionWrapper'

interface LogoImage {
  img: string
  alt?: string
  to?: string
}

interface SiteFooterProps {
  isLoggedInd: boolean
  projectCol: LogoImage
  supportCol: LogoImage[]
  navigation: {
    first: {
      to: Maybe<string>
      label: Maybe<string>
    }[]
    second?: {
      to: Maybe<string>
      label: Maybe<string>
    }[]
    third?: {
      to: Maybe<string>
      label: Maybe<string>
    }[]
  }
}
const SiteFooter: FC<SiteFooterProps> = ({
  isLoggedInd = false,
  projectCol,
  supportCol,
  navigation,
}) => {
  const { t } = useTranslation()
  // const { l } = useLocalizeLink()

  return (
    <SectionWrapper
      id="mainFooter"
      background="rgba(26,26,26,.1)"
      rounded
      overlap
    >
      <div className="flex justify-between items-center">
        <Logo extraClasses="max-md:hidden" />
        <Logo size="compressed" extraClasses="md:hidden" />
        {isLoggedInd ? (
          <Button
            linkCustomClasses="uppercase"
            variant="outline"
            label={t('logout')}
          />
        ) : (
          <Button
            linkCustomClasses="uppercase"
            variant="outline"
            label={t('login')}
          />
        )}
      </div>
      <div className="my-16 flex flex-col lg:flex-row gap-y-12 gap-x-32">
        <div>
          <span className="body-m font-semibold">{t('footer.projectBy')}</span>
          <div className="h-[50px] lg:h-[90px] mt-4 lg:mt-8">
            {projectCol.to ? (
              <a href={projectCol.to} target="_blankc">
                {' '}
                <img
                  src={projectCol.img}
                  alt={projectCol.alt}
                  className="w-auto h-full"
                />
              </a>
            ) : (
              <img
                src={projectCol.img}
                alt={projectCol.alt}
                className="w-auto h-full"
              />
            )}
          </div>
        </div>
        <div>
          <span className="body-m font-semibold">
            {t('footer.supportedBy')}
          </span>
          <div className="flex items-center max-md:justify-between gap-x-8 lg:gap-x-12">
            {supportCol?.map((el, i) => (
              <div key={i} className="h-[50px] lg:h-[90px] mt-4 lg:mt-8">
                {el.to ? (
                  <a href={el.to} target="_blankc">
                    {' '}
                    <img src={el.img} alt={el.alt} className="w-auto h-full" />
                  </a>
                ) : (
                  <img src={el.img} alt={el.alt} className="w-auto h-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-y-14 gap-x-32">
        <div className="grid md:grid-cols-3 gap-x-14 gap-y-3 items-start">
          <div className="grid grid-cols-1 gap-y-3">
            {navigation.first.map((el) => (
              <LinkBasic
                key={el.label}
                to={el.to || ''}
                label={el.label || ''}
              />
            ))}
          </div>
          {navigation.second ? (
            <div className="grid grid-cols-1 gap-y-3">
              {navigation.second.map((el) => (
                <LinkBasic
                  key={el.label}
                  to={el.to || ''}
                  label={el.label || ''}
                />
              ))}
            </div>
          ) : null}
          {navigation.third ? (
            <div className="grid grid-cols-1 gap-y-3">
              {navigation.third.map((el) => (
                <LinkBasic
                  key={el.label}
                  to={el.to || ''}
                  label={el.label || ''}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <span className="uppercase body-xs font-semibold">
            {t('language')}
          </span>
          <div className="mt-6 flex items-center gap-x-1">
            <LinkBasic to="/" label="ITA" />
            <span className="inline-block mx-1 h-[12px] w-[1px] bg-black" />
            <LinkBasic to="/en" label="ENG" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
export default SiteFooter
