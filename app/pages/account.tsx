import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { withYup } from '@remix-validated-form/with-yup'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ValidatedForm, validationError } from 'remix-validated-form'
import * as yup from 'yup'
// import { cancelSubscriptionCL, updateUserPasswordCL } from '~/utils/users'
// import { ArrowRight } from 'phosphor-react'

import SectionWrapper from '~/components/Atoms/SectionWrapper'
import UserProfile from '~/components/Sections/UserProfile'
import { useContext } from '~/hooks/useContext'
import i18next from '~/i18next.server'
import { getUserId } from '~/session.server'
// import Card from '~/components/Organisms/Card'
import Button from '~/components/Atoms/Button/Button'
import ButtonSpring from '~/components/Atoms/ButtonSpring/ButtonSpring'
import Input from '~/components/AtomsForms/Input'
import Submit from '~/components/AtomsForms/Submit'
import Errors from '~/components/Errors'
import Modal from '~/components/Molecules/Modal/Modal'
import { useLocalizeLink } from '~/hooks/useLocalizeLink'
import datoCmsClient from '~/lib/datocms.server'
import { getLocale } from '~/utils'

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`
}

const validator = withYup(
  yup.object({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    customerEmail: yup
      .string()
      .email('Email is invalid')
      .required('Email is required'),
    _action: yup.string(),
    datoUserId: yup.string().required(),
    newPassword: yup
      .string()
      .nullable() // In case is empty
      .transform((v, o) => (o === '' ? null : v)) // In case is empty
      // check minimum characters
      .min(8, 'Password must have at least 8 characters')
      // different error messages for different requirements
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[a-z]/, getCharacterValidationError('lowercase'))
      .matches(/[A-Z]/, getCharacterValidationError('uppercase')),

    confirmNewPassword: yup
      .string()
      .nullable() // In case is empty
      .transform((v, o) => (o === '' ? null : v)) // In case is empty
      // use "ref" to get the value of password.
      .oneOf([yup.ref('newPassword')], 'Passwords does not match'),
  }),
)

export const action = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  // const userAccessToken = await getUserAccessToken(request)
  const userAccessToken = null
  // If userid or accessToken are not present, return
  if (!userId || !userAccessToken) return null

  const formData = await request.formData()
  const action = formData.get('_action')!.toString()

  switch (action) {
    case 'editUser':
      const data = await validator.validate(formData)

      // If there are errors, return the error
      if (data.error) return validationError(data.error)
      // Otherwise, continue with the update
      const { name, surname, customerEmail, newPassword, datoUserId } =
        data.data
      const email = customerEmail
      const password = newPassword

      console.log(password)

      // Update user on DatoCMS
      const client = datoCmsClient()
      await client.items.update(datoUserId, {
        name,
        surname,
        email,
      })

      // Update passworrd on CL
      // await updateUserPasswordCL(userAccessToken, userId, password)
      return { userUpdated: true }
  }

  return null
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let title = "The Skialper Buyer's Guide"
  if (data && 'page' in data) {
    title = `${data.page} - ${title}`
  }
  return [{ title }]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)
  const userId = (await getUserId(request)) || search.get('userId')
  const locale = getLocale(request)

  const t = await i18next.getFixedT(locale)
  const page = `${t('account.account')}`

  // const userAccessToken =
  //   (await getUserAccessToken(request)) || search.get('accessToken')

  const userAccessToken = null

  // If userid or accessToken are not present, redirect to the home page
  if (!userId || !userAccessToken) return redirect('/')

  return { page }
}

export default function AccountPage(): JSX.Element {
  const { t } = useTranslation()
  const { l } = useLocalizeLink()
  const { user } = useContext()
  const { subscriptions = [] as any[], orders = [] as any[] } =
    useLoaderData<any>()
  const data: any = useActionData()
  const errors = data ? data['errors'] : []

  // Close the modal if the user has been updated correctly by the action
  useEffect(() => {
    if (data && data['userUpdated']) {
      setShowModal(false)
    }
  }, [data])

  const [showModal, setShowModal] = useState(false)

  const labels = [
    t('account.favorites'),
    t('account.subscription'),
    t('account.account'),
  ]

  // const reverseProducts = user.favoriteProducts
  //   ? [...user.favoriteProducts]?.reverse()
  //   : []

  // const productFavorites = {
  //   title: t('accountPage.yourFavorites'),
  //   products: [],
  //   isUserFavoriteCarousel: true,
  // }

  // If user.favoriteProducts is empty, remove the first item form the labels array
  if (!user.favoriteProducts) labels.shift()

  // const accountInfo = [
  //   { data: t('accountPage.name'), value: `${user.name} ${user.surname}` },
  //   { data: t('email'), value: user.email },
  //   { data: t('password'), value: '********' },
  // ]

  const formatDate = (_date: string) => {
    const date = new Date(_date)
    // Get the date in the format yyyy-mm-dd
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    // Return the date in the format mm/yyyy
    return `${month}/${year}`
  }

  return (
    <UserProfile labels={labels}>
      <div className="lg:w-9/12 lg:px-6">
        <SectionWrapper
          background="dove-500"
          containerClass="py-12 md:py-16 lg:py-12"
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="h3 grow font-sans !font-bold lg:w-1/3">
              {t('accountPage.yourOrder')}
            </div>
          </div>
          {orders.length === 0 ? (
            <div className="mt-8 lg:flex items-center">
              <span className="mr-4">{t('accountPage.noOrders')}</span>
              <Button
                variant="primary"
                label={t('subscribe')}
                // iconPos="left"
                icon="ArrowRight"
                to={l('/subscription')}
              />
            </div>
          ) : null}
          <div className="grid gap-2 grid-cols-1 md:grid-cols-3 mt-8">
            {orders && orders.length > 0
              ? orders.map((order: any, index: number) => (
                  <div
                    key={index}
                    className="h-fit overflow-hidden rounded-xl border body-xl font-sans"
                  >
                    <div className="p-4 w-full">
                      <div className="font-bold">
                        The Skialper Buyer's Guide
                      </div>
                      <p>Annual - {formatDate(order.created_at)}</p>
                      <p className="opacity-70">
                        {order.formatted_subtotal_amount}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
          {subscriptions.length > 0 ? (
            <Form method="post" className="mt-10">
              <input
                type="hidden"
                name="subscriptionId"
                value={subscriptions[0].id}
              />
              <input type="hidden" name="_action" value="deleteSubscription" />
              <div className="lg:flex items-center">
                <span className="text-sans body-l lg:body-m mr-2">
                  {t('accountPage.subscriptionRenewal')}
                </span>
                <button type="submit">
                  <ButtonSpring>
                    {t('accountPage.deleteSubscription')}
                  </ButtonSpring>
                </button>
              </div>
            </Form>
          ) : null}
        </SectionWrapper>

        <SectionWrapper
          background="dove-500"
          containerClass="py-12 md:py-16 lg:py-12"
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="h3 grow font-sans !font-bold lg:w-1/3">
              {t('accountPage.accountDetails')}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
            {/* <Card
              title={t('accountPage.titleCardAccount')}
              button={
                <span
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer font-sans body-l !font-semibold"
                >
                  {t('editYourAccount')}
                  <ArrowRight size={24} className="ml-2 inline-block" />
                </span>
              }
            /> */}
          </div>

          <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={t('editYourAccount')}
          >
            <ValidatedForm validator={validator} method="post" noValidate>
              <div className="space-y-4">
                <input type="hidden" name="_action" value="editUser" />
                <input type="hidden" name="datoUserId" value={user.id} />
                <Input
                  name="name"
                  type="text"
                  label={t('name')}
                  defaultValue={user.name}
                />
                <Input
                  name="surname"
                  type="text"
                  label={t('surname')}
                  defaultValue={user.surname}
                />
                <Input
                  name="customerEmail"
                  type="email"
                  label={t('email')}
                  defaultValue={user.email}
                />
                <Input
                  name="newPassword"
                  type="password"
                  label={t('newPassword')}
                />
                <Input
                  name="confirmNewPassword"
                  type="password"
                  label={t('repeatPassword')}
                />
                <div>
                  {errors
                    ? errors?.map((error: any, index: number) => (
                        <p
                          key={index}
                          className="pt-6 text-base font-medium text-red-500"
                        >
                          {error}
                        </p>
                      ))
                    : null}
                </div>
                <div className="flex pt-4">
                  <Submit label={t('save')} />
                </div>
              </div>
            </ValidatedForm>
          </Modal>
        </SectionWrapper>
      </div>
    </UserProfile>
  )
}

export function ErrorBoundary() {
  return <Errors />
}
