/**
 * desc: 单行文本
 */
import React from 'react';
import { Form } from 'antd';
import { TdInput } from 'td-design';

function Demo() {
    return (
        <Form>
            <Form.Item label="默认开启特殊字符过滤" name="name">
                <TdInput showCount placeholder="请输入" style={{ width: 220 }} />
            </Form.Item>
            <Form.Item label="关闭特殊字符过滤" name="code">
                <TdInput
                    specialCharactersFilter={false}
                    placeholder="请输入"
                    style={{ width: 220 }}
                />
            </Form.Item>
        </Form>
    );
}

export default Demo;
