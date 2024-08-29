import React from 'react';
import { TdButton } from 'td-design';

const TdButtonDiabledClickDemo = () => {
  return (
    <div id="components-button-demo-shape">
      <TdButton
        countDown
        onClick={() => {
          console.log('调接口');
        }}
      >
        获取验证码
      </TdButton>
    </div>
  );
};

export default TdButtonDiabledClickDemo;
