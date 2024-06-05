import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { useState } from 'react'
import { redirect, json } from '@remix-run/node'
import { useActionData, useLoaderData, useLocation } from '@remix-run/react'
import * as yup from 'yup'
import { withYup } from '@remix-validated-form/with-yup'
import { ValidatedForm } from 'remix-validated-form'
import { useTranslation } from 'react-i18next'

import i18next from '~/i18next.server'
import { getUserId, getContext } from '~/session.server'
import Input from '~/components/AtomsForms/Input'
import Checkbox from '~/components/AtomsForms/Checkbox'
import Submit from '~/components/AtomsForms/Submit'
import { useLocalizeLink } from '~/hooks/useLocalizeLink'
// import datoCmsClient from '~/lib/datocms.server'
import LinkBasic from '~/components/Atoms/LinkBasic/LinkBasic'
// import { getSession } from '~/sessions'
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
  const page = `${t('sign-up')}`
  const context = await getContext(request)

  return { context, page }
}

export async function action({ request }: ActionFunctionArgs) {
  // const locale = getLocale(request)
  // let apiError = null

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`
  }

  const validator = withYup(
    yup.object({
      customerName: yup.string().required('Name is required'),
      customerSurname: yup.string().required('Surname is required'),
      customerEmail: yup
        .string()
        .email('Email is invalid')
        .required('Email is required'),
      customerPassword: yup
        .string()
        .required('Password is required')
        // check minimum characters
        .min(8, 'Password must have at least 8 characters')
        // different error messages for different requirements
        .matches(/[0-9]/, getCharacterValidationError('digit'))
        .matches(/[a-z]/, getCharacterValidationError('lowercase'))
        .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
      newsletter: yup.string(),
    }),
  )

  const { data, error } = await validator.validate(await request.formData())
  // If there are errors, return the error
  if (error) return json({ data, errors: ['validation_error'] })

  // Otherwise, continue with the signup process
  // const {
  //   customerName,
  //   customerSurname,
  //   customerEmail,
  //   customerPassword,
  //   newsletter,
  // } = data
  // const name = customerName
  // const surname = customerSurname
  // const email = customerEmail
  // const password = customerPassword

  // const clientId = process.env.CL_CLIENT_ID || ''
  // const slug = process.env.CL_SLUG || ''
  // const domain = process.env.CL_DOMAIN || 'commercelayer.io'
  // const scope = process.env.CL_SCOPE || ''
  // const endpoint = `https://${slug}.${domain}`

  // const accessTokenResponse = await Promise.resolve(
  //   getSalesChannelToken({ clientId, endpoint, scope }),
  // )
  // // If the access token is null, return null
  // if (accessTokenResponse?.access_token === null) return null
  // // Otherwise get the access token
  // const accessToken = accessTokenResponse?.access_token || ''
  // // Create the customer
  // const client = CommerceLayer({
  //   organization: process.env.CL_SLUG || '',
  //   domain: process.env.CL_DOMAIN || 'commercelayer.io',
  //   accessToken,
  // })

  // const createCustomerResponse = await client.customers
  //   .create({
  //     email: email,
  //     password: password,
  //     metadata: {
  //       locale,
  //       firstName: name,
  //       lastName: surname,
  //     },
  //   })
  //   .catch((e) => {
  //     apiError = e.errors[0].meta.error
  //     console.log('++++apiError', apiError)
  //   })

  // // If createCustomerResponse has errors, return the error
  // if (apiError) return json({ data, errors: [apiError] })

  // // If the signup works well login the customer
  // if (createCustomerResponse && createCustomerResponse?.id != null) {
  //   const user = await authenticate('password', {
  //     domain: process.env.CL_DOMAIN || 'commercelayer.io',
  //     clientId: process.env.CL_CLIENT_ID || '',
  //     // slug: process.env.CL_SLUG || '',
  //     scope: process.env.CL_SCOPE || '',
  //     username: email,
  //     password: password,
  //   })

  //   const userId = user.ownerId
  //   const userAccessToken = user.accessToken

  //   // Datocms client
  //   const client = datoCmsClient()

  //   const data = await client.items.create({
  //     item_type: {
  //       type: 'item_type',
  //       id: '1525617',
  //     },
  //     name,
  //     surname,
  //     id_commercelayer: userId,
  //     email,
  //   })
  //   if (newsletter == 'on') {
  //     const brevo = require('@getbrevo/brevo')
  //     const defaultClient = brevo.ApiClient.instance
  //     const apiKey = defaultClient.authentications['api-key']
  //     apiKey.apiKey = process.env.BREVO_API_KEY

  //     const createContact = new brevo.CreateContact()
  //     createContact.email = email
  //     createContact.firstName = name
  //     createContact.lastName = surname
  //     createContact.attributes = {
  //       locale,
  //     }
  //     if (process.env.BREVO_LIST_ID) {
  //       createContact.listIds = [parseInt(process.env.BREVO_LIST_ID)]
  //     }

  //     const apiInstance = new brevo.ContactsApi()

  //     try {
  //       await apiInstance.createContact(createContact)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   // TODO: move this redirect part to a new api route for join and login - redirectAfterLoginJoin
  //   const session = await getSession(request.headers.get('Cookie'))
  //   const prompter = session.get('prompter')
  //   let redirectTo = ''
  //   const url = new URL(request.url)
  //   const returnUrl = url.searchParams.get('returnUrl')
  //   const returnUrlDefault =
  //     locale === 'en' ? '/skialper/account' : '/it/skialper/account'

  //   redirectTo = returnUrl ? decodeURIComponent(returnUrl) : returnUrlDefault

  //   if (prompter) {
  //     const { answers, started_at } = JSON.parse(prompter)
  //     const { id: userId } = data as any

  //     await createPrompterSurvey(answers, started_at, userId)
  //     redirectTo =
  //       locale === 'en' ? '/skialper/prompter' : '/it/skialper/suggeritore'
  //   }

  //   // Reset context
  //   session.set('context', '')

  //   return createUserSession({
  //     request,
  //     userId,
  //     email,
  //     accessToken: userAccessToken,
  //     remember: false,
  //     redirectTo,
  //   })
  // }

  return json({ data, errors: [] })
}

