import React from 'react';
import { TdImageGroup } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="avatarList">
      <TdImageGroup
        urls={[
          {
            src: 'error',
          },
        ]}
      />
    </div>
  </>
);
