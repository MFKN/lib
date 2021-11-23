import { call } from './utils/call'

interface fetchInitOptions {
  proxyCache?: string
  proxyDelay?: string
}

export const fetch = async (input: RequestInfo, init?: RequestInit & fetchInitOptions) => {
  const { body, ...rest } = await call('FETCH', { input, init })
  console.log('hmm', rest)
  return new Response(
    new Blob([new Uint8Array(body)]),
    {
      ...rest,
      headers: {
        ...rest.headers,
        setCookie: rest.headers['set-cookie']
      }
    }
  )
}
