import { Api } from '@mfkn/oz-web/lib/api/api'

import { call } from './utils/call'

export const fetch = async (input: RequestInfo, init?: RequestInit) => {
  const { body, ...rest } = await call(Api.RAW_FETCH, { input, init })

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

export const proxyFetch = async (input: RequestInfo, init?: RequestInit) => {
  const { body, ...rest } = await call(Api.RAW_FETCH, { input, init })

  return {
    ...rest,
    headers: {
      ...rest.headers,
      setCookie: rest.headers['set-cookie']
    },
    body: new Blob([new Uint8Array(body)])
  }
}

export const evalFetch = async (input: RequestInfo, init?: RequestInit, args?: any) => {
  console.log('AAAAAAAAAAAAAAAAA')
  const { body, ...rest } = await call(Api.EVAL_FETCH, { input, init, arguments: args })
  console.log('AAAAAAAAAAAAAAAAA')

  return {
    ...rest,
    headers: {
      ...rest.headers,
      setCookie: rest.headers['set-cookie']
    },
    body: new Blob([new Uint8Array(body)])
  }
}
