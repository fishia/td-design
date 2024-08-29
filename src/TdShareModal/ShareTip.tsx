import { CloseOutlined } from '@ant-design/icons'
import React from 'react'

interface IProps {
  style: object
  imgUrl?: string
  text: any
  type: 'left' | 'bottom'
  state: boolean
  setState: (e: boolean) => void
}

interface TipProps {
  type: 'left' | 'bottom'
}

const ShareTip: React.FC<IProps> = props => {
  const { style, imgUrl, text, type, state, setState } = props
  if (!state) {
    return null
  }

  return (
    <div
      className="td-share-modal-tipWrapper"
      onClick={() => setState(false)}
      style={style}
    >
      <div className="td-share-modal-tipWrapper__content">
        {imgUrl ? <img src={imgUrl} alt="" /> : null}
        <span className="td-share-modal-tipWrapper__text">{text}</span>
      </div>
      <div className="td-share-modal-tipWrapper__closeIcon">
        <CloseOutlined />
      </div>
    </div>
  )
}

export default ShareTip
