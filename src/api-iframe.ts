import type { SandboxResolvers } from '@mfkn/fkn-web/src/api/sandbox'
import { call } from 'osra'

import { targetWindow } from './utils'

const WEB_ORIGIN = import.meta.env.VITE_WEB_ORIGIN
if (!WEB_ORIGIN) throw new Error('Missing WEB_ORIGIN environment variable')

const foundIframe =
  document
    .body
    .querySelector<HTMLIFrameElement>(`iframe[src="${`${WEB_ORIGIN}/sandbox-api`}"]`)

const createdIframe =
  !foundIframe
    ? document.createElement('iframe')
    : undefined

export const iframe =
  window.parent === window
    ? foundIframe ?? createdIframe
    : undefined

let _resolve, _reject
export const targetWindowIsReady = new Promise<void>((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

if (window.parent === window && !foundIframe) {
  iframe?.addEventListener('load', () => {
    const interval = setInterval(() =>
      call<SandboxResolvers>(targetWindow, { key: 'fkn-sandbox' })('APP_READY', {})
        .then((res) => {
          _resolve()
          clearInterval(interval)
        })
    , 10)
  })
} else {
  _resolve()
}

if (createdIframe) {
  createdIframe.src = `${WEB_ORIGIN}/sandbox-api`
  createdIframe.style.display = 'none'
  document.body.appendChild(createdIframe)
}
