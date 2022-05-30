import type { ApiResolverOptions, ApiMessageData } from '@mfkn/fkn-web'

// import { proxyFetch } from './proxy'
import './location'
import resolvers from './resolvers'
import { registerListener, makeCallListener } from 'osra'
import { fetch } from './proxy'

// import { Resolvers as PackageResolvers } from './package'
// import { Resolvers as ProxyResolvers } from './proxy'

export type {
  ApiResolverOptions,
  ApiMessageData
}

export { fetch } from './proxy'
// export { fetch, proxyFetch, evalFetch } from './proxy'
export { torrent } from './torrent'

export { default as events } from './events'

// const resolvers = {
//   // ...PackageResolvers,
//   // ...ProxyResolvers
// }

// todo: Rework the listener interface to be able to run the listener filters directly from the host to reduce latency & memory usage

if (window.parent !== window) {
  window.addEventListener('message', async ev => {
    const { data: messageData, origin }: { data: ApiMessageData } & Omit<MessageEvent, 'data'> = ev
    if (
      !ev.source
      || messageData?.source !== 'oz-package-api'
      || origin !== process.env.WEB_ORIGIN
    ) return

    const { type, data, port } = messageData
    const resolver = resolvers[type]
    resolver({ port, data })
  })
}

// navigator.serviceWorker.addEventListener('message', ev => {
//   const { data: messageData, origin }: { data: ApiMessageData } & Omit<MessageEvent, 'data'> = ev
//   if (
//     !ev.source
//     || messageData?.source !== 'oz-service-worker-api'
//     || origin !== location.origin
//   ) return
//   if (messageData?.type) {
//     const { data: { input, init }, port } = messageData
//     console.log('input, init', input, init)
//     fetch(input, init).then(res => port.postMessage(res))
//   }
// })

const serviceWorkerResolvers = {
  FETCH: makeCallListener(async ({ input, init }: { input: RequestInfo, init?: RequestInit | undefined }) => {
    const res = await fetch(input, init)

    const ret = {
      headers: [...res.headers.entries()],
      ok: res.ok,
      redirected: res.redirected,
      status: res.status,
      statusText: res.statusText,
      type: res.type,
      url: res.url,
      body: res.body
    }
    return ret
  }),
  PROXY: makeCallListener(({ input, init }: { input: RequestInfo, init?: RequestInit | undefined }) => void console.log('lib PROXY fetch') || fetch(input, init))
}

export type ServiceWorkerResolvers = typeof serviceWorkerResolvers

registerListener({
  target: navigator.serviceWorker,
  resolvers: serviceWorkerResolvers
})

export {
  resolvers
}

type Resolvers = typeof resolvers

export type {
  Resolvers
}
