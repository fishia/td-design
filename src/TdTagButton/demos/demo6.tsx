import { message } from 'antd';
import React from 'react';
import { TdTagButton } from 'td-design';
import './index.less';

export default () => {
  return (
    <>
      <div className="buttonList">
        <TdTagButton
          width={160}
          ghost
          checked
          onDisabledClick={() => {
            message.warning(
              '我虽然不可以点击，但是你依然可以记录些什么？比如埋点',
            );
          }}
        >
          我是checkbox
        </TdTagButton>
      </div>
    </>
  );
};
