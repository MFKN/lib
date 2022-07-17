
export default (
  window.parent === window
    ? (
      document
        .body
        .querySelector<HTMLIFrameElement>(`iframe[src="${`${process.env.WEB_ORIGIN}/sandbox-api`}"]`)!
    )
    : undefined
)
