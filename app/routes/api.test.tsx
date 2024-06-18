import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
// @ts-ignore
// import allMovies from './../json/allMovies.json'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return json({ hello: 'world' })
}
