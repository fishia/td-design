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
          value: 'zhejiang',
          label: '全部',
        },
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            {
              value: 'hangzhou',
              label: '全部',
            },
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
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'jiangsu',
          label: '全部',
        },
        {
          value: 'nanjing',
          label: '南京',
          children: [
            {
              value: 'nanjing',
              label: '全部',
            },
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
              value: 'suzhou',
              label: '全部',
            },
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
      <Button onClick={() => setVisible(true)}>
        选择城市（单选，关键词“全部”，触发即刻关闭)
      </Button>
      <div className="buttonList">
        <TdCascaderModal
          labelInValue
          selectedWhenCheckedAll
          onlyRecordLeafNode={false}
          title="请选择城市"
          open={visible}
          treeData={options}
          onClose={() => setVisible(false)}
          onChange={(v) => {
            console.log('你选择了:', v);
            if (Array.isArray(v) && v.length) {
              setText(v.map((item) => item.label).join('-'));
            }
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
