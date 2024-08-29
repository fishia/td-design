import { Button } from 'antd';
import React from 'react';
import { TdModal } from 'td-design';

export default () => {
  const showModal = () => {
    const modal = TdModal.showModal({
      title: '基本用法',
      content: (
        <div>
          <div>自定义弹窗内容</div>
          <Button
            onClick={() => {
              modal.close();
            }}
          >
            内容区域内执行关闭弹窗
          </Button>
          <Button
            onClick={() => {
              TdModal.showModal({ title: '嵌套弹窗' });
            }}
          >
            嵌套弹窗
          </Button>
        </div>
      ),
      onCancel: () => {
        console.log('取消弹窗');
      },
      afterClose: () => {
        console.log('弹窗关闭后');
      },
    });
  };

  return <Button onClick={showModal}>显示基本弹窗</Button>;
};
