import { call } from '../utils/call'

export type TorrentOptions = {
  magnet: string
  path: string
  offset?: number
  end?: number
}

export const torrent = async ({ magnet, path, offset, end }: TorrentOptions) => {
  const { body, ...rest } = await call('TORRENT', { magnet, path, offset, end })
  return new Response(
    body,
    {
      ...rest,
      headers: Object.fromEntries(rest.headers)
    }
  )
}

export const torrentFile = async ({ magnet }: { magnet: string }) => {
  const { body, ...rest } = await call('TORRENT_FILE', { magnet })
  return new Response(
    body,
    {
      ...rest,
      headers: Object.fromEntries(rest.headers)
    }
  )
}
