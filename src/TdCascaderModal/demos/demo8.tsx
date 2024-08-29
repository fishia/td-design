import { Button } from 'antd';
import React, { useState } from 'react';
import { TdCascaderModal } from 'td-design';
import { TdCascaderOption } from '..';
import './index.less';

export default () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [checkedKeys, setCheckedKeys] = useState([
    'zhonghuamen',
    'xiaoqu1',
    'xiaoqu2',
  ]);

  const options: TdCascaderOption[] = [
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
              children: [
                {
                  value: 'xiaoqu1',
                  label: '小区1',
                },
                {
                  value: 'xiaoqu2',
                  label: '小区2',
                },
                {
                  value: 'xiaoqu3',
                  label: '中华门-小区3',
                },
              ],
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
              children: [
                {
                  value: 'luzhi',
                  label: '甪直镇',
                },
              ],
            },
            {
              value: 'gusuqu',
              label: '姑苏区',
              children: [
                {
                  value: 'xiangmen',
                  label: '相门',
                },
              ],
            },
          ],
        },
      ],
    },
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
  ];
  return (
    <>
      <Button onClick={() => setVisible(true)}>我有4级</Button>
      <div className="buttonList">
        <TdCascaderModal
          multiple
          footer
          labelInValue
          spanWidth={[165, 165, 165]}
          value={checkedKeys}
          title="请选择城市"
          open={visible}
          treeData={options}
          onClose={() => setVisible(false)}
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
