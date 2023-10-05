import type { SandboxApiResolvers } from '@mfkn/fkn-web/src/api/resolvers'
// import type { ServiceWorkerWebExtensionApiResolvers } from '@mfkn/web-extension/src/service-worker/api/resolvers'

import { call as _call } from 'osra'
import { apiTargetIsReady } from '../api'

// const call = _call<SandboxApiResolvers>(window, { key: 'fkn-sandbox-api' })
// const webExtensionCall = _call<ServiceWorkerWebExtensionApiResolvers>(window, { key: 'fkn-webextension-api' })

const readyCall = <T2 extends SandboxApiResolvers, T3 extends keyof T2>(type: T3, data?: Parameters<T2[T3]>[0] | undefined) =>
  apiTargetIsReady()
    .then((target) =>
      _call<SandboxApiResolvers>(target, { key: 'fkn-sandbox-api' })(type, data)
    )

export {
  readyCall as call,
  // webExtensionCall
}
