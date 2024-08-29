import React from 'react';
import { TdAvatar } from 'td-design';
import './index.less';

export default () => (
  <div className="avatarList">
    <TdAvatar src={require('../assets/avatar.jpg')} size={62} pixelated />
    <TdAvatar src={require('../assets/avatar.jpg')} size="large" pixelated />
    <TdAvatar src={require('../assets/avatar.jpg')} pixelated />
  </div>
);
