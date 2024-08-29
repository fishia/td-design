import React from 'react';
import { TdEllipsisText } from 'td-design';

export default () => (
  <>
    <h4>默认行宽100%</h4>
    <TdEllipsisText
      text="在EllipsisText组件中，我们首先定义了一个构造函数来初始化组件状态，其中showFullText状态表示是否显示完整文本。接下来，我们定义了一个toggleText方法来切换showFullText状态。"
      maxRows={1}
      expandable
    />
    <h4>指定行宽</h4>
    <TdEllipsisText
      text="在EllipsisText组件中，我们首先定义了一个构造函数来初始化组件状态，其中showFullText状态表示是否显示完整文本。接下来，我们定义了一个toggleText方法来切换showFullText状态。"
      maxRows={1}
      rowWidth={'600px'}
      expandable
    />
  </>
);
