import type { ApiResolverOptions } from '@mfkn/fkn-web'

import { call } from './utils'
import makeApiPromise from './utils/promise'

window.addEventListener(
  'popstate',
  () => call('LOCATION_CHANGE', { url: location.toString() })
)

const locationChange = makeApiPromise(
  async ({ data: { path } }: ApiResolverOptions<{ path: string }>) => {
    history.pushState(undefined, '', path)
    window.dispatchEvent(new Event('popstate'))
  }
)


export const resolvers = {
  'LOCATION_CHANGE': locationChange// ({ data: { path } }: { data: { path: string } }) => console.log('HISTORY PUSHED', path) || history.pushState(undefined, '', path)
}
