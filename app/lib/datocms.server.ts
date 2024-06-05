import { buildClient, LogLevel } from '@datocms/cma-client-browser'

const datoCmsClient = () => {
  if (!process.env.DATOCMS_API_TOKEN) {
    throw new Error('Missing DATOCMS_API_TOKEN')
  }

  return buildClient({
    apiToken: process.env.DATOCMS_API_TOKEN,
    environment: process.env.DATOCMS_ENVIRONMENT,
    baseUrl: 'https://site-api.datocms.com',
    logLevel: LogLevel.BASIC,
  })
}

export default datoCmsClient
