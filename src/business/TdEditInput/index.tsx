import { Button, Form, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import cls from 'classnames';
import { T } from 'ramda';
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { TdInput } from 'td-design';
import { TdInputProps } from '../../TdInput';

export enum ValidatedType {
  weChat = 'weChat',
  realName = 'realName',
  phone = 'phone',
  email = 'email',
}
export interface TdEditInputProps extends Omit<TdInputProps, 'onChange'> {
  validatedType?: 'weChat' | 'realName' | 'phone' | 'email';
  addText?: string | ReactNode;
  confirmText?: string | ReactNode;
  cancelText?: string | ReactNode;
  onCancel?: React.MouseEventHandler<HTMLInputElement> | any;
  onChange?: (value: string) => void;
  onConfirm?: (value: string) => Promise<any>;
  required?: boolean;
}

export interface TdEditInputRef {
  onEdit: () => void;
  value?: string;
}

const WeChatRule: Rule[] = [
  { type: 'string', required: true, message: '请先输入你的微信号' },
  {
    type: 'string',
    pattern: /^[[\x00-\xff]{1,20}]*$/,
    message: '微信号不支持中文汉字',
  },
];

const NameRule: Rule[] = [
  { type: 'string', required: true, message: '请输入正确的姓名' },
  {
    type: 'string',
    pattern: /^.{2,20}$/,
    message: '请输入正确的姓名',
  },
];
const EmailRule: Rule[] = [
  { type: 'string', required: true, message: '请输入邮箱' },
  {
    type: 'string',
    pattern: /^[A-Za-z0-9_-\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: '邮箱格式不正确',
  },
];
const PhoneRule: Rule[] = [
  { type: 'string', required: true, message: '请输入手机号' },
  {
    type: 'string',
    pattern: /^[1][3-9]\d{9}$/,
    len: 11,
    message: '手机号码格式不正确',
  },
];

export interface RecordFormItemProps {
  name: ValidatedType;
  label: string;
  placeholder: string;
  rules: Rule[];
  replaceStrFn?: (value: string) => string;
}
const FormItemMap: Record<ValidatedType, RecordFormItemProps> = {
  [ValidatedType.weChat]: {
    name: ValidatedType.weChat,
    label: '微信号',
    placeholder: '请输入微信号',
    rules: WeChatRule,
  },
  [ValidatedType.realName]: {
    name: ValidatedType.realName,
    label: '姓名',
    placeholder: '请输入姓名',
    rules: NameRule,
    replaceStrFn: (value) =>
      value.length === 1
        ? value
        : `${value[0]}${value.length > 2 ? '**' : '*'}`,
  },
  [ValidatedType.phone]: {
    name: ValidatedType.phone,
    label: '手机号',
    placeholder: '请输入微信号',
    rules: PhoneRule,
    replaceStrFn: (value) => value.replace(/(.{3}).+(.{4})/g, '$1****$2'),
  },
  [ValidatedType.email]: {
    name: ValidatedType.email,
    label: '邮箱',
    placeholder: '请输入微信号',
    rules: EmailRule,
    replaceStrFn: (value) => value.replace(/(.{2}).+(.{1}@.+)/g, '$1****$2'),
  },
};

const TdEditInput = forwardRef(
  (props: TdEditInputProps, ref: React.Ref<TdEditInputRef>) => {
    const {
      addText = '添加',
      confirmText = '确定',
      cancelText = '取消',
      validatedType = 'weChat',
      required = false,
      className,
      onCancel = T,
      onChange = T,
      onConfirm,
      ...rest
    } = props;

    let newProps = {
      ...rest,
    };

    const [value, setValue] = useState(''); // 组件内部值
    const [result, setResult] = useState(''); // 最终返回值
    const [changed, setChanged] = useState(false);
    const [form] = useForm();

    const onChanged = () => {
      let text = form.getFieldValue([validatedType]);
      if (changed) {
        form.validateFields([validatedType]).then(() => {
          if (onConfirm) {
            onConfirm(text)
              .then(() => {
                setResult(value);
                onChange(value);
                setChanged(false);
              })
              .catch(() => {
                //message.warning('保存失败');
                form.setFields([{
                  name: [validatedType],
                  errors: [(FormItemMap[validatedType].rules[1] as any)?.message || '请输入正确格式'],
                  validating: true,
                }]);
              });
          } else {
            setResult(value);
            onChange(value);
            setChanged(false);
          }
        });
      } else {
        setChanged(true);
      }
    };

    const handleCancel = () => {
      onCancel();
      setChanged(false);
      setValue(result);
    };

    const replaceStrFn = (value?: string) => {
      if (!value) return '';
      return FormItemMap[validatedType].replaceStrFn
        ? FormItemMap[validatedType].replaceStrFn(value)
        : value;
    };

    const classNames = cls('td-edit-input', className, {
      'td-edit-input--readOnly': !changed,
    });

    useImperativeHandle(ref, () => ({
      value: result,
      onEdit: () => setChanged(true),
    }));

    return (
      <Form form={form}>
        <Form.Item
          name={FormItemMap[validatedType].name}
          label={FormItemMap[validatedType].label}
          rules={FormItemMap[validatedType].rules}
          required={required}
        >
          <div className={classNames}>
            {changed ? (
              <TdInput
                placeholder={FormItemMap[validatedType].placeholder}
                value={value}
                onChange={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                  setValue(e.target.value)
                }
                {...newProps}
              />
            ) : (
              replaceStrFn(result)
            )}
            <Button
              type={'link'}
              onClick={onChanged}
              style={changed || result ? undefined : { padding: '4px 0' }}
            >
              {changed ? confirmText : result ? '修改' : addText}
            </Button>
            {changed && (
              <Button
                type={'link'}
                onClick={handleCancel}
                style={{ color: '#7A7F99', padding: '4px 0' }}
              >
                {cancelText}
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    );
  },
);

export default TdEditInput;
