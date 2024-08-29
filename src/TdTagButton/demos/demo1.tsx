import React from 'react';
import { TdTagButton } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="buttonList">
      <TdTagButton noHover>默认default</TdTagButton>
      <TdTagButton noHover theme="warm">
        温暖warm
      </TdTagButton>
      <TdTagButton noHover theme="cold">
        冷静cold
      </TdTagButton>
      <TdTagButton noHover theme="hope">
        希望hope
      </TdTagButton>
      <TdTagButton noHover theme="hurry">
        紧急hurry
      </TdTagButton>
      <TdTagButton noHover theme="official">
        正式official
      </TdTagButton>
    </div>
    <div className="buttonList">
      <TdTagButton noHover ghost>
        默认default
      </TdTagButton>
      <TdTagButton noHover theme="warm" ghost>
        温暖warm
      </TdTagButton>
      <TdTagButton noHover theme="cold" ghost>
        冷静cold
      </TdTagButton>
      <TdTagButton noHover theme="hope" type="dashed">
        希望hope
      </TdTagButton>
      <TdTagButton noHover theme="hurry" type="dashed">
        紧急hurry
      </TdTagButton>
      <TdTagButton noHover theme="official" type="dashed">
        正式official
      </TdTagButton>
    </div>
    <div className="buttonList">
      <TdTagButton noHover theme="default" type="link">
        默认default
      </TdTagButton>
      <TdTagButton noHover theme="warm" type="link">
        温暖warm
      </TdTagButton>
      <TdTagButton noHover theme="cold" type="link">
        冷静cold
      </TdTagButton>
      <TdTagButton noHover theme="hope" type="link">
        希望hope
      </TdTagButton>
      <TdTagButton noHover theme="hurry" type="link">
        紧急hurry
      </TdTagButton>
      <TdTagButton noHover theme="official" type="link">
        正式official
      </TdTagButton>
    </div>
  </>
);
