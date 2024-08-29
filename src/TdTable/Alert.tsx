import React from 'react';
import Alert from 'antd/lib/alert';

interface TableAlertProps {
  prefixCls: string,
  selectedRowKeys?: Array<any>,
  onRowSelectionClear?: ()=>void
}

function TableAlert({ prefixCls, selectedRowKeys = [], onRowSelectionClear }:TableAlertProps) {
    const message = (
        <div className={`${prefixCls}-alert-message`}>
            <span className={`${prefixCls}-alert-info-content`}>
                已选择<strong>{selectedRowKeys.length}</strong>项
            </span>
            <a className={`${prefixCls}-alert-info-option`} onClick={onRowSelectionClear}>
                清空选择
            </a>
        </div>
    );
    return <Alert type="info" showIcon message={message} />;
}

export default TableAlert;
