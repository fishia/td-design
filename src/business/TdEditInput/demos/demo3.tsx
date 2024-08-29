/**
 * desc: 单行文本
 */
import React from 'react'
import { TdEditInput } from 'td-design'

function Demo() {
  return (
    <div>
      <TdEditInput
        placeholder="请输入正确微信号"
        addText="添加"
        style={{ width: 220 }}
        onConfirm={value => {
          return Promise.resolve(true)
        }}
      />
      <TdEditInput
        confirmText="保存"
        cancelText="暂不保存"
        addText="填写"
        style={{ width: 220 }}
        onConfirm={() => {
          return Promise.reject()
        }}
      />
    </div>
  )
}

export default Demo
