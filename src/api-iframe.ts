
const WEB_ORIGIN = import.meta.env.VITE_WEB_ORIGIN
if (!WEB_ORIGIN) throw new Error('Missing WEB_ORIGIN environment variable')

const foundIframe =
  document
    .body
    .querySelector<HTMLIFrameElement>(`iframe[src="${`${WEB_ORIGIN}/sandbox-api`}"]`)

const createdIframe =
  !foundIframe
    ? document.createElement('iframe')
    : undefined

export const iframe =
  window.parent === window
    ? foundIframe ?? createdIframe
    : undefined

let _resolve, _reject
export const targetWindowIsReady = new Promise<void>((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

if (window.parent === window && !foundIframe) {
  iframe?.addEventListener('load', () => {
    _resolve()
  })
} else {
  _resolve()
}

if (createdIframe) {
  createdIframe.src = `${WEB_ORIGIN}/sandbox-api`
  createdIframe.style.display = 'none'
  document.body.appendChild(createdIframe)
}
