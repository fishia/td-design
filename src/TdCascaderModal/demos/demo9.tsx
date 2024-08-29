import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import {
  TdCascaderModal,
  TdCascaderModalRef,
  TdCascaderOption,
} from 'td-design';
import './index.less';

export default () => {
  const [text, setText] = useState('');
  const [checkedKeys, setCheckedKeys] = useState(['yuhang', 'zhonghuamen']);
  const ref = useRef<TdCascaderModalRef>(null);

  const options: TdCascaderOption[] = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            {
              value: 'xihu',
              label: '西湖',
            },
            {
              value: 'yuhang',
              label: '余杭',
            },
            {
              value: 'xiaoshan',
              label: '萧山',
            },
            {
              value: 'tonglu',
              label: '桐庐',
            },
          ],
        },
        {
          value: 'ningbo',
          label: '宁波',
          children: [
            {
              value: 'jiangbei',
              label: '江北',
              disabled: true,
            },
            {
              value: 'zhenhai',
              label: '镇海',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京',
          children: [
            {
              value: 'zhonghuamen',
              label: '中华门',
            },
          ],
        },
        {
          value: 'suzhou',
          label: '苏州',
          children: [
            {
              value: 'wuzhongqu',
              label: '吴中区',
            },
            {
              value: 'dongfangzhimen',
              label: '东方之门',
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Button onClick={() => ref?.current?.show()}>
        我用 ref 打开这个弹窗
      </Button>
      <div className="buttonList">
        <TdCascaderModal
          multiple
          footer
          labelInValue
          ref={ref}
          value={checkedKeys}
          title="请选择城市"
          treeData={options}
          onConfirm={(V) => {
            setCheckedKeys(V.map((item) => item.value));
            setText(V.map((item) => item.label).join(','));
          }}
        />
      </div>
      {text && (
        <div className="text">
          您选择的城市是：<span>{text}</span>
        </div>
      )}
    </>
  );
};
