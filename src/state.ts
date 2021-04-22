import Api from '@oz/web/src/api/operations'
import { call } from './utils/call'
import pull from './utils/pull'

export const stateChanged = () => pull(Api.STATE_CHANGED)

export const getState = () => call(Api.GET_STATE)

export const setState = state => call(Api.SET_STATE, state)
