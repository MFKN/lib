import { makeEventChannelCall } from '../utils/send'

interface TorrentOptions {
  uri: string
}

export const torrent = (magnet: string | TorrentOptions) => {
  // const { send, events } = makeEventChannelCall('TORRENT', { magnet })
  
  return {
    // unsubscribe: () => send('remove')
  }
}
