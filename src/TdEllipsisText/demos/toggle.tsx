import React from 'react';
import { TdEllipsisText } from 'td-design';

export default () => (
  <>
    <h4>
      展开收起：行展开收起需要判断完整文本行数，超出限制行数显示【展开或收起】，未超出限制行数不显示
    </h4>
    <TdEllipsisText
      text="在EllipsisText组件中，我们首先定义了一个构造函数来初始化组件状态，其中showFullText状态表示是否显示完整文本。接下来，我们定义了一个toggleText方法来切换showFullText状态。接下来，我们定义了一个toggleText方法来切换showFullText状态。接下来，我们定义了一个toggleText方法来切换showFullText状态。接下来，我们定义了一个toggleText方法来切换showFullText状态。接下来，我们定义了一个toggleText方法来切换showFullText状态。"
      maxRows={2}
      expandable
      onEllipsis={() => {
        console.log('执行收起回调');
      }}
      onExpand={() => {
        console.log('执行展开回调');
      }}
    />
    <br />
    <TdEllipsisText
      text="在EllipsisText组件中，我们首先定义了一个构造函数来初始化组件状态，其中showFullText状态表示是否显示完整文本。接下来，我们定义了一个toggleText方法来切换showFullText状态。接下来，我们定义了一个"
      maxRows={2}
      expandable
    />
    <br />
    <TdEllipsisText text="这里只有一行" maxRows={2} expandable />
    <br />
    <TdEllipsisText
      text="这里的文本仅可展开一次，我们首先定义了一个构造函数来初始化组件状态，其中showFullText状态表示是否显示完整文本。接下来，我们定义了一个toggleText方法来切换showFullText状态。接下来，我们定义了一个"
      maxRows={1}
      expandable
      expandOnce
    />
  </>
);
