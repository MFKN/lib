import Api from '@oz/web/src/api/package/api'

import events from './events'
import { makeCallListener } from './utils/call'

interface PackageSource {
  web: string
  background: string
}

interface IndexerBody {
  patterns: string[]
  explore: Function
  search: Function
  parse: Function
}

export const Resolvers = {
  [Api.FETCH_PACKAGE]: makeCallListener(() => events.dispatch(Api.FETCH_PACKAGE)),
  [Api.DISCOVER_PACKAGES]: makeCallListener(() => events.dispatch(Api.DISCOVER_PACKAGES))
}
