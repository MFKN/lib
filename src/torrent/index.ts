import type { Resolvers } from '@mfkn/fkn-web'
import type ParseTorrentFile from 'parse-torrent-file'

import { call } from '../utils/call'

type RemoteFetchType =
  Parameters<Resolvers['TORRENT']>[0]

export const torrent = async (input: RemoteFetchType['input'], file: RemoteFetchType['file']) => {
  const { torrentFile, torrent: { body, ...rest } } = await call('TORRENT', { input, file })
  return {
    torrentFile: torrentFile as ParseTorrentFile.Instance,
    torrent: new Response(
      body,
      {
        ...rest,
        headers: Object.fromEntries(rest.headers)
      }
    )
  }
}
