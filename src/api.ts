import type { SandboxResolvers } from '@mfkn/fkn-web/src/api/sandbox'
import type { SandboxApiResolvers } from '@mfkn/fkn-web/src/api/resolvers'

import type { Target } from 'osra'

import { call } from 'osra'

import { target, setTarget } from './target'
import { iframe, targetWindow, isWorker } from './dom'

const WEB_ORIGIN = import.meta.env.VITE_WEB_ORIGIN
if (!WEB_ORIGIN) throw new Error('Missing "WEB_ORIGIN" environment variable')

export const setApiTarget = (messagePort: Target | Promise<Target>) => setTarget(messagePort)

export const apiTargetIsReady = () => target

export const getApiTargetPort = async () =>
  call<SandboxApiResolvers>(await apiTargetIsReady()!, { key: 'fkn-sandbox-api' })('API_PORT', {})

if (!isWorker) {
  if (!iframe) throw new Error('Missing appended iframe')
  const interval =
    setInterval(() =>
      call<SandboxResolvers>(targetWindow!, { key: 'fkn-sandbox' })('APP_READY', {})
        .then(() => {
          setTarget(targetWindow!)
          clearInterval(interval)
        })
        .catch(() => {
          console.warn('Failed to connect to sandbox, trying again in 10ms')
        })
    , 10)
} else {
  let hasResolved = false
  target.then(() => {
    hasResolved = true
  })
  setTimeout(() => {
    if (!hasResolved) console.warn(`@fkn/lib's api target has not resolved after 250ms while in a worker, make sure to call \`setApiTarget(messagePort)\``)
  }, 250)
}
