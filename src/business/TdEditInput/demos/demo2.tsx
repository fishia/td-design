import { Button } from 'antd';
import React, { useRef } from 'react';
import { TdEditInput } from 'td-design';
import { TdEditInputRef } from '..';

function Demo() {
  const ref = useRef<TdEditInputRef>(null);
  const ref1 = useRef<TdEditInputRef>(null);
  const ref2 = useRef<TdEditInputRef>(null);
  return (
    <div>
      <TdEditInput validatedType="realName" style={{ width: 220 }} ref={ref} />
      <TdEditInput validatedType="phone" style={{ width: 220 }} ref={ref1} />
      <TdEditInput validatedType="email" style={{ width: 220 }} ref={ref2} />
      <Button
        onClick={() => {
          console.log(ref?.current?.value, ref1?.current?.value, ref2?.current?.value);
        }}
      >
        提交
      </Button>
    </div>
  );
}

export default Demo;
