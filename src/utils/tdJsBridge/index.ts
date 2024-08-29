import { includes } from 'lodash'
import openNativePage from './openNativePage'
import requestAppInformation from './requestAppInformation'
import shareData from './shareData'

declare global {
  interface Window {
    webkit: any
    android: any
    requestAppInformation: any
  }
}

const isYMTDIOS = includes(window.navigator.userAgent, 'ymtd-ios')

const isYMTDAndroid = includes(window.navigator.userAgent, 'ymtd-android')

export default {
  shareData,
  isYMTDIOS,
  isYMTDAndroid,
  openNativePage,
  requestAppInformation,
}
