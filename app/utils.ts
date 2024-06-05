import type { Maybe } from '~/lib/generated'

export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

// SEE: https://stackoverflow.com/a/53187393/5292632
export const _get = (object: any, path: any, defaultValue = null) => {
  if (typeof path === 'string') {
    path = path.split('.')
  }

  return path.reduce(
    (xs: any, x: any) => (xs && xs[x] ? xs[x] : defaultValue),
    object,
  )
}

export const _arrayDistinct = (array: Array<any>) => [...new Set(array)]

export const _arrayOfObjectDistinct = (array: Array<any>, key: string) => {
  return array.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t[key] === thing[key]),
  )
}

// Get the language from the request
export const getLocale = (request: Request) => {
  if (request.url.indexOf('/en/') > 0) {
    return 'en'
  }
  // Check if the latest part of the request.url is '/it'
  const urlParts = request.url.split('/en')
  if (urlParts[1] === '' || urlParts[1] === '/') {
    return 'en'
  }
  // Default to italian
  return 'it'
}

// Remove html tags from a string
export const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '')
}

// Convert a string to slug
export const slugifyString = (text: string) => {
  return text
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple - with single -
}

// Convert an array of strings to an array of slugs
export const slugifyArray = (array: Array<string>) => {
  return array.map((item) => slugifyString(item))
}

// Convert a string of params to an array of strings
export const paramsToArray = (params: string) => {
  return params
    .split(',')
    .map((param) => param.trim())
    .filter((param) => param !== '')
}

// Truncate phrase after a certain number of words
export const truncatePhrase = (
  phrase: Maybe<string> | undefined,
  words: number,
) => {
  const maxChars = 100
  if (!phrase) return ''
  if (phrase.length < maxChars) return phrase

  const truncated = stripHtml(phrase).split(' ').splice(0, words).join(' ')

  // Limit phrase to number of words but also not more than 100 characters
  if (truncated.length > maxChars) {
    return truncatePhrase(truncated, words - 1)
  } else {
    return truncated + '...'
  }
}
