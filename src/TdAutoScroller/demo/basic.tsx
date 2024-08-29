import React, { CSSProperties, FC } from 'react';
import { TdAutoScroller } from 'td-design';

const Basic: FC = () => {
  const divStyle: CSSProperties = {
    width: '300px',
    height: '80px',
    background: '#3913e2',
    color: 'white',
    lineHeight: '80px',
    textAlign: 'center',
    border: '1px solid white',
  };

  return (
    <TdAutoScroller>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => {
        return (
          <div key={i} style={divStyle}>
            {v}
          </div>
        );
      })}
    </TdAutoScroller>
  );
};

export default Basic;
