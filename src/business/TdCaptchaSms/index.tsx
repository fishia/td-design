import React, {
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react'

declare global {
  interface Window {
    initAliyunCaptcha: (options: any) => void
  }
}

type TSendSmsByCodeApi = (
  captchaVerifyParam: any,
  phone: string,
) => Promise<{
  captchaResult: boolean
  bizResult: boolean
}>

interface IProps {
  phone?: string
  sendSmsByCodeApi: TSendSmsByCodeApi
  aliSmsConfig: any
}

export interface CaptchaSmsRef {
  captchaButtonClick: (e: string) => Promise<void>
}

const CaptchaSms = (props: IProps, ref: React.Ref<CaptchaSmsRef>) => {
  const captchaRef = useRef<any>(null)

  const resultRef = useRef<any>(null)

  const phoneRef = useRef<any>(null)

  const captchaButtonClick: (e: string) => Promise<void> = e => {
    phoneRef.current = e
    return new Promise((resolve, reject) => {
      resultRef.current = { resolve, reject }
      captchaRef.current?.click?.()
    })
  }

  React.useImperativeHandle(ref, () => ({
    captchaButtonClick,
  }))

  const captchaVerifyCallback = async (captchaVerifyParam: any) => {
    return await props.sendSmsByCodeApi(captchaVerifyParam, phoneRef.current)
  }

  // const captchaVerifyCallback = async (captchaVerifyParam: any) => {
  //   // 1.向后端发起业务请求，获取验证码验证结果和业务结果
  //   const result = await sendSmsByCode({
  //     captchaParam: captchaVerifyParam, // 验证码参数
  //     phone: phoneRef.current,
  //   }).catch(() => {})

  //   const resultTip = result ? result.data : false

  //   return {
  //     captchaResult: resultTip, // 验证码验证是否通过，boolean类型，必选
  //     bizResult: resultTip, // 业务验证是否通过，boolean类型，可选；若为无业务验证结果的场景，bizResult可以为空
  //   }
  // }

  // 验证通过后调用
  const onBizResultCallback = (bizResult: boolean) => {
    if (bizResult) {
      resultRef.current.resolve()
      return
    }
    resultRef.current.reject()
  }

  useEffect(() => {
    // 只用初始化一次验证码即可
    window.initAliyunCaptcha({
      SceneId: '1vbg9xop', // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
      prefix: '1p1ba8', // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
      mode: 'popup', // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
      element: '#captcha-element', // 页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
      button: '#captcha-button', // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
      captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
      onBizResultCallback: onBizResultCallback, // 业务请求结果回调函数，无需修改
      slideStyle: {
        width: 360,
        height: 40,
      }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
      language: 'cn', // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
      ...props.aliSmsConfig,
    })

    return () => {
      // 必须删除相关元素，否则再次mount多次调用 initAliyunCaptcha 会导致多次回调 captchaVerifyCallback
      document.getElementById('aliyunCaptcha-mask')?.remove()
      document.getElementById('aliyunCaptcha-window-popup')?.remove()
    }
  }, [])

  return (
    <>
      <div id="captcha-element" />
      <div id="captcha-button" ref={captchaRef} />
    </>
  )
}

interface FunctionContextType {
  getCaptchaSms: (phone: string) => void
}

export const SmsContext = createContext<FunctionContextType | null>(null)
const CaptchaSmsIns = React.memo(forwardRef<CaptchaSmsRef, IProps>(CaptchaSms))

export const SmsWrapper = (props: {
  children: ReactNode
  sendSmsByCodeApi: TSendSmsByCodeApi
  aliSmsConfig?: any
}) => {
  const captchaSmsRef = React.useRef<CaptchaSmsRef>(null)
  const getCaptchaSms = (phone: string) => {
    return captchaSmsRef.current?.captchaButtonClick(phone)
  }

  const { children, sendSmsByCodeApi, aliSmsConfig } = props

  return (
    <SmsContext.Provider value={{ getCaptchaSms }}>
      {children}
      <CaptchaSmsIns
        ref={captchaSmsRef}
        sendSmsByCodeApi={sendSmsByCodeApi}
        aliSmsConfig={aliSmsConfig}
      />
    </SmsContext.Provider>
  )
}

export const useSmsContent = () => {
  return useContext(SmsContext)
}

export default SmsWrapper
