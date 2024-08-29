import { Button } from 'antd'
import React from 'react'
import { TdDataRangers } from 'td-design'

const demo = () => {
  const obj = new TdDataRangers('c')
  obj.initDataRangers()
  return (
    <div>
      <Button
        onClick={() => {
          obj.sendDataRangersEvent('page_view', {
            page_name: '测试',
            come_from: '消息通知',
          })
        }}
      >
        点击按钮发送数据
      </Button>
    </div>
  )
}

export default demo
