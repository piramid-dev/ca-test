// import CommerceLayer from '@commercelayer/sdk'

// import { get, post, patch } from '~/utils/helpersFetch'

// const FREQUENCY = 'yearly'

// // Calculate the date of the next subscription
// const getValidUntilDate = (): Date => {
//   // Valid until date is next October 1st
//   const now = new Date()
//   // If now is greater then October, the valid until date is next year
//   return new Date(
//     // October is the month 9
//     now.getMonth() < 9 ? now.getFullYear() : now.getFullYear() + 1,
//     9, // October
//     1,
//   )
// }

// const createClientCl = (token: string) => {
//   const organization = process.env.CL_SLUG || ''
//   // Using the CommerceLayer SDK
//   return CommerceLayer({
//     organization: organization,
//     accessToken: token,
//   })
// }

// // Get application token
// export const getAcccessTokenCL = async () => {
//   const clientId = process.env.CL_CLIENT_ID || ''
//   const scope = process.env.CL_SCOPE || ''
//   const domain = process.env.CL_DOMAIN || 'commercelayer.io'
//   const slug = process.env.CL_SLUG || ''
//   const apiEndpoint = `https://${slug}.${domain}/oauth/token`
//   return await fetch(apiEndpoint, {
//     method: 'POST',
//     body: JSON.stringify({
//       grant_type: 'client_credentials',
//       client_id: clientId,
//       scope,
//     }),
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   }).then(async (res) => await res.json())
// }

// // Get integration token
// export const getIntegrationTokenCL = async () => {
//   const clientId = process.env.CL_CLIENT_ID_INTEGRATION || ''
//   const client_secret = process.env.CL_CLIENT_SECRET_INTEGRATION || ''
//   const domain = process.env.CL_DOMAIN || 'commercelayer.io'
//   const slug = process.env.CL_SLUG || ''
//   const apiEndpoint = `https://${slug}.${domain}/oauth/token`
//   return await fetch(apiEndpoint, {
//     method: 'POST',
//     body: JSON.stringify({
//       grant_type: 'client_credentials',
//       client_id: clientId,
//       client_secret,
//     }),
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   }).then(async (res) => await res.json())
// }

// // Create a new order
// export const createOrderCL = async (
//   token: string,
//   language_code: string = 'en',
//   metadata: {} | null = null,
// ) => {
//   // Valid until date is next October 1st
//   const validUntil = getValidUntilDate().toISOString()
//   const body = {
//     data: {
//       type: 'orders',
//       attributes: {
//         language_code,
//         metadata: {
//           ...metadata,
//           valid_until: validUntil,
//         },
//       },
//     },
//   }
//   return await post(token, `orders`, body)
// }

// // Add a Sku to an order
// export const addSkuToOrderCL = async (
//   token: string,
//   orderId: string,
//   skuCode: string,
// ) => {
//   const body = {
//     data: {
//       type: 'line_items',
//       attributes: {
//         quantity: 1,
//         frequency: FREQUENCY,
//         sku_code: skuCode,
//       },
//       relationships: {
//         order: {
//           data: {
//             type: 'orders',
//             id: orderId,
//           },
//         },
//       },
//     },
//   }
//   return await post(token, `line_items`, body)
// }

// // Create a new subscription
// export const createSubscriptionCL = async (token: string, orderId: string) => {
//   const body = {
//     data: {
//       type: 'orders',
//       id: orderId,
//       attributes: {
//         _create_subscriptions: true,
//       },
//     },
//   }
//   const order = await patch(
//     token,
//     `orders/${orderId}?include=order_subscriptions`,
//     body,
//   )
//   return order?.included?.[0]
// }

// // Update user password to CL
// export const updateUserPasswordCL = async (
//   token: string,
//   userId: string,
//   password: any,
// ) => {
//   if (!password) return

//   const cl = createClientCl(token)

//   cl.customers.update({
//     id: userId,
//     password: password,
//   })
// }

// // Get the customer subscriptions from CL
// export const getCustomerSubscriptionsCL = async (
//   token: string,
//   userId: string,
// ) => {
//   return await get(token, `customers/${userId}/order_subscriptions`)
// }

// // Get the user from CL
// export const getUserCL = async (token: string, userId: string) => {
//   const user = await get(token, `customers/${userId}`)
//   return user?.data
// }

