import { Button } from 'antd'
import React, { useEffect } from 'react'
import { TdShareModal } from 'td-design'
import { TdShareModalRef } from '../TdShareModal'

export default () => {
  const shareRef = React.useRef<TdShareModalRef>(null)
  const [shareInfo, setShareInfo] = React.useState<any>({
    backGroundList: [],
  })

  useEffect(() => {
    fetch('https://test-api.yimaitongdao.com/ymtd-position/jds/batchShare', {
      method: 'post',
      body: JSON.stringify({ ids: [57051] }),
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyLVR5cGUiOjEsImV4cCI6MTcxMzQ5MzQ4NCwiaWF0IjoxNzEwOTAxNDg0LCJVc2VyLUlkIjo0NTM1NDR9.vjMMgblu-8yX_tSG7j424B9gkqZtYcaWKBty8NtAHUU',
        Platform: '4',
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      let data = await res.json()
      setShareInfo({
        backGroundList: data.data.backGroundList.map((item: { url: any }) => item.url),
      })
    })
  }, [])
  return (
    <>
      <Button
        onClick={() => {
          shareRef.current?.show()
        }}
      >
        分享
      </Button>
      <TdShareModal
        ref={shareRef}
        showHeadLabel
        bgUrlList={shareInfo.backGroundList}
        bgUrl={shareInfo.backGroundList[0]}
      />
    </>
  )
}
