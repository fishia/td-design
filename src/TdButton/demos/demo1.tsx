import React, { useRef } from 'react';
import { TdButton, TdInput } from 'td-design';
import { TdButtonRef } from '..';

const TdButtonDiabledClickDemo = () => {
  const btnRef = useRef<TdButtonRef>(null);

  return (
    <div id="components-button-demo-shape">
      <TdInput
        style={{ width: 200 }}
        placeholder="失焦后会触发倒计时"
        onBlur={() => {
          btnRef?.current?.setCounting(true);
        }}
      />
      <TdButton type="link" countDown ref={btnRef}>
        失焦后会触发倒计时
      </TdButton>
    </div>
  );
};

export default TdButtonDiabledClickDemo;
