import Api from '@mfkn/oz-web'
import { makeEventChannelCall } from '../utils/send'

interface TorrentOptions {
  uri: string
}

export const torrent = (magnet: string | TorrentOptions) => {
  const { send, events } = makeEventChannelCall(Api.TORRENT, { magnet })
  console.log('package torrent', Api.TORRENT)
  
  return {
    unsubscribe: () => send('remove')
  }
}
