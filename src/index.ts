import './location'
import resolvers from './resolvers'
import { registerListener, makeCallListener } from 'osra'
import { fetch } from './proxy'

export { fetch } from './proxy'
export { torrent, torrentStatus } from './torrent'

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
  PROXY: makeCallListener(({ input, init }: { input: RequestInfo, init?: RequestInit | undefined }) => fetch(input, init))
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
