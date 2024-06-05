import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
// import { authentication } from '@commercelayer/js-auth'
import { useActionData, useLocation, useLoaderData } from '@remix-run/react'
import * as yup from 'yup'
import { withYup } from '@remix-validated-form/with-yup'
import { ValidatedForm } from 'remix-validated-form'
import { useTranslation } from 'react-i18next'

import i18next from '~/i18next.server'
import { getUserId, getContext } from '~/session.server'
import Input from '~/components/AtomsForms/Input'
import Submit from '~/components/AtomsForms/Submit'
import { useLocalizeLink } from '~/hooks/useLocalizeLink'
import LinkBasic from '~/components/Atoms/LinkBasic/LinkBasic'
// import { getSession } from '~/sessions'
// import { retrieveUser } from '~/graphql/common-queries.graphql'
// import { createPrompterSurvey } from '~/lib/datocms.utils'
import { getLocale } from '~/utils'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let title = "The Skialper Buyer's Guide"
  if (data && 'page' in data) {
    title = `${data.page} - ${title}`
  }
  return [{ title }]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  // Get context
  const locale = getLocale(request)

  const t = await i18next.getFixedT(locale)
  const page = `${t('login')}`
  const context = await getContext(request)
  return json({ context, page })
}

export async function action({ request }: ActionFunctionArgs) {
  // This is just for server side validation, in case js is disabled
  const validator = withYup(
    yup.object({
      customerEmail: yup
        .string()
        .email('Email is invalid')
        .required('Email is required'),
      customerPassword: yup.string().required('Password is required'),
    }),
  )

  const { data, error } = await validator.validate(await request.formData())
  // const locale = getLocale(request)

  // If there are errors, return the error
  if (error) return json({ data, errors: ['validation_error'] })

  // Otherwise, continue with the signup process
  // const { customerEmail, customerPassword } = data
  // const email = customerEmail
  // const password = customerPassword

  // const user = await authentication('password', {
  //   domain: process.env.CL_DOMAIN || 'commercelayer.io',
  //   clientId: process.env.CL_CLIENT_ID || '',
  //   slug: process.env.CL_SLUG || '',
  //   scope: process.env.CL_SCOPE || '',
  //   username: email,
  //   password: password,
  // })

  // // If authentication has errors, return the error
  // if (user?.error) return json({ data, errors: [user.error] })

  // if (user?.accessToken) {
  //   // TODO: move this redirect part to a new api route for join and login - redirectAfterLoginJoin
  //   const session = await getSession(request.headers.get('Cookie'))
  //   const prompter = session.get('prompter')
  //   let redirectTo = ''
  //   const url = new URL(request.url)
  //   const returnUrl = url.searchParams.get('returnUrl')
  //   console.log('++++returnUrl', returnUrl)
  //   const returnUrlDefault =
  //     locale === 'en' ? '/skialper/account' : '/it/skialper/account'

  //   redirectTo = returnUrl ? decodeURIComponent(returnUrl) : returnUrlDefault

  //   if (prompter) {
  //     const { answers, started_at } = JSON.parse(prompter)
  //     const { id } = await retrieveUser(request, user.ownerId)

  //     await createPrompterSurvey(answers, started_at, id)

  //     redirectTo =
  //       locale === 'en' ? '/skialper/prompter' : '/it/skialper/suggeritore'
  //   }

  //   // Reset context
  //   session.set('context', '')

  //   return createUserSession({
  //     request,
  //     userId: user.ownerId,
  //     email,
  //     accessToken: user.accessToken,
  //     remember: false,
  //     redirectTo,
  //   })
  // }

  return json({ data, errors: [] })
}

export default function LoginPage(): JSX.Element {
  const { t } = useTranslation()
  const { l } = useLocalizeLink()
  const data = useActionData<typeof action>()
  const { context } = useLoaderData<typeof loader>()
  console.log('++++context', context)

  // const errors: string[] = data ? data.errors : []
  const errors = data ? data.errors : []
  const location = useLocation()
  const urlParams = location.search || ''

  let paragraphText = ''
  switch (context) {
    case 'favorites':
      paragraphText = t('context.favorites.login')
      break
    // case 'prompter':
    //   paragraphText = t('context.prompter.login')
    //   break
    // case 'product-tried':
    //   paragraphText = t('context.productTried.login')
    //   break
    // case 'subscribe':
    //   paragraphText = t('context.subscribe.login')
    //   break
  }

  const validator = withYup(
    yup.object({
      customerEmail: yup
        .string()
        .email(t('validation-errors.emailInvalid'))
        .required(t('validation-errors.emailRequired')),
      customerPassword: yup
        .string()
        .required(t('validation-errors.passwordRequired')),
    }),
  )

  return (
    <div className="no-footer flex py-12 min-h-[calc(100vh-100px)] flex-col bg-login">
      <div className="mx-auto w-full max-w-lg px-8">
        <ValidatedForm
          validator={validator}
          method="post"
          noValidate
          id="loginForm"
        >
          <h1 className="font-sans h4 text-center mb-3">
            {t('loginToYourAccount')}
          </h1>
          {paragraphText ? (
            <p className="font-sans body-m text-center mb-6 text-black/70">
              {paragraphText}
            </p>
          ) : null}
          <div className="space-y-4 mt-8">
            <Input name="customerEmail" type="email" label="Email" />
            <Input name="customerPassword" type="password" label="Password" />
            <p className="text-gray-500 font-sans body-xs">
              <LinkBasic
                to={l('/password-recovery')}
                label={t('passwordForgotten')}
                extraClasses="ml-2"
              />
            </p>
            <div>
              {errors.length > 0
                ? errors?.map((error: any, index: number) => (
                    <p
                      key={index}
                      className="pt-3 text-base font-medium text-red-500"
                    >
                      {t(`formErrors.${error}`)}
                    </p>
                  ))
                : null}
            </div>
            <div className="flex pt-4">
              <Submit label={t('login')} />
            </div>
          </div>
          <div>
            <p className="text-center text-gray-500 pt-6 font-sans body-l">
              {t('notRegistered')}{' '}
              <LinkBasic
                to={l('/join') + urlParams}
                label={t('sign-up')}
                extraClasses="ml-2"
              />
            </p>
          </div>
        </ValidatedForm>
      </div>
    </div>
  )
}
