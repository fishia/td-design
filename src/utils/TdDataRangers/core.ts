import { mapValues } from 'lodash'

import { IConfigParam, IInitParam } from '.'
import { getParam } from '../../util/tools'

const dataRangersWebIdRef: Record<'current', string | undefined> = {
  current: undefined,
}

const preUrl = process.env.REACT_APP_PRE_URL as string

export default class CollectEventSDK {
  platform: string
  constructor(
    platform = '',
    src = 'https://lf3-data.volccdn.com/obj/data-static/log-sdk/collect/5.0/collect-rangers-v5.1.7.js',
  ) {
    ;(function (win: any, exportObj: string) {
      win['LogAnalyticsObject'] = exportObj
      if (!win[exportObj]) {
        let _collect: any = function () {
          _collect.q.push(arguments)
        }
        _collect.q = _collect.q || []
        win[exportObj] = _collect
      }
      win[exportObj].l = +new Date()
    })(window, 'collectEvent')
    this.platform = platform
    const script = document.createElement('script')
    script.async = true
    script.src = src
    document.head.appendChild(script)
  }

  //事件触发，如果在一个代码库里做多端上报，需要在事件前面自定义个字符串进行区分
  trackEvent(eventName: string, eventData?: Record<string, any>) {
    window.collectEvent(
      `${this.platform ? `${this.platform}.` : ''}${eventName}`,
      eventData,
    )
  }
  // 初始化
  initDataRangers(initOptions?: IInitParam, configOptions?: IConfigParam) {
    this.trackEvent('init', {
      app_id: process.env.NODE_ENV === 'production' ? 10000010 : 10000011,
      channel_domain: 'https://ci-collect.data-growth.ciwork.cn',
      disable_sdk_monitor: true,
      spa: true,
      enable_ab_visual: true,
      enable_ab_test: true,
      clear_ab_cache_on_user_change: true,
      autotrack: true,
      log: process.env.NODE_ENV === 'development',
      ab_channel_domain: 'https://ci-collect.data-growth.ciwork.cn',
      ...initOptions,
    })

    this.trackEvent('config', {
      evtParams: {
        app_name:
          process.env.NODE_ENV === 'production' ? 'ym_b_prod' : 'ym_b_dev',
        ym_platform: 'Web_PC_B端',
      },
      ...configOptions,
    })

    this.trackEvent('start')

    window.collectEvent(
      `${this.platform ? `${this.platform}.` : ''}getToken`,
      (token: any) => {
        dataRangersWebIdRef.current = token.web_id
      },
    )
  }
  /** 火山埋点登记用户 ID */
  setDataRangersUserId(userId: string | number) {
    this.trackEvent('config', { user_unique_id: String(userId) })
  }

  sendPredefinePageView(params?: Record<string, any>) {
    this.trackEvent('predefinePageView', { ...params })
  }

  /** 火山埋点重置用户 ID */
  resetDataRangersUserId() {
    this.trackEvent('config', { user_unique_id: dataRangersWebIdRef.current })
  }

  getDataRangersWebId() {
    return dataRangersWebIdRef.current || ''
  }

  /** 火山埋点上报事件 */
  sendDataRangersEvent(eventName: string, eventBody?: object) {
    this.trackEvent(eventName, eventBody)
  }
  /* 火山埋点上报事件带路由 */
  sendDataRangerByPrePage = (
    baseEventName?: string,
    baseEventBody?: object,
  ) => {
    const { state } = window.history
    const windowPreUrl = getParam(window.location.href, 'preUrl')

    if (state?.pre_url) {
      sessionStorage.setItem(preUrl, state.pre_url)
    }
    const defaultEventBody = {
      current_url: window.location.href,
      pre_url:
        windowPreUrl ||
        state?.pre_url ||
        sessionStorage.getItem(preUrl) ||
        '/login/for-account',
      pre_url_full: state?.pre_url_full || '',
    }

    const sendDataRangers = (eventName: string, eventBody?: object) => {
      this.trackEvent(eventName, {
        ...defaultEventBody,
        ...eventBody,
      })
    }

    if (baseEventName) {
      sendDataRangers(baseEventName, baseEventBody)
    }

    return {
      sendDataRangers,
    }
  }
  /** 获取 A/B 测试的实验参数 */
  getABTestParamValue<T>(
    key: string,
    defaultValue?: T,
  ): Promise<T | undefined> {
    return new Promise(resolve => {
      try {
        window.collectEvent('getVar', key, defaultValue, (value: T) => {
          resolve(value)
        })
      } catch {
        resolve(defaultValue)
      }
    })
  }

  /** 获取所有 A/B 测试的实验参数，聚合成键值对返回 */
  getAllABTestParamValues<T extends Record<string, any>>(): Promise<T> {
    return new Promise(resolve => {
      window.collectEvent('getAllVars', (value: T) => {
        // 返回格式形如： { key1: { val: 1, vid: '123' }, ... }
        console.log('getAllVars', value)
        const newValue = mapValues(value, val => val.val)
        resolve(newValue)
      })
    })
  }
}
