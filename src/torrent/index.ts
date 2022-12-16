import type { Resolvers } from '@mfkn/fkn-web'
import type ParseTorrentFile from 'parse-torrent-file'

import { call } from '../utils/call'

type RemoteTorrentType =
  Parameters<Resolvers['TORRENT']>[0]

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

type RemoteTorrentStatusType =
  Parameters<Resolvers['TORRENT_STATUS']>[0]

export const torrentStatus = async (hash: string) => {
  return call('TORRENT_STATUS', { hash })
}
