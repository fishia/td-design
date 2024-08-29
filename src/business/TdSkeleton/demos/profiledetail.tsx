import { InputNumber, Switch } from 'antd';
import React from 'react';
import { TdSkeleton } from 'td-design';

import './index.less';

export default () => {
  const [loading, setLoading] = React.useState(true);
  const [paragraphSize, setParagraphSize] = React.useState<number>(3);

  const handleLoadingChange = (checked: boolean) => {
    setLoading(checked);
  };
  const handleNumberChange = (val: number | null) => {
    setParagraphSize(val || 0);
  };

  return (
    <>
      <div>
        loading: <Switch checked={loading} onChange={handleLoadingChange} />
      </div>
      <div>
        简历详情段落长度{' '}
        <InputNumber
          size="large"
          min={0}
          max={100000}
          defaultValue={3}
          onChange={handleNumberChange}
        />
      </div>
      <TdSkeleton
        tdType="profile-detail"
        avatar={{ shape: 'square' }}
        loading={loading}
        active={false}
        className="td-skeleton-profile-detail"
        paragraphSize={paragraphSize}
      >
        <>简历详情内容</>
      </TdSkeleton>
    </>
  );
};
