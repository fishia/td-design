declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare interface IBasicProps {
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement> | any
}

declare interface Window {
  collectEvent(eventName: string, eventObj?: any, ...otherParams: any[])
  wx: wxApi
  openNativePage: (url: string, params?: string) => void
  webkit: any
  android: any
  __PRERENDER_INJECTED?: any
}

declare module 'react-resizable'
