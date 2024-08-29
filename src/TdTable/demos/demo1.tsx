/**
 * desc: 默认显示工具栏，支持刷新和列设置，自适应容器
 */
import React from 'react';
import { TdTable } from 'td-design';

export default function Demo() {
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
        {
            title: '说明',
            dataIndex: 'memo',
            key: 'memo'
        },
    ];
    const data = [];
    for (let i = 0; i < 34; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
            memo:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }
    return (
        <div style={{ height: '400px' }}>
            <TdTable columns={columns} dataSource={data} />
        </div>
    );
}
