import { EyeOutlined } from '@ant-design/icons';
import { Avatar, AvatarProps, Modal } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';
import Man from './assets/man.svg';
import Pendant from './assets/talentPortrait.png';
import WoMan from './assets/woman.svg';
import DefaultAvatar from './assets/ymtd_default_logo.png';

export interface TdAvatarProps extends Omit<AvatarProps, 'onClick'> {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | any
  gender?: 1 | 0
  defaultAvatarUrl?: string
  showPendant?: boolean
  pendantUrl?: string
  showGender?: boolean
  showBigAvatar?: boolean
  manUrl?: string
  woManUrl?: string
  pixelated?: boolean
}

const TdAvatar: FC<TdAvatarProps> = (props: TdAvatarProps) => {
  const {
    gender = 1,
    showPendant,
    showGender = false,
    showBigAvatar = false,
    className,
    pendantUrl = Pendant,
    manUrl = Man,
    woManUrl = WoMan,
    pixelated,
    defaultAvatarUrl = DefaultAvatar,
    onClick,
    style,
    ...rest
  } = props

  const onAvatarClick = () => {
    if (onClick) onClick()
    // icon不触发
    if (!showBigAvatar && rest?.icon) {
      return
    }

    Modal.info({
      title: null,
      icon: null,
      width: 400,
      closable: true,
      className: 'modal-show-empty',
      okButtonProps: {
        style: {
          display: 'none',
        },
      },
      content: (
        <div className="td-Avatar__preview">
          <img src={(rest?.src || defaultAvatarUrl) as string} alt="" />
        </div>
      ),
    })
  }

  const classNames = cls('td-Avatar', className)

  return (
    <div className={classNames} onClick={onAvatarClick} style={style}>
      {showPendant && (
        <img src={pendantUrl} className="td-Avatar__pendantImg" alt="" />
      )}
      <Avatar
        {...{
          ...rest,
          src: rest?.icon ? rest?.src : rest?.src || defaultAvatarUrl,
        }}
        className={cls({ pixelated: pixelated })}
      />
      {showBigAvatar && (
        <div className="td-Avatar__noticeMask">
          <EyeOutlined />
        </div>
      )}

      {showGender ? (
        <img
          src={gender ? manUrl : woManUrl}
          className="td-Avatar__genderIcon"
          alt=""
        />
      ) : null}
    </div>
  )
}

export default TdAvatar
