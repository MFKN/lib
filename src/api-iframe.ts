
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

if (createdIframe) {
  createdIframe.src = `${WEB_ORIGIN}/sandbox-api`
  createdIframe.style.display = 'none'
  document.body.appendChild(createdIframe)
}

export default (
  window.parent === window
    ? foundIframe ?? createdIframe
    : undefined
)
