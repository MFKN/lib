import type { SandboxApiResolvers } from '@mfkn/fkn-web/src/api/resolvers'

import { call as _call } from 'osra'

import { iframe, targetWindowIsReady } from '../api-iframe'

const targetWindow =
  window.parent === window
    ? iframe?.contentWindow
    : window.parent

if (!targetWindow) throw new Error('No sandbox target window for osra calls found')

const call = _call<SandboxApiResolvers>(targetWindow, { key: 'fkn-sandbox-api' })

const readyCall: typeof call = (...args) => targetWindowIsReady.then(() => call(...args))

export {
  readyCall as call
}
