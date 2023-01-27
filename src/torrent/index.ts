// import type { TorrentOptions } from '@mfkn/fkn-web/src/api/torrent/torrent'

import { call } from '../utils/call'

export type TorrentOptions =
  ({ url: string } | { arrayBuffer: ArrayBuffer }) &
  {
    fileIndex: number
    offset?: number
    end?: number
  }

export const torrent = async ({ fileIndex, offset, end, ...optionsRest }: TorrentOptions) => {
  const { body, ...rest } = await call('TORRENT', { ...optionsRest, fileIndex, offset, end })
  return new Response(
    body,
    {
      ...rest,
      headers: Object.fromEntries(rest.headers)
    }
  )
}

export const torrentStatus = async (hash: string) => call('TORRENT_STATUS', { hash })
