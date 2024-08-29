import { message } from 'antd';
import React from 'react';
import { TdTagButton } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="buttonList">
      已选：
      <TdTagButton
        closable
        onClose={() => {
          message.success('已移除');
        }}
      >
        点击删除
      </TdTagButton>
      <TdTagButton
        theme="cold"
        ghost
        closable
        onClose={() => {
          message.success('已移除');
        }}
      >
        点击删除
      </TdTagButton>
      <TdTagButton
        theme="warm"
        ghost
        closable
        onClose={() => {
          message.success('已移除');
        }}
      >
        点击删除
      </TdTagButton>
    </div>
  </>
);
