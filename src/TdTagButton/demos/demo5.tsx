import { CheckCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { TdTagButton } from 'td-design';
import './index.less';

export default () => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  return (
    <>
      <div className="buttonList">
        <TdTagButton
          width={160}
          ghost
          checked={checked}
          onClick={(e, v) => {
            setChecked(v);
          }}
        >
          我是checkbox
        </TdTagButton>
        <TdTagButton
          width={160}
          theme="warm"
          ghost
          icon={<CheckCircleOutlined />}
          checked={checked1}
          onClick={(e, v) => {
            setChecked1(v);
          }}
        >
          我是带圈的勾
        </TdTagButton>
        <TdTagButton
          width={160}
          theme="default"
          checked={checked2}
          icon={null}
          onClick={(e, v) => {
            setChecked2(v);
          }}
        >
          我是checkbox
        </TdTagButton>
        <TdTagButton ghost checked disabled>
          我选中了，不可点击
        </TdTagButton>
      </div>
    </>
  );
};
