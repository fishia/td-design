import React from 'react';
import { TdAvatar } from 'td-design';
import './index.less';

export default () => (
  <div className="avatarList">
    <TdAvatar
      showGender
      gender={1}
      src={require('../assets/girl.jpg')}
      size={62}
    />
    <TdAvatar
      showGender
      gender={0}
      src={require('../assets/girl.jpg')}
      size="large"
    />
    <TdAvatar showGender gender={0} src={require('../assets/girl.jpg')} />
  </div>
);
