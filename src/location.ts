import type { ApiResolverOptions } from '@mfkn/fkn-web'

import makeApiPromise from './utils/promise'
import { call } from './utils'

window.addEventListener(
  'popstate',
  () => call('LOCATION_CHANGE', { url: location.toString() })
)

const locationChange = makeApiPromise(
  async ({ data: { path } }: ApiResolverOptions<{ path: string }>) => {
    console.log('app received nav', path)
    history.pushState(undefined, '', path)
  }
)


export const resolvers = {
  'LOCATION_CHANGE': locationChange// ({ data: { path } }: { data: { path: string } }) => console.log('HISTORY PUSHED', path) || history.pushState(undefined, '', path)
}
