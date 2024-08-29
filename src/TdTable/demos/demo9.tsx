/**
 * desc: 可选择
 */
import React, { useState } from 'react';
import { TdTable } from 'td-design';

export default function Demo() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([0]);
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const data = [];
    for (let i = 0; i < 34; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

    const rowSelection:any = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.SetStateAction<number[]>) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <div style={{ height: '400px' }}>
            <TdTable
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
                onRowSelectionClear={() => setSelectedRowKeys([])}
                onColumnsSave={() => {}}
            />
        </div>
    );
}
