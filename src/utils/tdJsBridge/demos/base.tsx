import { tdJsBridge } from 'td-design'

const demo = () => {
  // 是否医脉同道安卓端
  console.log(tdJsBridge.isYMTDAndroid)

  // 是否医脉同道苹果端
  console.log(tdJsBridge.isYMTDIOS)

  // 获取APP信息
  tdJsBridge.requestAppInformation().then(info => {
    // 获取版本号
    console.log(info.appVersionName)

    // 获取APP平台
    console.log(info.appPlatform)

    // 获取用户id
    console.log(info.userId)

    // 获取token
    console.log(info.authorization)
  })

  // 打开APP内部页面
  tdJsBridge.openNativePage({
    routeName: 'ymtd/c/Conversation',
    rcUserId: 'xxxx',
    jdId: 1233,
  })

  // 设置分享信息
  tdJsBridge.shareData({
    title: '医脉同道',
    url: 'xxx',
  })
}

export default demo
