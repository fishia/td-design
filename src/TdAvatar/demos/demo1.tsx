import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { TdAvatar } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="avatarList">
      <TdAvatar shape="square" size={64} icon={<UserOutlined />} />
      <TdAvatar shape="square" size="large" icon={<UserOutlined />} />
      <TdAvatar shape="square" icon={<UserOutlined />} />
      <TdAvatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
    <div className="avatarList">
      <TdAvatar size={64} />
      <TdAvatar size="large" />
      <TdAvatar />
      <TdAvatar size="small" />
    </div>
  </>
);