// // Get the user orders from CL
// export const getUserOrdersCL = async (token: string, userId: string) => {
//   return await get(token, `customers/${userId}/orders?include=line_items`)
// }

// // Get the user orders from CL
// export const getLatestsOrdersCL = async (token: string, userId: string) => {
//   // Using the CommerceLayer SDK
//   const cl = createClientCl(token)

//   return await cl.customers.orders(userId, {
//     include: ['line_items', 'order_subscriptions'],
//     filters: {
//       payment_status_in: 'paid,free',
//     },
//     sort: { created_at: 'desc' }, // get most recent orders
//   })
// }

// // Check if the user has valid pass
// export const hasUserValidPassCL = async (
//   token: string,
//   userId: string,
//   skuCode: string,
// ) => {
//   const orders = await getLatestsOrdersCL(token, userId)

//   // Find if inside the orders there is a line item with the sku code
//   const findOrder = orders.find((order) => {
//     const lineItems = order.line_items || []

//     const orderValidUntil = new Date(order.metadata?.valid_until)
//     const now = new Date()

//     const findLineItem = lineItems.find((lineItem) => {
//       return (
//         lineItem.sku_code === skuCode &&
//         // don't check if the subscription is active but if the last order date
//         // because the subscription could be canceled but the order still available for the year
//         orderValidUntil > now
//       )
//     })
//     return findLineItem
//   })

//   return !!findOrder
// }

// // Get the user subscriptions from CL
// export const getUserSubscriptionsCL = async (token: string, userId: string) => {
//   // Using the CommerceLayer SDK
//   const cl = createClientCl(token)

//   const subscriptions = await cl.customers.order_subscriptions(userId, {
//     include: [
//       'order_subscription_items',
//       'source_order',
//       'orders',
//       'order_copies',
//       'recurring_order_copies',
//     ],
//     filters: {
//       status_eq: 'active',
//     },
//   })

//   return subscriptions
// }

// // Activate a subscription
// export const updateSubscriptionCL = async (
//   token: string,
//   subscriptionId: string,
// ) => {
//   const body = {
//     data: {
//       type: 'order_subscriptions',
//       id: subscriptionId,
//       attributes: {
//         next_run_at: getValidUntilDate().toISOString(),
//       },
//     },
//   }
//   return await patch(token, `order_subscriptions/${subscriptionId}`, body)
// }

// // Activate a subscription
// export const activateSubscriptionCL = async (
//   token: string,
//   subscriptionId: string,
// ) => {
//   const body = {
//     data: {
//       type: 'order_subscriptions',
//       id: subscriptionId,
//       attributes: {
//         _activate: true,
//       },
//     },
//   }
//   return await patch(token, `order_subscriptions/${subscriptionId}`, body)
// }

// // Deactivate a subscription
// export const deactivateSubscriptionCL = async (
//   token: string,
//   subscriptionId: string,
// ) => {
//   const body = {
//     data: {
//       type: 'order_subscriptions',
//       id: subscriptionId,
//       attributes: {
//         _deactivate: true,
//       },
//     },
//   }
//   return await patch(token, `order_subscriptions/${subscriptionId}`, body)
// }

// // Cancel a subscription
// export const cancelSubscriptionCL = async (
//   token: string,
//   subscriptionId: string,
// ) => {
//   const body = {
//     data: {
//       type: 'order_subscriptions',
//       id: subscriptionId,
//       attributes: {
//         _cancel: true,
//       },
//     },
//   }
//   return await patch(token, `order_subscriptions/${subscriptionId}`, body)
// }

// // Create a new password reset
// export const passwordResetCL = async (
//   token: string,
//   email: string,
//   locale: string,
// ) => {
//   const body = {
//     data: {
//       type: 'customer_password_resets',
//       attributes: {
//         customer_email: email,
//         metadata: {
//           locale,
//         },
//       },
//     },
//   }
//   return await post(token, `customer_password_resets`, body)
// }

// // Change the customer password
// export const changePasswordCL = async (
//   token: string,
//   resetId: string,
//   newPassword: string,
//   resetPasswordToken: string,
// ) => {
//   const body = {
//     data: {
//       type: 'customer_password_resets',
//       id: resetId,
//       attributes: {
//         customer_password: newPassword,
//         _reset_password_token: resetPasswordToken,
//       },
//     },
//   }
//   return await patch(token, `customer_password_resets/${resetId}`, body)
// }
