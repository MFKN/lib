import type browser from 'webextension-polyfill'

import { webExtensionCall } from '../utils/call'

export const declarativeNetRequestUpdateDynamicRules =
  (options: browser.DeclarativeNetRequest.UpdateDynamicRulesOptionsType): Promise<Boolean> =>
    webExtensionCall('DECLARATIVE_NET_REQUEST__UPDATE_DYNAMIC_RULES', options)
