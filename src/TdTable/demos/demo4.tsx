/**
 * desc: 气泡确认框配置，更多查询配置- 表格字段小于等于5个时，操作字段全部显示；表格字段大于5个时，当操作字段大于4个时，显示更多。
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
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 250,
            renderButtons(text, record, index) {
                return [
                    {
                        name: '编辑',
                        onClick() {
                            console.log(text, record, index);
                        },
                    },
                    {
                        name: '查看',
                        onClick() {
                            console.log(text, record, index);
                        },
                        visible: false,
                    },
                    {
                        name: '删除',
                        popconfirm: {
                            title: '是否确认删除',
                            confirm() {
                                console.log(text, record, index);
                            },
                        },
                    },
                    {
                        name: '下载',
                        onClick() {
                            console.log(text, record, index);
                        },
                        visible: record.key == 3,
                    },
                    {
                        name: '通过',
                        onClick() {
                            console.log(text, record, index);
                        },
                    },
                    {
                        name: '拒绝',
                        onClick() {
                            console.log(text, record, index);
                        },
                    },
                ];
            },
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
            onVisibleColumnsChange={keys => {
                console.log(keys);
            }}
            autoFit={false}
        />
    );
}
