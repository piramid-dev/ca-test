interface Options {
  method: string
  headers: {
    Authorization: string
    Accept: string
    'Content-Type': string
  }
  body?: any
}

//  get method
export const get = (token: string, path: string) => apiFetch(token, path, 'GET')

//  post method
export const post = (token: string, path: string, data: any) =>
  apiFetch(token, path, 'POST', data)

//  delete method
export const remove = (token: string, path: string, data: any) =>
  apiFetch(token, path, 'DELETE', data)

//  patch method
export const patch = (token: string, path: string, data: any) =>
  apiFetch(token, path, 'PATCH', data)

// general fetch
const apiFetch = (token: string, path: string, method = 'GET', data = null) => {
  const options: Options = {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  }
  if (data) {
    options.body = JSON.stringify(data)
  }

  // API URL
  const domain = process.env.CL_DOMAIN || 'commercelayer.io'
  const slug = process.env.CL_SLUG || ''
  const url = `https://${slug}.${domain}/api/${path}`

  return fetch(url, options)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error', error))
}
