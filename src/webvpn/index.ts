import { call } from '../utils/call'

type WebVPNWebTransportResponse = {
  ready: undefined
  close: ({ closeCode, reason }: { closeCode?: number, reason?: string }) => void
  incomingBidirectionalStreams: ReadableStream<any>
  incomingUnidirectionalStreams: ReadableStream<any>
  createBidirectionalStream: () => Promise<{
    readable: ReadableStream<any>
    writable: WritableStream<any>
  }>
  createUnidirectionalStream: () => Promise<WritableStream<any>>
  datagrams: {
    incomingHighWaterMark: number
    setIncomingHighWaterMark: (value: number) => void
    incomingMaxAge: number
    setIncomingMaxAge: (value: number) => void
    maxDatagramSize: number
    outgoingHighWaterMark: number
    setOutgoingHighWaterMark: (value: number) => void
    outgoingMaxAge: number
    setOutgoingMaxAge: (value: number) => void
    readable: ReadableStream<any>
    writable: WritableStream<any>
  }
}

export class WebVPNWebTransport implements WebTransport {
  // @ts-expect-error
  _internals: Promise<WebVPNWebTransportResponse>
  // @ts-expect-error
  _awaitedInternals: WebVPNWebTransportResponse
  closed: Promise<WebTransportCloseInfo>

  constructor () {
    this.closed = new Promise((resolve) => {
      this._internals = call(
        'WEBVPN_WEBTRANSPORT',
        {
          close: ({ closeCode, reason }: { closeCode?: number, reason?: string }) =>
            resolve({ closeCode, reason })
        }
      )
      this._internals.then(internals => {
        this._awaitedInternals = internals
      })
    })
  }

  close (closeInfo?: WebTransportCloseInfo) {
    this._internals.then(({ close }) => close(closeInfo ?? {}))
  }

  get ready () {
    return this._internals.then(() => undefined)
  }

  get incomingBidirectionalStreams () {
    return this._awaitedInternals.incomingBidirectionalStreams
  }

  get incomingUnidirectionalStreams () {
    return this._awaitedInternals.incomingUnidirectionalStreams
  }

  async createBidirectionalStream () {
    const { readable, writable } = await this._awaitedInternals.createBidirectionalStream()
    return { readable, writable }
  }

  createUnidirectionalStream () {
    return this._awaitedInternals.createUnidirectionalStream()
  }

  get datagrams () {
    const self = this
    return {
      get incomingHighWaterMark () {
        return self._awaitedInternals.datagrams.incomingHighWaterMark
      },
      set incomingHighWaterMark (value: number) {
        self._awaitedInternals.datagrams.setIncomingHighWaterMark(value)
      },
      get incomingMaxAge () {
        return self._awaitedInternals.datagrams.incomingMaxAge
      },
      set incomingMaxAge (value: number) {
        self._awaitedInternals.datagrams.setIncomingMaxAge(value)
      },
      get maxDatagramSize () {
        return self._awaitedInternals.datagrams.maxDatagramSize
      },
      get outgoingHighWaterMark () {
        return self._awaitedInternals.datagrams.outgoingHighWaterMark
      },
      set outgoingHighWaterMark (value: number) {
        self._awaitedInternals.datagrams.setOutgoingHighWaterMark(value)
      },
      get outgoingMaxAge () {
        return self._awaitedInternals.datagrams.outgoingMaxAge
      },
      set outgoingMaxAge (value: number) {
        self._awaitedInternals.datagrams.setOutgoingMaxAge(value)
      },
      get readable () {
        return self._awaitedInternals.datagrams.readable
      },
      get writable () {
        return self._awaitedInternals.datagrams.writable
      }
    }
  }
}
