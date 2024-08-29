/**
 * desc: 控制表格列的显隐，支持默认显示
 */
import React, { useState } from 'react';
import { TdTable } from 'td-design';

export default function Demo() {
    const [keys, setKeys] = useState(['name', 'age']);
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
    for (let i = 0; i < 4; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    return (
        <TdTable
            columns={columns}
            dataSource={data}
            visibleColumnKeys={keys}
            defaultVisibleColumnKeys={['name']}
            onVisibleColumnsChange={keys => {
                console.log(keys);
                setKeys(keys);
            }}
            autoFit={false}
        />
    );
}
