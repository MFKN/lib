import type { Resolvers } from '@mfkn/fkn-web'
import type ParseTorrentFile from 'parse-torrent-file'

import { call } from '../utils/call'

type RemoteTorrentType =
  Parameters<Resolvers['TORRENT']>[0]

export const torrent = async (input: RemoteTorrentType['input'], file?: RemoteTorrentType['file']) => {
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

type RemoteTorrentStatusType =
  Parameters<Resolvers['TORRENT_STATUS']>[0]

export const torrentStatus = async (uri: string, file?: RemoteTorrentStatusType['file']) => {
  return call('TORRENT_STATUS', { uri, file })
}
