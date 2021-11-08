import { Api } from '@mfkn/oz-web/lib/api/api'
import { call } from './utils/call'

new ResizeObserver(entries => {
  for (const entry of entries) {
    call(
      Api.RESIZE,
      {
        bottom: entry.contentRect.bottom,
        height: entry.contentRect.height,
        left: entry.contentRect.left,
        right: entry.contentRect.right,
        top: entry.contentRect.top,
        width: entry.contentRect.width,
        x: entry.contentRect.x,
        y: entry.contentRect.y
      }
    )
  }
})
  .observe(document.body)
