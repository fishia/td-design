import { Button } from 'antd';
import React from 'react';
import { TdModal } from 'td-design';

import './index.less';

export default () => {
  const showModal = () => {
    const modal = TdModal.showModal({
      content: (
        <>
          <img
            src={
              'https://kr-ymtd.oss-cn-beijing.aliyuncs.com/activity/test/td-design/EquityUpgradePic.png'
            }
            style={{ width: 566 }}
            alt=""
          />
          <img
            className="confirmBtn"
            src={
              'https://kr-ymtd.oss-cn-beijing.aliyuncs.com/activity/test/td-design/buttonPic.png'
            }
            onClick={() => {
              modal.close();
            }}
          ></img>
        </>
      ),
      className: 'equityUpgradeWrap',
      width: 566,
      noBoxShadow: true,
      noContentBg: true,
      closable: false,
      afterClose: () => {},
    });
  };

  return <Button onClick={showModal}>显示弹窗</Button>;
};
