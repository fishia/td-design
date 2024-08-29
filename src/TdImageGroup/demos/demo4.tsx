import { message } from 'antd';
import React from 'react';
import { TdImageGroup } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="avatarList">
      <TdImageGroup
        autoplay
        pauseOnHover
        urls={[
          {
            src: require('../assets/honor-01.png'),
          },
          {
            src: require('../assets/honor-02.png'),
          },
          {
            src: require('../assets/honor-03.png'),
          },
          {
            src: require('../assets/honor-04.png'),
          },
          {
            src: require('../assets/honor-05.png'),
          },
          {
            src: require('../assets/honor-06.png'),
          },
        ]}
        onImageClick={(e, i) => {
          message.info(`您点击了第${i + 1}张图片,轮播已暂停`);
        }}
      />
    </div>
  </>
);
