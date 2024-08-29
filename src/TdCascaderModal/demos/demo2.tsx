import { Button } from 'antd';
import React, { useState } from 'react';
import { TdCascaderModal } from 'td-design';
import { TdCascaderOption } from '..';
import './index.less';

export default () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
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
            },
            {
              value: 'zhenhai',
              label: '镇海',
            }
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
      <Button onClick={() => setVisible(true)}>选择城市（多选)</Button>
      <div className="buttonList">
        <TdCascaderModal
          multiple
          title="请选择城市"
          open={visible}
          treeData={options}
          onClose={() => setVisible(false)}
          onConfirm={(V) => {
            setText(V.map(item => item.label).join(','));
          }}
          labelInValue
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
