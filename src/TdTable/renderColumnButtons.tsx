import DownOutlined from '@ant-design/icons/DownOutlined'
import { Divider, Dropdown, Menu, Popconfirm, Space } from 'antd'
import React from 'react'

const renderColumnButtons = (
  renderButtons: (arg0: any, arg1: any, arg2: any) => any[],
  visible = 4,
  text: string,
  record: any,
  index: number,
  divider?: boolean,
) => {
  const actions = renderButtons(text, record, index)?.filter(
    item => item && (item.visible ?? true),
  )
  if (!Array.isArray(actions)) {
    return
  }
  const actionsLen = actions.length
  // 更多
  let moreRender
  let realVisible = visible
  if (actionsLen > visible) {
    realVisible = realVisible - 1
    const moreActions = actions.slice(realVisible)
    /* eslint-disable */
    moreRender = (
      <Dropdown
        key="more"
        overlay={
          <Menu onClick={e => moreActions[e.key as any].onClick(record, index)}>
            {moreActions.map((item, i) => (
              <Menu.Item key={i}>{item.name}</Menu.Item>
            ))}
          </Menu>
        }
      >
        <a>
          更多
          <DownOutlined />
        </a>
      </Dropdown>
    )
  }

  return (
    <Space size='middle'>
      {[
        ...actions.slice(0, realVisible).map((item, i) => {
          const { name, onClick, popconfirm, children } = item
          let btnNode = children ? (
            children
          ) : (
            <a
              key={name}
              onClick={
                onClick && !popconfirm
                  ? () => onClick(record, index)
                  : undefined
              }
            >
              {name}
            </a>
          )

          if (popconfirm) {
            const { confirm, ...rest } = popconfirm
            btnNode = (
              <Popconfirm
                {...rest}
                onConfirm={confirm ? () => confirm(record, index) : undefined}
                key={name}
              >
                {btnNode}
              </Popconfirm>
            )
          }

          return [
            btnNode,
            i != actionsLen - 1 && divider && (
              <Divider key={i} type="vertical" />
            ),
          ]
        }),
        moreRender,
      ]}
    </Space>
  )
}

export default renderColumnButtons
