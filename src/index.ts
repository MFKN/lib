import type { ApiResolverOptions, ApiMessageData } from '@mfkn/fkn-web'

// import { proxyFetch } from './proxy'
import './location'
import resolvers from './resolvers'

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

navigator.serviceWorker.addEventListener('message', ev => {
  const { data: messageData, origin }: { data: ApiMessageData } & Omit<MessageEvent, 'data'> = ev
  if (
    !ev.source
    || messageData?.source !== 'oz-service-worker-api'
    || origin !== location.origin
  ) return
  if (messageData?.type) {
    const { data: { input, init }, port } = messageData
    fetch(input, init).then(res => port.postMessage(res))
  }
})

export {
  resolvers
}

type Resolvers = typeof resolvers

export type {
  Resolvers
}
