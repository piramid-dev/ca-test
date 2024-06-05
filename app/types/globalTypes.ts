export type ChildrenElement = JSX.Element | JSX.Element[] | null

export type ContextType = {
  navIsOpen: boolean
  locale: string | undefined
  user: any
  validPass: boolean
  isUser: boolean
}

export interface IStringI18zed {
  it: string
  en: string
}
