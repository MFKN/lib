import type { ProxyFetchRequestInit, FetchInitOptions } from '@mfkn/fkn-web/src/api/proxy/fetch'

import { call } from './utils/call'


interface fetchInitOptions {
  proxyCache?: string
  proxyDelay?: string
}

export const fetch = async (input: RequestInfo, _init?: RequestInit & fetchInitOptions) => {
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
