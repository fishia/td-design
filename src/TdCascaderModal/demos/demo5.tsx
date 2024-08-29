import { Button } from 'antd';
import React, { useState } from 'react';
import { TdCascaderModal } from 'td-design';
import { LabeledValue } from 'td-design/TdTagSelect';
import { TdCascaderOption } from '..';
import './index.less';

export default () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const options: TdCascaderOption[] = [
    {
      value: 'zhejiang',
      label: '医疗器械研发',
      children: [
        {
          value: 'hangzhou',
          label: '器械设备研发',
          children: [
            {
              value: 'xihu',
              label: '医疗器械硬件研发',
            },
            {
              value: 'yuhang',
              label: '嵌入式软件研发',
            },
            {
              value: 'xiaoshan',
              label: '医疗器械结构研发',
            },
            {
              value: 'tonglu',
              label: 'Linux软件开发',
            },
          ],
        },
        {
          value: 'IVD',
          label: 'IVD研发',
          children: [
            {
              value: 'shiji',
              label: '诊断试剂研发',
            },
            {
              value: 'yiqi',
              label: '诊断仪器研发',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '医药研发',
      children: [
        {
          value: 'nanjing',
          label: '医药辅料研发',
          children: [
            {
              value: 'zhonghuamen',
              label: '医药辅料研发',
            },
            {
              value: 'kuangwuzhi',
              label: '矿物质原材料研发',
            },
          ],
        },
        {
          value: 'huaxue',
          label: '化学药研发',
          children: [
            {
              value: 'wuzhongqu',
              label: '药物合成/有机合成研究',
            },
            {
              value: 'shengwuyanjiu',
              label: '生物研究/体内/体外',
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Button onClick={() => setVisible(true)}>
        选择职类(搜索列表UI自定义)
      </Button>
      <div className="buttonList">
        <TdCascaderModal
          showSearch
          labelInValue
          title="请选择职类"
          searchInputProps={{
            placeholder: '搜索职类',
          }}
          selectOptionRender={(i) => (
            <div>
              <div style={{ color: '#4256dc', marginBottom: 8 }}>
                {i.label?.split('-')[2]}
              </div>
              <div>
                {i.label?.split('-')[0]}-{i.label?.split('-')[1]}
              </div>
            </div>
          )}
          open={visible}
          treeData={options}
          onClose={() => setVisible(false)}
          leafMaxWidth={160}
          onChange={(v) => {
            console.log(v);
            if (Array.isArray(v) && v.length) {
              let t = v[0] as LabeledValue;
              setText(t?.label || '');
            }
          }}
        />
      </div>
      {text && (
        <div className="text">
          您选择的职类是：<span>{text}</span>
        </div>
      )}
    </>
  );
};
