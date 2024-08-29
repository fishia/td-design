import CollectEventSDK from './core'

export interface IInitParam {
  app_id: number
  channel?: 'cn' | 'va' | 'sg'
  channel_domain?: string
  app_key?: string
  caller?: string
  log?: boolean
  disable_webid?: boolean
  disable_sdk_monitor?: boolean
  disable_storage?: boolean
  autotrack?: any
  enable_stay_duration?: any
  disable_route_report?: boolean
  disable_session?: boolean
  disable_heartbeat?: boolean
  disable_auto_pv?: boolean
  enable_spa?: boolean
  user_unique_type?: string
  enable_ab_test?: boolean
  max_storage_num?: number
  enable_storage?: boolean
  enable_cookie?: boolean
  enable_ab_visual?: boolean
  cross_subdomain?: boolean
  cookie_domain?: string
  enable_multilink?: boolean
  multilink_timeout_ms?: number
  reportTime?: number
  timeout?: number
  max_report?: number
  report_url?: string
  maxDuration?: number
  ab_channel_domain?: string
  configPersist?: number
  extend?: any
  ab_timeout?: number
  disable_tracer?: boolean
  extendConfig?: any
  filter?: any
  spa?: boolean
  cookie_expire?: number
  enable_custom_webid?: boolean
  disable_track_event?: boolean
  allow_hash?: boolean
  enable_native?: boolean
  ab_cross?: boolean
  ab_cookie_domain?: string
  disable_ab_reset?: boolean
  enable_encryption?: boolean
  enable_anonymousid?: boolean
  enable_debug?: boolean
  crypto_publicKey?: string
  encryption_type?: string
  encryption_header?: string
  enable_logsetting?: boolean
  enable_track_id?: boolean
  track_level?: number
  overlay_opacity?: number
  auto_exposure_expriment?: boolean
}

export interface IConfigParam {
  _staging_flag?: 0 | 1
  user_unique_id?: string
  disable_auto_pv?: boolean
  web_id?: string
  user_type?: number
  os_name?: string
  os_version?: string
  device_model?: string
  ab_client?: string
  ab_version?: string
  ab_sdk_version?: string
  traffic_type?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  platform?: string
  browser?: string
  browser_version?: string
  region?: string
  province?: string
  city?: string
  language?: string
  timezone?: number
  tz_offset?: number
  screen_height?: number
  screen_width?: number
  referrer?: string
  referrer_host?: string
  os_api?: number
  creative_id?: number
  ad_id?: number
  campaign_id?: number
  ip_addr_id?: number
  user_agent?: string
  verify_type?: string
  sdk_version?: string
  channel?: string
  app_id?: number
  app_name?: string
  app_version?: string
  app_install_id?: number
  user_id?: any
  device_id?: any
  wechat_openid?: string
  wechat_unionid?: string
  evtParams?: EventParams
  reportErrorCallback?(eventData: any, errorCode: any): void
  [key: string]: any
}

type EventParams = Record<string, any>

export default CollectEventSDK
