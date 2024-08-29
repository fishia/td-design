/**
 * desc: 支持自定义特殊字符过滤
 */
import { Form } from 'antd'
import React from 'react'
import { TdInput } from 'td-design'

function Demo() {
  // 校验字符串中是否包含敏感词
  function checkSensitiveWordsApi(word: string = ''): Promise<boolean> {
    return fetch(
      'https://test-api.yimaitongdao.com/ymtd-bapp/hr/checkSensitiveWords',
      {
        method: 'post',
        body: JSON.stringify({ word }),
        headers: {
          Authorization:
            'Bearer 1419937|IUa0rYfcOWq0aFUOf2Kpyu8Z9KEl07xOJBguvIks',
          Platform: '3',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(async res => {
        let data = await res.json()
        return data.success
      })
      .catch(() => true)
  }
  return (
    <Form>
      <Form.Item label="医脉接口检测敏感词" name="custom">
        <TdInput
          specialCharactersFilter={{ include: ['-'], exclude: ['@'] }}
          checkSensitiveWords
          watchSensitive={checkSensitiveWordsApi}
          placeholder="请输入"
          style={{ width: 220 }}
        />
      </Form.Item>
    </Form>
  )
}

export default Demo
