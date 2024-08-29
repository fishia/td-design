import { ButtonProps, message } from 'antd';
import cls from 'classnames';
import { compose, map, prop, slice, T } from 'ramda';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  FC,
} from 'react';
import TdTagButton, { TdTagButtonProps } from '../TdTagButton';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  vertical?: boolean;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'];
  children: React.ReactNode;
}

export interface LabeledValue {
  orderIndex?: number; //索引
  value: string | number;
  label?: string;
  disabled?: boolean;
  isLeaf?: boolean; //是否叶子节点
  loading?: ButtonProps['loading']; // 异步加载
}
export interface TdSelectOption
  extends Omit<TdTagButtonProps, 'value'>,
    LabeledValue {}

export type TdCheckedValueType =
  | string
  | string[]
  | number
  | number[]
  | LabeledValue
  | LabeledValue[];

export interface TdTagSelectProps extends IBasicProps {
  options: Array<TdSelectOption>;
  value?: TdCheckedValueType;
  defaultValue?: TdCheckedValueType;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'; // 布局
  justify?: FlexProps['justify']; // 设置元素在主轴方向上的对齐方式
  align?: FlexProps['align']; // 设置元素在交叉轴方向上的对齐方式
  labelInValue?: boolean; // 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式
  continuous?: boolean; // 是否开启连续选择
  title?: string | React.ReactNode;
  desc?: string | React.ReactNode; //描述
  multiple?: boolean; //是否开启多选
  limit?: number; //最多选择多少个 tag，配合multiple
  gap?: number; // 设置网格之间的间隙
  TdTagButtonProps?: Omit<TdTagButtonProps, 'checked'>; //选中属性由value控制或者options的checked属性
  onChange?: (v?: TdCheckedValueType) => void;
  onSelect?: (v?: TdCheckedValueType) => void;
}

const TdTagSelect: FC<TdTagSelectProps> = (props: TdTagSelectProps) => {
  const {
    options = [],
    title,
    desc,
    value,
    defaultValue,
    direction = 'row',
    justify = 'flex-start',
    align = 'center',
    labelInValue = false,
    continuous = false,
    multiple = false,
    limit,
    gap = 16,
    TdTagButtonProps,
    onChange = T,
    onSelect = T,
    className,
    style,
  } = props;

  const [selections, setSelections] = useState<LabeledValue[]>(
    options.filter((item) => item.checked),
  );

  const classNames = cls('td-tag-select', className);

  // 开启多选模式
  const openMultiMode = useMemo(
    () => multiple || continuous,
    [multiple, continuous],
  );

  // 外部组件传递的值
  const componentValue = useMemo(() => {
    if ('value' in props) {
      return value;
    } else {
      return defaultValue;
    }
  }, [value, defaultValue]);

  // 默认初始化
  useEffect(() => {
    if (componentValue) {
      if (labelInValue) {
        setSelections(
          Array.isArray(componentValue)
            ? (componentValue as Array<LabeledValue>)
            : [componentValue as LabeledValue],
        );
      } else {
        setSelections(
          Array.isArray(componentValue)
            ? (componentValue.map((item, i) => ({
                value: item,
              })) as Array<LabeledValue>)
            : [{ value: componentValue } as LabeledValue],
        );
      }
    }
  }, [componentValue, labelInValue]);

  // 返回value callback
  const renderValue = (selectOptions: LabeledValue[]) => {
    setSelections(selectOptions);
    //const omitArr = map(omit(['orderIndex']), selectOptions);

    if (labelInValue) {
      onChange(openMultiMode ? selectOptions : { ...selectOptions[0] });
      onSelect(openMultiMode ? selectOptions : { ...selectOptions[0] });
    } else {
      let arr = selectOptions.map((item) => item.value as string);
      onChange(openMultiMode ? arr : arr[0]);
      onSelect(openMultiMode ? arr : arr[0]);
    }
  };

  // 判断是否选中
  const isHadSelected = useCallback(
    (option: LabeledValue) =>
      selections.map((t) => t.value).includes(option.value),
    [selections],
  );
  // 选项点击事件
  const handleOptionClick = (
    checked: boolean,
    option: LabeledValue,
    orderIndex: number,
  ) => {
    if (openMultiMode) {
      if (checked) {
        if (limit && selections.length >= limit) {
          message.warning(`最多支持选择${limit}个`);
          return;
        }
        if (continuous) {
          const arr = compose(
            map(Number),
            map(prop('orderIndex')),
          )([...selections, option]);
          const max = Math.max.apply(null, arr);
          const min = Math.min.apply(null, arr);
          renderValue(
            min === max
              ? [...selections, option]
              : slice(
                  min,
                  max + 1,
                  options.map((item, i) => ({ ...item, orderIndex: i })),
                ),
          );
        } else {
          renderValue([...selections, option]);
        }
      } else {
        if (continuous) {
          const arr = compose(map(Number), map(prop('orderIndex')))(selections);
          const min = Math.min.apply(null, arr);
          // 当仅为选择了一个，且被取消选中后，返回空
          renderValue(
            min === orderIndex && selections.length === 1
              ? []
              : slice(
                  min,
                  orderIndex + 1,
                  options.map((item, i) => ({ ...item, orderIndex: i })),
                ),
          );
        } else {
          renderValue(selections.filter((t) => t.value !== option.value));
        }
      }
    } else {
      renderValue(checked ? [option] : []);
    }
  };

  return (
    <div className={classNames} style={style}>
      {title && (
        <div className="td-tag-select__title">
          {title}
          {desc ? <span className="td-tag-select__desc">({desc})</span> : null}
        </div>
      )}
      <div
        className="td-tag-select__list"
        style={{
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          gap,
        }}
      >
        {options.map((item, i) => (
          <TdTagButton
            key={i}
            ghost
            icon={null}
            checked={isHadSelected(item)}
            width={190}
            bordered
            onClick={(e, checked) => {
              // 如果开启了关闭按钮，则点击按钮反选时失效
              if (!checked && TdTagButtonProps?.closable) {
                return;
              } else {
                handleOptionClick(checked, { ...item, orderIndex: i }, i);
              }
            }}
            onClose={(e) => {
              e.stopPropagation();
              renderValue(selections.filter((t) => t.value !== item.value));
            }}
            {...{ ...TdTagButtonProps, ...item }}
          >
            {item.label}
          </TdTagButton>
        ))}
      </div>
    </div>
  );
};

export default TdTagSelect;
