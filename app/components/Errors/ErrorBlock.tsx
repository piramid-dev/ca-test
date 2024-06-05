import { useTranslation } from 'react-i18next'

import { useLocalizeLink } from '~/hooks/useLocalizeLink'
import Button from '~/components/Atoms/Button'

interface ErrorBlockProps {
  title?: string
  text?: string
}

export default function ErrorBlock({
  title = 'Ooops!',
  text = 'Something went wrong.',
}: ErrorBlockProps): JSX.Element {
  const { t } = useTranslation()
  const { l } = useLocalizeLink()

  return (
    <div className="min-h-[calc(100vh-100px)] bg-dove-500 flex items-center">
      <div className="container w-full mx-auto text-center">
        <div className="h-[160px] lg:h-[250px] w-full lg:w-[546px] mx-auto rounded-full overflow-hidden relative">
          <img
            src="/assets/404.jpg"
            alt="404"
            className="absolute w-full h-full object-cover"
          />
        </div>
        <h1 className="font-sans h3 mt-10 mb-4">{title}</h1>
        <div className="font-sans body-m mb-10">{text}</div>
        <div>
          <Button
            variant="secondary"
            to={l('/')}
            label={t('backToHome')}
            icon="ArrowRight"
          />
        </div>
      </div>
    </div>
  )
}
