import { Select } from 'antd';
import cls from 'classnames';
import { Dictionary, includes, NumericDictionary } from 'lodash';
import React, { CSSProperties } from 'react';


interface IProps {
  value?: (string | number)[];
  onChange?: (e: (string | number)[]) => void;
  options?: {
    value: string | number;
    label: string;
  }[];
  insetLabel: string;
  style?: CSSProperties;
  defaultVal?: (string | number)[];
  className?: string;
  defaultOptionsLabel?: string;
}

const TdSearchSelect: React.FC<IProps> = (props) => {
  const {
    options = [],
    insetLabel,
    style,
    value = [],
    onChange,
    defaultVal = [0],
    className,
    defaultOptionsLabel = '不限',
  } = props;

  const change = (val: (string | number)[], option: any) => {
    const length = val.length;
    const opLength = option.length;
    const optionLastLabel = option[opLength - 1]?.label;
    if (length === 0 || includes(optionLastLabel, defaultOptionsLabel)) {
      onChange?.(defaultVal);
      return;
    }
    const selectList = option
      .filter(
        (item: {
          label:
            | Dictionary<string>
            | NumericDictionary<string>
            | null
            | undefined;
        }) => !includes(item.label, defaultOptionsLabel),
      )
      .map((item: { value: string | number }) => item.value);
    onChange?.(selectList);
  };

  return (
    <Select
      value={value.length !== 0 ? value : defaultVal}
      mode="multiple"
      showArrow
      style={style}
      bordered={false}
      tagRender={({ label }) => (
        <span className="f141933">
          {includes(label as string, defaultOptionsLabel)
            ? insetLabel
            : `${label}${value.length > 1 ? '、' : ''}`}
        </span>
      )}
      showSearch={false}
      onChange={change}
      options={options}
      dropdownMatchSelectWidth={120}
      popupClassName="tdSearchSelectPopupCss"
      className={cls('tdSearchSelectCss', className)}
    />
  );
};

export default TdSearchSelect;
