import type { ApiResolverOptions, ApiMessageData } from '@mfkn/oz-web/src/api/api'

// import { Resolvers as PackageResolvers } from './package'
// import { Resolvers as ProxyResolvers } from './proxy'
import './click'

export type {
  ApiResolverOptions,
  ApiMessageData
}

export { fetch } from './proxy'
export { torrent } from './torrent'

export { default as events } from './events'

export { Api } from '@mfkn/oz-web/src/api/api'

const resolvers = {
  // ...PackageResolvers,
  // ...ProxyResolvers
}

// todo: Rework the listener interface to be able to run the listener filters directly from the host to reduce latency & memory usage

if (window.parent !== window) {
  window.addEventListener('message', async ev => {
    const { data: messageData, origin }: { data: ApiMessageData } & Omit<MessageEvent, 'data'> = ev

    if (
      !ev.source
      || messageData?.source !== 'oz-package-api'
      || origin !== 'null'
    ) return

    const { type, data, port } = messageData
    const resolver = resolvers[type]

    resolver({ port, data })
  })
}
