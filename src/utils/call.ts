import type { Resolvers } from '@mfkn/fkn-web'

import { call as _call } from 'osra'

import iframe from '../api-iframe'

const targetWindow =
  window.parent === window
    ? iframe?.contentWindow
    : window.parent

if (!targetWindow) throw new Error('No sandbox target window for osra calls found')

export const call = _call<Resolvers>(targetWindow, { key: 'fkn-sandbox-api' })