export default function JoinPage(): JSX.Element {
  const { t } = useTranslation()
  const { l } = useLocalizeLink()
  const data = useActionData()
  const { context } = useLoaderData<any>()

  console.log('++++context', context)

  const errors: string[] = data ? data['errors'] : []
  const location = useLocation()
  const urlParams = location.search || ''

  const [submitDisabled, setSubmitDisabled] = useState(true)

  const toogleSubmit = (checked: boolean) => {
    setSubmitDisabled(!checked)
  }

  let paragraphText = ''
  switch (context) {
    case 'favorites':
      paragraphText = t('context.favorites.join')
      break
    case 'prompter':
      paragraphText = t('context.prompter.join')
      break
    case 'product-tried':
      paragraphText = t('context.productTried.join')
      break
    case 'subscribe':
      paragraphText = t('context.subscribe.join')
      break
    default:
      paragraphText = t('unlockTheContents')
      break
  }

  const validator = withYup(
    yup.object({
      customerName: yup.string().required(t('validation-errors.nameRequired')),
      customerSurname: yup
        .string()
        .required(t('validation-errors.surnameRequired')),
      customerEmail: yup
        .string()
        .email(t('validation-errors.emailInvalid'))
        .required(t('validation-errors.emailRequired')),
      customerPassword: yup
        .string()
        .required(t('validation-errors.passwordRequired'))
        // check minimum characters
        .min(8, 'Password must have at least 8 characters')
        // different error messages for different requirements
        .matches(/[0-9]/, t('validation-errors.password.digit'))
        .matches(/[a-z]/, t('validation-errors.password.lowercase'))
        .matches(/[A-Z]/, t('validation-errors.password.uppercase')),
    }),
  )

  return (
    <div className="no-footer flex py-12 min-h-[calc(100vh-100px)] flex-col bg-login">
      <div className="mx-auto w-full max-w-lg px-8">
        <ValidatedForm validator={validator} method="post" noValidate>
          <h1 className="font-sans h4 text-center mb-3">
            {t('createYourAccount')}
          </h1>
          {paragraphText ? (
            <p className="font-sans body-m text-center mb-6 text-black/70">
              {paragraphText}
            </p>
          ) : null}
          <div className="space-y-4 mt-8">
            <Input name="customerName" type="text" label={t('name')} />
            <Input name="customerSurname" type="text" label={t('surname')} />
            <Input name="customerEmail" type="email" label={t('email')} />
            <Input
              name="customerPassword"
              type="password"
              label={t('password')}
              helpText={t('validation-errors.password.pattern')}
            />
            <Checkbox name="terms" label={t('terms')} onChange={toogleSubmit} />
            <Checkbox name="newsletter" label={t('newsletter')} />
            <div>
              {errors.length > 0
                ? errors?.map((error: any, index: number) => (
                    <p
                      key={index}
                      className="pt-6 text-base font-medium text-red-500"
                    >
                      {t(`formErrors.${error}`)}
                    </p>
                  ))
                : null}
            </div>
            <div className="flex pt-4">
              <Submit label={t('sign-up')} disabled={submitDisabled} />
            </div>
          </div>
          <div>
            <p className="text-center text-gray-500 pt-6 font-sans body-l">
              {t('alreadyRegistered')}{' '}
              <LinkBasic
                to={l('/login') + urlParams}
                label={t('login')}
                extraClasses="ml-2"
              />
            </p>
          </div>
        </ValidatedForm>
      </div>
    </div>
  )
}
