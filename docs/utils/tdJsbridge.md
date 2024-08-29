---
apiHeader: false
title: TdJsBridge APP通信sdk
toc: content

group:
  title: 工具类
  order: 2
---

医脉 h5 与 APP 通信的 sdk。

## 简介

该 sdk 导出各种实用的工具，抹平了`ios`和`Android`的调用差异，让开发者只关注功能和需求，提供方便的 sdk 用于`h5`和`APP`通信，以及获取 APP 的各类数据，此 sdk 将跟随需求持续更新。目前的用法有：

- 获取 APP 的信息，如用户 id，token，以及 app 版本和其他信息。
- 调起 APP 分享功能。
- 跳转到 APP 的各个页面。
- 便捷的环境判断。

## 使用说明

<!-- <code src="../../src/utils/tdJsBridge/demos/base.tsx">基本用法</code> -->

```javascript | pure
import { tdJsBridge } from 'td-design'

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
```

## API 详情

| 导出的方法            | 说明                              | 类型                                                      |
| --------------------- | --------------------------------- | --------------------------------------------------------- |
| isYMTDIOS             | 当前 h5 是否在医脉同道 IOS 内打开 | `boolean`                                                 |
| isYMTDAndroid         | 当前 h5 是否在医脉同道安卓内打开  | `boolean`                                                 |
| shareData             | h5 调用 APP 分享                  | `(params: `[IShareData](#isharedata)`) => viod`           |
| openNativePage        | 跳转到 APP 的原生页面             | `(params: `[IOpenNativePage](#iopennativepage)`) => void` |
| requestAppInformation | 拿到 APP 的参数                   | `() => Promise<`[IAPPInformation](#iappinformation)`>`    |

### IShareData

设置 APP 分享的数据，并且控制是否有分享按钮，如果没有分享按钮则需要传空

| 值          | 类型     | 说明                 |
| ----------- | -------- | -------------------- |
| title       | `string` | APP 分享的 title     |
| momentsDesc | `string` | APP 分享朋友圈文案   |
| url         | `string` | APP 分享的页面链接   |
| desc        | `string` | app 分享文案         |
| icon        | `string` | app 分享图片 icon    |
| shareImgUrl | `string` | 分享弹窗图片下载地址 |

### IOpenNativePage

```
{
	routeName: "", 见下表
}
```

#### routeName

| 值                   | 说明                     | 端口    | 其他参数                                                    |
| -------------------- | ------------------------ | ------- | ----------------------------------------------------------- |
| ymtd/b/main          | B 端首页                 | B-APP   | `-`                                                         |
| ymtd/b/talent        | B 端首页-人才页 tab      | B-APP   | { activityType?: number } 活动参数                          |
| ymtd/b/publishJD     | 发布职位                 | B-APP   | { activityType?: number} 活动参数                           |
| ymtd/b/jdManage      | 职位管理页               | B-APP   | { activityType?: number } 活动参数                          |
| ymtd/c/main          | C 端首页                 | C-APP   | `-`                                                         |
| ymtd/c/companyDetail | C 公司主页面             | C-APP   | { companyId：string } 公司 ID                               |
| ymtd/c/job           | C 端首页-职位 tab        | C-APP   | { activityType?: number } 活动参数                          |
| ymtd/c/Conversation  | C 端 IM 详情页           | C-APP   | { activityType?: number, rcUserId?: string, jdId?: number } |
| ymtd/c/jdDetails     | C 端职位详情页面         | C-APP   | { activityType?: number, jdId: number }                     |
| ymtd/c/profileTopPay | C 端简历置顶调起微信支付 | C-APP   | `-`                                                         |
| ymtd/servicePhone    | 调起客服电话             | B/C-APP | `-`                                                         |
| ymtd/appUpdate       | 调起升级弹窗             | B/C-APP | `-`                                                         |
| ymtd/pushHewaMini    | 调起禾蛙/任意小程序      | B/C-APP | { miniAppId?: string, miniRoute }                           |

### IAPPInformation

| 字段名称       | 类型     | 描述                                             |
| -------------- | -------- | ------------------------------------------------ |
| appVersionName | `string` | APP 版本名称，例如“1.8.0”                        |
| appPlatform    | `string` | ios B: 1 ,ios C: 6 , Android B: 2 , Android C: 7 |
| userId         | `string` | 用户 id                                          |
| authorization  | `string` | 用户 token                                       |
