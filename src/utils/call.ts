import type { Resolvers } from '@mfkn/fkn-web'

import { call as _call } from 'osra'

import iframe from '../api-iframe'

const targetWindow =
  window.parent === window
    ? iframe?.contentWindow
    : window.parent

if (!targetWindow) throw new Error('No sandbox target window for osra calls found')

let _resolve, _reject
const targetWindowIsReady = new Promise<void>((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

if (window.parent === window) {
  iframe?.addEventListener('load', () => {
    _resolve()
  })
} else {
  _resolve()
}

const call = _call<Resolvers>(targetWindow, { key: 'fkn-sandbox-api' })

const readyCall: typeof call = (...args) => targetWindowIsReady.then(() => call(...args))

export {
  readyCall as call
}
