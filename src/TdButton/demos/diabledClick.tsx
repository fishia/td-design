import { message } from 'antd';
import React from 'react';
import { TdButton } from 'td-design';

const TdButtonDiabledClickDemo = () => {
  const onButtonClick = () => {
    message.info('不可点击');
  };

  return (
    <div id="components-button-demo-shape">
      <TdButton onDisabledClick={onButtonClick}>激活</TdButton>
    </div>
  );
};

export default TdButtonDiabledClickDemo;
