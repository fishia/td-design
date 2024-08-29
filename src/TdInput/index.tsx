import filterSpecialCharacters from '@/util/filterSpecialCharacters'
import getComponentProps from '@/util/getComponentProps'
import { Input, InputProps, InputRef, message } from 'antd'
import cls from 'classnames'
import { cloneDeep } from 'lodash'
import { T } from 'ramda'
import React, { forwardRef, useImperativeHandle } from 'react'
import SensitiveWordTool, { Options } from 'sensitive-word-tool'
import TdButton, { TdButtonProps, TdButtonRef } from '../TdButton'
import TextArea from './TextArea'

export interface ITdInputRef extends TdButtonRef, Partial<InputRef> {
  inputFocus: () => void
  hasSensitiveWords?: boolean
}
export interface CustomInputProps {
  countDown?: boolean
  specialCharactersFilter?:
    | boolean
    | {
        include?: Array<string>
        exclude?: Array<string>
      } // 过滤特殊字符
  checkSensitiveWords?: boolean // 敏感词
  trim?: boolean // 去除空格
  sensitiveWordToolConfig?: Options
  watchSensitive?: (value: string) => Promise<boolean>
  onGetMsgCode?: () => void
  buttonProps?: Partial<TdButtonProps>
}

export interface TdInputProps extends InputProps, CustomInputProps {}

const TdInput: any = Object.assign(
  forwardRef((props: TdInputProps, ref: React.Ref<ITdInputRef>) => {
    const {
      className,
      maxLength = 32,
      placeholder = '请输入',
      specialCharactersFilter = false,
      checkSensitiveWords = true,
      trim = true,
      onChange,
      onBlur,
      sensitiveWordToolConfig,
      style,
      watchSensitive,
      countDown = false,
      onGetMsgCode = T,
      buttonProps = {},
      ...rest
    } = props
    const [hasSensitiveWords, setHasSensitiveWords] = React.useState(false)
    const countdownBtn: React.Ref<TdButtonRef> = React.useRef(null)
    const inputRef: React.Ref<InputRef> = React.useRef(null)

    useImperativeHandle(ref, () => ({
      startCounting(): void {
        countdownBtn.current?.startCounting()
      },
      inputFocus(): void {
        inputRef.current?.focus()
      },
      hasSensitiveWords,
      ...inputRef.current,
    }))

    const sensitiveWordTool = new SensitiveWordTool({
      useDefaultWords: true,
      ...sensitiveWordToolConfig,
    })

    let newProps = {
      ref,
      maxLength,
      placeholder,
      onBlur: async (e: React.FocusEvent<HTMLInputElement, Element>) => {
        let value = e.target.value
        let $e = e
        if (trim) {
          value = value.trim()
        }
        if (checkSensitiveWords && value) {
          if (watchSensitive) {
            let sensitive = await watchSensitive(value)
            if (sensitive) {
              message.warning('内容含有敏感词')
              return
            }
          } else {
            if (sensitiveWordTool.verify(value)) {
              let words = sensitiveWordTool.match(value)
              message.warning(`输入内容含有${words.join(',')}等敏感词`)
              setHasSensitiveWords(true)
              return
            }
          }
        }
        if (specialCharactersFilter && value) {
          $e = cloneDeep(e)
          let obj = getComponentProps(specialCharactersFilter)
          $e.target.value = filterSpecialCharacters(value, obj)
          if (onChange) onChange($e)
        }
        if (onBlur) {
          onBlur($e)
        }
      },
      onChange,
      ...rest,
    }

    const classNames = cls('td-input', className)
    if (countDown) {
      return (
        <div className="td-input__countDownInput" style={style}>
          <Input
            {...newProps}
            className={classNames}
            style={style}
            ref={inputRef}
          />
          <TdButton
            countDown
            type={'link'}
            ref={countdownBtn}
            onClick={onGetMsgCode}
            {...buttonProps}
          >
            获取验证码
          </TdButton>
        </div>
      )
    }

    return (
      <Input
        {...newProps}
        ref={inputRef}
        className={classNames}
        style={style}
      />
    )
  }),
  {
    Group: Input.Group,
    Search: Input.Search,
    TextArea: TextArea,
    Password: Input.Password,
  },
)

export default TdInput
