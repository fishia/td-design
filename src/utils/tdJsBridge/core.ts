import { isString } from 'lodash'
import tdJsBridge from './index'

type TypeSkdName = 'shareData' | 'openNativePage' | 'requestAppInformation'

const coreBridgeFn = () => (sdkName: TypeSkdName) => {
  const { isYMTDIOS, isYMTDAndroid } = tdJsBridge
  if (isYMTDIOS) {
    return (params: any) => {
      const p = JSON.stringify(params)
      const data = window?.webkit?.messageHandlers?.[sdkName].postMessage(p)

      if (data) {
        return isString(data) ? JSON.parse(data) : data
      }
    }
  }

  if (isYMTDAndroid) {
    return (parmas: any) => {
      const p = JSON.stringify(parmas)
      const data = parmas
        ? window?.android?.[sdkName](p)
        : window?.android?.[sdkName]()
      if (data) {
        return isString(data) ? JSON.parse(data) : data
      }
    }
  }

  return () => {}
}

export const coreSdkFn = coreBridgeFn()
