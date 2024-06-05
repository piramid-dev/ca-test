export interface ITopic {
  name: string
  slug: string
  _allNameLocales: Array<{
    locale: string
    value: string
  }>
}
