
const WEB_ORIGIN = import.meta.env.VITE_WEB_ORIGIN
if (!WEB_ORIGIN) throw new Error('Missing "WEB_ORIGIN" environment variable')

export const isWorker = globalThis.window === undefined

export const foundIframe =
  globalThis
    .document
    ?.body
    .querySelector<HTMLIFrameElement>(`iframe[src="${`${WEB_ORIGIN}/sandbox-api`}"]`)
console.log('foundIframe', foundIframe)

export const createdIframe =
  !foundIframe
    ? globalThis.document?.createElement('iframe')
    : undefined
console.log('createdIframe', createdIframe)

if (createdIframe) {
  console.log('CREAAAAAAATED IFRAME')
  createdIframe.src = `${WEB_ORIGIN}/sandbox-api`
  createdIframe.style.display = 'none'
  document.body.appendChild(createdIframe)
}

export const iframe =
  globalThis.window?.parent === globalThis.window
    ? foundIframe ?? createdIframe
    : undefined
console.log('iframe', iframe)

export const targetWindow =
  globalThis.window?.parent === globalThis.window
    ? iframe?.contentWindow
    : globalThis.window?.parent
console.log('targetWindow', targetWindow, globalThis.window?.parent === globalThis.window, iframe, iframe?.contentWindow)
