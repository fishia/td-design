/**
 * desc: 单行文本
 */
import { Button } from 'antd'
import React, { useRef } from 'react'
import { TdLoginModal,TdLoginModalRef } from 'td-design'

function Demo() {

  const loginModalRef = useRef<TdLoginModalRef>(null)

  return (
    <div>
      <Button type='primary' onClick={() => loginModalRef.current?.open()}>去登录</Button>
      <TdLoginModal ref={loginModalRef} subTitle={'登录后即可参与活动'} mode='password' />
    </div>
  )
}

export default Demo
