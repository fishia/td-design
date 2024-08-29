---
apiHeader: false
title: TdDataRangers 火山埋点sdk
toc: content

group:
  title: 工具类
  order: 3
---

多端同时上报埋点的火山 sdk。

## 简介

该 sdk 解决了 web 端同时需要上报 B 端和 C 端数据，甚至更多端，配置使用简单。目前的用法有：

- 支持多端同时上报。
- 上报事件、包含路由上报事件。
- 设置、重置、获取 webId，uuid
- 获取所有 ABTest 的参数，聚合成键值对返回。
- 或许特定的 ABTest 的参数。
- 手动 predefinePageView 事件上报。

## 使用说明

<code src="../../src/utils/TdDataRangers/demos/index.tsx">基本用法</code>
<code src="../../src/utils/TdDataRangers/demos/demo2.tsx">获取实验参数</code>

```javascript | pure
import { TdDataRangers } from 'td-design'

// 构造一个火山埋点对象，可以传平台类型过去，不传默认医脉bpc
const obj = new TdDataRangers()
// 初始化
obj.initDataRangers()
// 上报埋点事件
obj.sendDataRangersEvent('page_view', {
  page_name: '测试',
  come_from: '消息通知',
})

// 构造多端上报
const dataRanger = new TdDataRangers() // 默认bpc
const dataRanger_c = new TdDataRangers('c')
dataRanger.initDataRangers()
dataRanger.sendDataRangersEvent('page_view', {
  page_name: '测试',
  come_from: '消息通知',
})
dataRanger_c.initDataRangers(
  { app_id: process.env.NODE_ENV === 'production' ? 10000006 : 10000007 },
  {
    // 自定义属性
    evtParams: {
      app_name:
        process.env.NODE_ENV === 'production' ? 'ym_c_prod' : 'ym_c_dev',
      ym_platform: '小程序',
    },
  },
)
```

## API 详情

| 导出的方法              | 说明                                                                                                                                                              | 类型                                                                                                                                                                                                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trackEvent              | 事件触发，如果在一个代码库里做多端上报，需要在事件前面自定义个字符串进行区分                                                                                      | `(eventName: string, eventData?: Record<string, any>)=>void`                                                                                                                                                                                                            |
| initDataRangers         | sdk 初始化，包括 init,config,start,设置默认 webId                                                                                                                 | `(initOptions?: `[IInitParam](https://www.volcengine.com/docs/56651/783982#_3-8-%E5%88%9D%E5%A7%8B%E5%8C%96%E9%85%8D%E7%BD%AE%E4%B8%80%E8%A7%88%E8%A1%A8)`, configOptions?: `[IInitParam](https://www.volcengine.com/docs/56651/1278201#_4-1-config-paramsobj)`)=>void` |
| setDataRangersUserId    | 设置 uuid                                                                                                                                                         | `(userId: string \| number) => viod`                                                                                                                                                                                                                                    |
| resetDataRangersUserId  | 将 uuid 重置 webId                                                                                                                                                | `() => void`                                                                                                                                                                                                                                                            |
| getDataRangersWebId     | 获取 webId                                                                                                                                                        | `() => string \| number`                                                                                                                                                                                                                                                |
| sendDataRangersEvent    | 火山埋点事件上报                                                                                                                                                  | `() => void`                                                                                                                                                                                                                                                            |
| sendDataRangerByPrePage | 火山埋点带路由上报事件                                                                                                                                            | `() => void`                                                                                                                                                                                                                                                            |
| getABTestParamValue     | 获取 A/B 测试的实验参数                                                                                                                                           | `(key: string,defaultValue?: T,)=> Promise<T \| undefined>`                                                                                                                                                                                                             |
| getAllABTestParamValues | 获取 所有 A/B 测试的实验参数，聚合成键值对返回                                                                                                                    | `<T extends Record<string, any>>()=> Promise<T>`                                                                                                                                                                                                                        |
| sendPredefinePageView   | 手动上报 pv 事件（sdk 默认调用 predefine_pageview）,设置的自定义属性会和预设属性进行合并；同名则覆盖。<b>默认 disable_auto_pv 为 true，页面会主动上报一次 pv,</b> | `() => void`                                                                                                                                                                                                                                                            |
