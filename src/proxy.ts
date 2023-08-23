// import type { ProxyFetchRequestInit, FetchInitOptions, ProxyFetchRequestInfo } from '@mfkn/fkn-web/src/api/proxy/server-proxy-fetch'

import { call } from './utils/call'

export type NativeFetch = typeof globalThis.fetch

export type ProxyFetchRequestInit = Omit<RequestInit, "body" | "headers" | "signal"> & {
  body: Exclude<RequestInit['body'], FormData | URLSearchParams>;
  headers: Exclude<RequestInit['headers'], Headers>;
}

export type FetchInitOptions = {
  proxyCache?: string | undefined;
  proxyDelay?: string | undefined;
  proxyRuntime?: boolean | undefined;
  noProxy?: boolean | undefined;
}

export type ProxyFetchRequestInfo = string | Omit<Request, "arrayBuffer" | "text" | "headers" | "signal" | "clone" | "blob" | "formData" | "json">

export const serverProxyFetch = async (_input: Parameters<NativeFetch>[0], _init?: Parameters<NativeFetch>[1]) => {
  const input = _input as ProxyFetchRequestInfo
  const init = _init as ProxyFetchRequestInit & FetchInitOptions
  const { body, ...rest } = await call('SERVER_PROXY_FETCH', { input, init })
  return new Response(
    body,
    {
      ...rest,
      headers: {
        ...rest.headers,
        ...rest.headers && {
          setCookie: rest.headers['set-cookie']
        }
      }
    }
  )
}
