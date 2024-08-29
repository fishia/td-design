import { coreSdkFn } from './core'

export interface IShareData {
  title?: string // APP分享title
  momentsDesc?: string // APP 分享朋友圈title
  url?: string // app分享的页面链接
  desc?: string // app 分享副标题
  icon?: string // app 分享图片icon
  shareType?: number
  shareImgUrl?: string // 分享出图片弹窗，的图片地址
}

const shareData = (params: IShareData) => {
  coreSdkFn('shareData')(params)
}

export default shareData
