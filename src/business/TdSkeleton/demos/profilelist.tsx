import { InputNumber, Switch } from 'antd';
import React from 'react';
import { TdSkeleton } from 'td-design';

import './index.less';

export default () => {
  const [loading, setLoading] = React.useState(true);
  const [paragraphSize, setParagraphSize] = React.useState<number>(5);

  const handleLoadingChange = (checked: boolean) => {
    setLoading(checked);
  };
  const handleNumberChange = (val: number | null) => {
    setParagraphSize(val || 0);
  };

  return (
    <>
      <div>
        loading: <Switch checked={loading} onChange={handleLoadingChange} />{' '}
      </div>
      <div>
        列表pagesize{' '}
        <InputNumber
          size="large"
          min={0}
          max={100000}
          defaultValue={5}
          onChange={handleNumberChange}
        />
      </div>
      <br />
      <TdSkeleton
        tdType="profile-list"
        avatar={{ shape: 'circle' }}
        loading={loading}
        active={false}
        className="td-skeleton-profile-list"
        paragraphSize={paragraphSize}
      >
        <>简历详情列表</>
      </TdSkeleton>
    </>
  );
};
