import type { Maybe } from '~/lib/generated'

export interface ICardInfo {
  data?: Maybe<string>
  value?: Maybe<string>
  valueIsLink?: boolean
  locked?: boolean
}
