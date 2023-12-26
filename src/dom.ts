
const WEB_ORIGIN = import.meta.env.VITE_WEB_ORIGIN
if (!WEB_ORIGIN) throw new Error('Missing "WEB_ORIGIN" environment variable')

export const isWorker = globalThis.window === undefined

export const createdIframe = globalThis.document?.createElement('iframe')

export const foundIframe = createdIframe

if (createdIframe) {
  createdIframe.src = `${WEB_ORIGIN}/sandbox-api`
  createdIframe.style.display = 'none'
  document.body.appendChild(createdIframe)
}

export const iframe = createdIframe

export const targetWindow = iframe?.contentWindow
