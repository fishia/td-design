/**
 * desc: 默认功能按钮居右，更符合用户使用习惯
 */
import React from 'react';
import { TdTable } from 'td-design';
import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';

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
        <div style={{ height: '500px' }}>
            <TdTable
                columns={columns}
                dataSource={data}
                buttonGroup={
                    <>
                        <Button icon={<PlusOutlined />} style={{ marginRight: '8px' }}>
                            新建
                        </Button>
                        <Button icon={<DeleteOutlined />} style={{ marginRight: '8px' }}>
                            删除
                        </Button>
                        <Button icon={<ImportOutlined />} style={{ marginRight: '8px' }}>
                            导入
                        </Button>
                        <Button icon={<ExportOutlined />}>导出</Button>
                    </>
                }
            />
        </div>
    );
}
