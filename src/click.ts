import Api from '@oz/web/src/api/operations'
import { call } from './utils/call'

document.body.addEventListener('click', () => call(Api.CLICK))
