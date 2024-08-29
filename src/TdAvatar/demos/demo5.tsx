import React from 'react';
import { TdAvatar } from 'td-design';
import './index.less';

export default () => (
  <div className="avatarList">
    <TdAvatar src={require('../assets/girl2.png')} size={62} showPendant />
    <TdAvatar src={require('../assets/girl2.png')} size="large" showPendant />
    <TdAvatar src={require('../assets/girl2.png')} showPendant />
  </div>
);
