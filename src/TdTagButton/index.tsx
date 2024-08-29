import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import cls from 'classnames';
import { T } from 'ramda';
import React, { useEffect, useMemo, FC } from 'react';

export type AlignType = 'left' | 'center' | 'right'
export type ThemeType =
  | 'default'
  | 'warm'
  | 'cold'
  | 'hope'
  | 'hurry'
  | 'official';
export interface TdTagButtonProps
  extends Omit<ButtonProps, 'onClick' | 'onChange'> {
  closable?: boolean;
  closeIcon?: React.ReactNode;
  icon?: React.ReactNode;
  width?: string | number; //宽度
  ellipsis?: boolean; //内容溢出省略模式或换行模式
  theme?: ThemeType; // 主题模式
  align?: AlignType;
  checked?: boolean; // 开启选项模式
  defaultChecked?: boolean; // 初始选中
  noHover?: boolean; // 没有hover
  bordered?: boolean; // 边框
  inverseSelectionMode?: boolean; // 反选模式
  onDisabledClick?: React.MouseEventHandler<HTMLButtonElement> | any;
  onClose?: React.MouseEventHandler<HTMLElement>;
  onClick?: (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    checked: boolean,
  ) => void;
  onChange?: (checked?: boolean) => void;
}

const TdTagButton: FC<TdTagButtonProps> = (props: TdTagButtonProps) => {
  const {
    closable,
    closeIcon,
    icon = <CheckOutlined />,
    width,
    ellipsis,
    theme = 'default',
    align = 'left',
    defaultChecked = false,
    checked = false,
    noHover = false,
    bordered = true,
    onClick = T,
    onClose = T,
    onChange = T,
    className,
    onDisabledClick,
    inverseSelectionMode = false,
    style,
    ...rest
  } = props

  const [closed, setClosed] = React.useState<boolean>(false);
  const [checkedStatus, setCheckedStatus] =
    React.useState<boolean>(defaultChecked);

  useEffect(() => {
    setCheckedStatus(checked)
  }, [checked])

  const onButtonClick: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement> = e => {
    if ('onDisabledClick' in props) {
      onDisabledClick()
      return
    } else {
      if (inverseSelectionMode) {
        onClick(e, true);
        onChange(true);
      } else {
        onClick(e, !checkedStatus);
        onChange(!checkedStatus);
      }
    }
  }

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setClosed(true);
    onClose(e);
    onChange(undefined);
  };
  /* 主题优先级大于ButtonType,如果没有主题，有ButtonType时去除主题样式，反之加载默认default主题 */
  const themeStatus = useMemo(
    () => (props.theme ? props?.theme : props.type ? false : 'default'),
    [],
  )

  const classNames = cls('td-tag-button', className, {
    [`${theme}`]: themeStatus,
    'td-tag-button--disabled': onDisabledClick,
    'td-tag-button__ellipsis': ellipsis,
    'td-tag-button__closed': closed,
    'td-tag-button__selected': checkedStatus && !icon,
  });

  const mapAlign = {
    left: 'flex-start',
    right: 'flex-end',
    center: 'center',
  }
  return (
    <div className={classNames} style={{ ...style, width: width || 'auto' }}>
      <Button
        className={cls('td-tag-button__btn', {
          noHover,
          noBordered: !bordered,
        })}
        style={{ justifyContent: mapAlign[align] }}
        onClick={onButtonClick}
        {...rest}
      >
        {rest.children}
        {checkedStatus && icon ? (
          <div className="td-tag-button__icon">{icon}</div>
        ) : null}
        {closable ? (
          <div className="td-tag-button__close-icon" onClick={handleClose}>
            {closeIcon ? closeIcon : <CloseOutlined />}
          </div>
        ) : null}
      </Button>
    </div>
  )
}

export default TdTagButton
