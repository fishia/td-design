import { message } from 'antd';
import React from 'react';
import { TdTagButton } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="buttonList">
      <TdTagButton width={160} theme="default" ellipsis>
        文字超长省略文字超长省略文字超长省略
      </TdTagButton>
      <TdTagButton
        width={160}
        ellipsis
        ghost
        closable
        onClose={() => {
          message.success('已移除');
        }}
      >
        文字超长省略文字超长省略文字超长省略
      </TdTagButton>
      <TdTagButton width={160} theme="default">
        我换行我换行我换行我换行我换行我换行我换行我换行我换行我换行
      </TdTagButton>
    </div>
  </>
);
