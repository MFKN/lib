import { call } from './utils'

window.addEventListener(
  'popstate',
  () => call('LOCATION_CHANGE', { url: location.toString() })
)
