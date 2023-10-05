import { Target } from 'osra'

export let _resolve, _reject
export let target: Promise<Target>

export const initTargetPromise = () => {
  target = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  return target
}

export const initialTargetPromise = initTargetPromise()

export const setTarget = async (newTarget: Target | Promise<Target>) => {
  if (newTarget === initialTargetPromise) initTargetPromise()
  _resolve(await newTarget)
}
