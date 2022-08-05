
export const webOriginSymbol = Symbol.for('__FKN_GLOBAL_WEB_ORIGIN__')
export const WEB_ORIGIN = globalThis[webOriginSymbol]

export const webSandboxOriginSymbol = Symbol.for('__FKN_GLOBAL_WEB_SANDBOX_ORIGIN__')
export const WEB_SANDBOX_ORIGIN = globalThis[webSandboxOriginSymbol]
