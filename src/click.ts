import { Api } from '@mfkn/oz-web/src/api/api'
import { call } from './utils/call'

document.body.addEventListener('click', () => call(Api.CLICK))
