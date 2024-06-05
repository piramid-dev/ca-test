import React, { Suspense } from 'react'
import { withRouter } from 'storybook-addon-remix-react-router'
import type { Preview } from '@storybook/react'
import '../app/tailwind.css'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from '../app/i18n'
import { resources } from '../public/locales/resources.js'

// Initialize i18next with the configuration from your app
i18next
  .use(Backend) // lazy loads translations from /public/locales
  .use(LanguageDetector) // detect user language
  .init({
    ...i18n,
    fallbackLng: 'en',
    resources,
  })

// Wrap your stories in the I18nextProvider component
const withI18next = (Story, context) => {
  const { locale } = context.globals
  i18next.changeLanguage(locale)

  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18next}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

// Define the global types for the locale, add a dropdown to the toolbar
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'it', title: 'Italian' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  decorators: [withRouter, withI18next],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'twitter',
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'black',
          value: '#000000',
        },
        {
          name: 'yellow',
          value: '#ffff00',
        },
      ],
    },
  },
}

export default preview
