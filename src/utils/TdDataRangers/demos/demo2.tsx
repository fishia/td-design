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
          obj.getAllABTestParamValues().then(res => {
            console.log(res)
          })
        }}
      >
        获取所有实验参数
      </Button>
    </div>
  )
}

export default demo
