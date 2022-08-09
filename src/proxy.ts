import type { ProxyFetchRequestInit, FetchInitOptions, ProxyFetchRequestInfo } from '@mfkn/fkn-web/src/api/proxy/fetch'

import { call } from './utils/call'

interface fetchInitOptions {
  proxyCache?: string
  proxyDelay?: string
}

type NativeFetch = typeof globalThis.fetch

export const fetch = async (_input: Parameters<NativeFetch>[0], _init?: Parameters<NativeFetch>[1] & fetchInitOptions) => {
  const input = _input as ProxyFetchRequestInfo
  const init = _init as ProxyFetchRequestInit & FetchInitOptions
  const { body, ...rest } = await call('FETCH', { input, init })
  return new Response(
    body,
    {
      ...rest,
      headers: {
        ...rest.headers,
        setCookie: rest.headers['set-cookie']
      }
    }
  )
}
