import React from 'react';
import { TdImageGroup } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="avatarList">
      <TdImageGroup
        AlbumMode
        urls={[
          {
            src: require('../assets/honor-01.png'),
          },
          {
            src: require('../assets/honor-02.png'),
          },
          {
            src: require('../assets/honor-03.png'),
            preview: false,
          },
        ]}
      />
    </div>
  </>
);
