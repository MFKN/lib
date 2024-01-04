const WEB_ORIGIN = import.meta.env.VITE_WEB_ORIGIN
if (!WEB_ORIGIN) throw new Error('Missing "WEB_ORIGIN" environment variable')

export const isWorker = globalThis.window === undefined

const foundIframe = globalThis?.document.querySelector<HTMLIFrameElement >(`iframe[src="${WEB_ORIGIN}/sandbox-api"]`)

const createdIframe = globalThis.document?.createElement('iframe')

if (!foundIframe && createdIframe) {
  createdIframe.src = `${WEB_ORIGIN}/sandbox-api`
  createdIframe.style.display = 'none'
  document.body.appendChild(createdIframe)
}
export const iframe = foundIframe ? foundIframe : createdIframe

export const targetWindow = iframe?.contentWindow
