// import type { ProxyFetchRequestInit, FetchInitOptions, ProxyFetchRequestInfo } from '@mfkn/fkn-web/src/api/proxy/fetch'

import { call } from './utils/call'

interface fetchInitOptions {
  proxyCache?: string
  proxyDelay?: string
  proxyRuntime?: boolean
  noProxy?: boolean
}

type NativeFetch = typeof globalThis.fetch

type ProxyFetchRequestInit = Omit<RequestInit, "body" | "headers" | "signal"> & {
  body: Exclude<RequestInit['body'], FormData | URLSearchParams>;
  headers: Exclude<RequestInit['headers'], Headers>;
}

type FetchInitOptions = {
  proxyCache?: string | undefined;
  proxyDelay?: string | undefined;
  proxyRuntime?: boolean | undefined;
  noProxy?: boolean | undefined;
}

type ProxyFetchRequestInfo = string | Omit<Request, "arrayBuffer" | "text" | "headers" | "signal" | "clone" | "blob" | "formData" | "json">

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
