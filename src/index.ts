import type { ApiResolverOptions, ApiMessageData, InstalledPackage } from '@oz/web'

import { Resolvers as PackageResolvers } from './package'
import { Resolvers as ProxyResolvers } from './proxy'
import './click'

export type {
  ApiResolverOptions,
  ApiMessageData,
  InstalledPackage
}

export {
  onPackageIndexing,
  onPackageFetching
} from './package'

export { fetch } from './proxy'
export { torrent } from './torrent'

const resolvers = {
  ...PackageResolvers,
  ...ProxyResolvers
}

// todo: Rework the listener interface to be able to run the listener filters directly from the host to reduce latency & memory usage

if (window.parent !== window) {
  window.addEventListener('message', async function (ev) {
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
