import { Button } from 'antd'
import React, { useState } from 'react'
import { TdShareModal } from 'td-design'
import { TdShareModalRef } from '../TdShareModal'

export default () => {
  const shareRef = React.useRef<TdShareModalRef>(null)

  return (
    <>
      <Button onClick={() => {
        shareRef.current?.show()
      }}>分享</Button>
      <TdShareModal ref={shareRef} />
    </>
  )
}
