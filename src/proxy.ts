import { Api } from '@mfkn/oz-web/lib/index'

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
