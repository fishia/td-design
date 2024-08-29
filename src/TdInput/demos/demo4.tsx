/**
 * desc: 支持自定义特殊字符过滤
 */
import React from 'react';
import { Form } from 'antd';
import { TdInput } from 'td-design';

function Demo() {
    return (
        <Form>
            <Form.Item label="检测敏感词" name="custom">
                <TdInput
                specialCharactersFilter={{ include: ['-'], exclude: ['@'] }}
                    checkSensitiveWords
                    placeholder="请输入"
                    style={{ width: 220 }}
                />
            </Form.Item>
        </Form>
    );
}

export default Demo;
