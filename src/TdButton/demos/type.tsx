import React from 'react';
import { TdButton } from 'td-design';
import './index.less'

export default () => (
  <div className="buttonList">
    <TdButton type="default">默认按钮</TdButton>
    <TdButton type="primary">主按钮</TdButton>
    <TdButton type="link" href="https://hr.yimaitongdao.com">
      链接按钮
    </TdButton>
    <TdButton ghost type="primary">
      幽灵按钮
    </TdButton>
    <TdButton type="text">文本按钮</TdButton>
  </div>
);
