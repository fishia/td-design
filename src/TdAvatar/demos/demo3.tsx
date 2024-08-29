import React from 'react';
import { TdAvatar } from 'td-design';
import './index.less';

export default () => (
  <div className="avatarList">
    <TdAvatar
      showGender
      gender={0}
      src={require('../assets/avatar.jpg')}
      size={62}
      showBigAvatar
    />
    <TdAvatar
      showGender
      gender={0}
      src={require('../assets/avatar.jpg')}
      size="large"
      showBigAvatar
    />
    <TdAvatar
      showGender
      gender={0}
      src={require('../assets/avatar.jpg')}
      showBigAvatar
    />
  </div>
);
