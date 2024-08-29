import filterSpecialCharacters from '@/util/filterSpecialCharacters';
import getComponentProps from '@/util/getComponentProps';
import { Input, message } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { TextAreaRef } from 'antd/es/input/TextArea';
import cls from 'classnames';
import { cloneDeep } from 'lodash';
import React, { forwardRef, useState } from 'react';
import { SensitiveWordTool } from 'sensitive-word-tool';
import { CustomInputProps } from '.';

interface TdTextAreaProps extends TextAreaProps, CustomInputProps {}

const TextArea = forwardRef(
  (props: TdTextAreaProps, ref: React.Ref<TextAreaRef>) => {
    const {
      maxLength = 200,
      placeholder = '请输入',
      showCount = true,
      className,
      specialCharactersFilter = false,
      checkSensitiveWords = true,
      trim = false,
      onChange,
      onBlur,
      sensitiveWordToolConfig,
      ...rest
    } = props;

    const [hasSensitiveWords, setHasSensitiveWords] = useState(false);

    const sensitiveWordTool = new SensitiveWordTool({
      useDefaultWords: true,
      ...sensitiveWordToolConfig,
    });

    // useImperativeHandle(ref, () => ({
    //   hasSensitiveWords,
    // }));

    let newProps = {
      ref,
      maxLength,
      placeholder,
      showCount,
      onBlur(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
        let value = e.target.value;
        let $e = e;
        if (trim) {
          value = value.trim();
        }
        if (checkSensitiveWords && value) {
          if (sensitiveWordTool.verify(value)) {
            let words = sensitiveWordTool.match(value);
            message.warning(`输入内容含有${words.join(',')}等敏感词`);
            setHasSensitiveWords(true);
            return;
          }
        }
        if (specialCharactersFilter && value) {
          $e = cloneDeep(e);
          let obj = getComponentProps(specialCharactersFilter);
          $e.target.value = filterSpecialCharacters(value, obj);
          if (onChange) onChange($e);
        }
        if (onBlur) {
          onBlur($e);
        }
      },
      onChange,
      ...rest,
    };
    const classNames = cls('td-input-textarea', className);

    let render = (
      <Input.TextArea className={classNames} {...newProps} ref={ref} />
    );

    return render;
  },
);

export default TextArea;
