
const WEB_ORIGIN = import.meta.env.VITE_WEB_ORIGIN
if (!WEB_ORIGIN) throw new Error('Missing "WEB_ORIGIN" environment variable')

export const isWorker = globalThis.window === undefined

export const foundIframe =
  globalThis
    .document
    ?.body
    .querySelector<HTMLIFrameElement>(`iframe[src="${`${WEB_ORIGIN}/sandbox-api`}"]`)

export const createdIframe =
  !foundIframe
    ? globalThis.document?.createElement('iframe')
    : undefined

if (createdIframe) {
  createdIframe.src = `${WEB_ORIGIN}/sandbox-api`
  createdIframe.style.display = 'none'
  document.body.appendChild(createdIframe)
}

export const iframe =
  globalThis.window?.parent === globalThis.window
    ? foundIframe ?? createdIframe
    : undefined

export const targetWindow =
  globalThis.window?.parent === globalThis.window
    ? iframe?.contentWindow
    : globalThis.window?.parent
