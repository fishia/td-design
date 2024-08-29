import { message } from 'antd';
import React from 'react';
import { TdButton } from 'td-design';

const fetchMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

const TdButtonClickDemo = () => {
  const onButtonClick = () => {
    return fetchMock().then(() => {
      message.success('发布成功');
    });
  };

  return (
    <div id="components-button-demo-shape">
      <TdButton type="primary" onClick={onButtonClick}>
        发布职位
      </TdButton>
    </div>
  );
};

export default TdButtonClickDemo;
