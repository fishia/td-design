import { coreSdkFn } from './core'

export type IPageParams =
  | IBasePageParams
  | ICompanyParams
  | IConversationParams
  | IPUSHMIni

export interface IBasePageParams {
  routeName: string
  activityType?: string
}

// 公司详情
export interface ICompanyParams extends IBasePageParams {
  routeName: 'ymtd/c/companyDetail'
  companyId: string
}

// IM页面
export interface IConversationParams extends IBasePageParams {
  routeName: 'ymtd/c/Conversation'
  rcUserId?: string
  jdId?: number
}

export interface IPUSHMIni extends IBasePageParams {
  routeName: 'ymtd/pushHewaMini'
  miniAppId: string
  miniRoute: string
}

const openNativePage = (params: IPageParams) => {
  coreSdkFn('openNativePage')(params)
}

export default openNativePage
