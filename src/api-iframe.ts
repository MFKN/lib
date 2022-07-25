
const WEB_ORIGIN = process.env.WEB_ORIGIN

if (!WEB_ORIGIN) throw new Error('Missing WEB_ORIGIN environment variable')

export default (
  window.parent === window
    ? (
      document
        .body
        .querySelector<HTMLIFrameElement>(`iframe[src="${`${WEB_ORIGIN}/sandbox-api`}"]`)!
    )
    : undefined
)
