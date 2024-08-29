import { Tooltip, TooltipProps } from 'antd'
import React, { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react'

export interface TdEllipsisProps {
  text: string
  maxLength?: number // 最多显示的字符长度
  maxRows?: number // 最多显示的行数
  rowWidth?: string // 行宽
  expandable?: boolean // 是否可展开或收起
  expandText?: ReactNode | string // 自定义展开描述文案
  expandOnce?: boolean // 仅展开一次
  foldText?: ReactNode | string | null // 自定义收起描述文案
  tooltipProp?: TooltipProps // 省略时展示提示信息 // boolean | ReactNode | TooltipProps
  onExpand?: () => void // 触发展开时回调
  onEllipsis?: () => void // 触发省略时回调
}

interface IRowProps {
  maxRows?: number
  rowWidth?: string
}

const TdEllipsisText: FC<TdEllipsisProps> = (props: TdEllipsisProps) => {
  const {
    text,
    maxLength,
    tooltipProp,
    maxRows = 0,
    rowWidth = '100%',
    expandable,
    expandText = '展开',
    foldText = '收起',
    expandOnce = false,
    onExpand,
    onEllipsis,
  } = props
  const [showFullText, setShowFullText] = useState<boolean>(false) // 是否展示所有文本
  const [rowProps, setRowProps] = useState<IRowProps>({ maxRows, rowWidth })
  const [showExpand, setShowExpand] = useState(false)
  const ellipsisRef = useRef<any>(null)

  // 判断是否显示展开/收起
  const checkCount = () => {
    const div = ellipsisRef?.current
    const scrollHeight = div?.scrollHeight || 0
    const clientHeight = div?.clientHeight || 0
    const _showExpand =
      scrollHeight > clientHeight || (!!maxLength && text.length > maxLength)

    // 控制展开收起按钮显示
    setShowExpand(_showExpand)
    // 控制tooltips展示
    setShowFullText(!_showExpand)
  }

  const toggleText = () => {
    if (!expandable) return
    const clickFn = showFullText ? onEllipsis : onExpand
    setShowFullText(!showFullText)
    clickFn?.()
  }

  const toggleRow = () => {
    if (!expandable) return

    if (expandOnce) {
      setShowExpand(false)
    }
    const clickFn = showFullText ? onEllipsis : onExpand
    setRowProps({ ...rowProps, maxRows: !rowProps.maxRows ? maxRows : 0 })
    setShowFullText(!showFullText)
    clickFn?.()
  }

  useLayoutEffect(() => {
    checkCount()
  }, [text, maxRows, maxLength])

  // 1、限制显示行数， 超过显示【展开】【收起】
  // 2、限制字符串长度
  // 限制字符串长度的内容
  const isTextOverLimit = maxLength && text.length > maxLength
  const truncatedText =
    isTextOverLimit && !showFullText ? `${text.slice(0, maxLength)}...` : text

  const InLineContent = () => {
    return (
      <span aria-label="Close">
        {!showFullText ? (
          <Tooltip title={text} {...tooltipProp}>
            {truncatedText}
          </Tooltip>
        ) : (
          <>{truncatedText}</>
        )}
        {showExpand && expandable && (
          <span onClick={toggleText} className="expand-btn">
            {showFullText ? foldText : expandText}
          </span>
        )}
      </span>
    )
  }

  // 限制行数的内容
  const BasicBlockContent = () => {
    return (
      <div
        className="block-content-wrap"
        // style={{
        //   '--maxrows': rowProps.maxRows,
        //   '--width': rowProps.rowWidth,
        // }}
        ref={ellipsisRef}
      >
        {text}
      </div>
    )
  }

  const BlockContent = () => {
    return (
      <>
        {!showFullText ? (
          <Tooltip title={text} {...tooltipProp}>
            {BasicBlockContent()}
          </Tooltip>
        ) : (
          <>{BasicBlockContent()}</>
        )}
        {showExpand && expandable && (
          <div onClick={toggleRow} className="expand-btn">
            {showFullText ? foldText : expandText}
          </div>
        )}
      </>
    )
  }

  return maxRows > 0 ? BlockContent() : InLineContent()
}

export default TdEllipsisText
