import React from 'react';
import { TdImageGroup } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="avatarList">
      <TdImageGroup
        urls={[
          {
            width: 200,
            height: 200,
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumb:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200',
          },
        ]}
      />
    </div>
  </>
);
