import { Button } from 'antd'
import React, { useEffect } from 'react'
import { TdShareModal } from 'td-design'
import { TdShareModalRef } from '../TdShareModal'

export default () => {
  const shareRef = React.useRef<TdShareModalRef>(null)
  const [backWords, setBackWords] = React.useState<string>(
    '打工人\n都要不扣钱的诗和远方\n带薪年假，拿去吧你！',
  )

  return (
    <>
      <Button
        onClick={() => {
          shareRef.current?.show()
        }}
      >
        分享
      </Button>
      <TdShareModal ref={shareRef} showHeadLabel watermarkWord={backWords} />
    </>
  )
}
