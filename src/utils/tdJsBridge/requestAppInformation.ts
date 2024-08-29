import { isString } from 'lodash'
import { coreSdkFn } from './core'
import tdJsBridge from './index'

export interface IAPPInfo {
  appVersionName: string
  appPlatform: 1 | 6 | 2 | 7
  userId: string | null
  authorization: string | null
}

// 预留参数
const requestAppInformation = async (params?: any): Promise<IAPPInfo> => {
  const { isYMTDIOS, isYMTDAndroid } = tdJsBridge
  const data = await new Promise((resolve, reject) => {
    if (isYMTDIOS) {
      const _params = params || {}
      coreSdkFn('requestAppInformation')(_params)

      window.requestAppInformation = resolve
    } else if (isYMTDAndroid) {
      const data = coreSdkFn('requestAppInformation')(params)
      resolve(data)
    }
  })
  // .then(() => {
  //   if (window.requestAppInformation) {
  //     window.requestAppInformation = null
  //   }
  // })

  return isString(data) ? JSON.parse(data) : data
}

export default requestAppInformation
