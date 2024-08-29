import { Button, ButtonProps } from 'antd';
import cls from 'classnames';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';

export interface TdButtonRef {
  startCounting(): void
  counting?: boolean
}
export interface TdButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | any
  onDisabledClick?: React.MouseEventHandler<HTMLButtonElement> | any
  onBeforeClick?: React.MouseEventHandler<HTMLButtonElement> | any
  countDown?: boolean
  seconds?: number
  countDownText?: string
}

const TdButton = (props: TdButtonProps, ref: React.Ref<TdButtonRef>) => {
  const {
    onClick,
    className,
    onDisabledClick,
    onBeforeClick,
    countDown = false,
    seconds = 60,
    children,
    countDownText = '后重新获取',
    ...rest
  } = props
  const [loading, setIsLoading] = React.useState<boolean>(false)
  const [counting, setCounting] = React.useState<boolean>(false)
  const [remainSeconds, setRemainSeconds] = React.useState(seconds)

  React.useEffect(() => {
    if (props.loading) {
      setIsLoading(props.loading as boolean)
    }
  }, [props.loading])

  const onButtonClick: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement> = e => {
    if ('onDisabledClick' in props) {
      onDisabledClick()
      return
    } else {
      const clickFn = onClick?.(e)

      if (clickFn instanceof Promise) {
        setIsLoading(true)

        clickFn.finally(() => {
          setIsLoading(false)
        })

        return
      }
    }
  }

  const onGetVerificationCode = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      let secs = remainSeconds
      console.log(counting)
      if (counting) return
      onClick?.(e)
      setCounting(true)
      const timer = setInterval(() => {
        setRemainSeconds(--secs)
        if (secs === 0) {
          setCounting(false)
          clearInterval(timer)
          setRemainSeconds(seconds || 60)
        }
      }, 1000)
    },
    [remainSeconds, counting],
  )

  useImperativeHandle(ref, () => ({
    startCounting:onGetVerificationCode,
    counting,
  }))

  const classNames = cls('td-button', className, {
    'td-disabled-button': onDisabledClick,
    'td-countdown-button': counting,
  })

  return countDown ? (
    <Button
      {...rest}
      className={classNames}
      style={rest.style}
      onClick={e => onGetVerificationCode(e)}
    >
      {counting ? `${remainSeconds}s${countDownText}` : children}
    </Button>
  ) : (
    <Button
      loading={loading}
      {...{ ...rest, children }}
      onClick={onButtonClick}
      className={classNames}
    />
  )
}

export default forwardRef<TdButtonRef, TdButtonProps>(TdButton)
