import { difference } from 'lodash';

function isNotEmpty(value: any) {
  return Array.isArray(value) && value.length > 0;
}

/**
 * 过滤特殊字符
 * @param {String} value 值
 * @param {Object} option
 * @param {Array} [option.include] 新增
 * @param {Array} [option.exclude] 排除
 */
export default function filterSpecialCharacters(
  value: any,
  { include = [], exclude = [] } = {},
) {
  // 特殊符号，- _ 排除
  let specialCharacter = [
    // 小括号
    '(',
    ')',
    '（',
    '）',
    // 中括号
    '\\[',
    '\\]',
    '［',
    '］',
    // 大括号
    '{',
    '}',
    '｛',
    '｝',
    // 方头括号
    '【',
    '】',
    // 尖括号
    '<',
    '>',
    // 书名号
    '《',
    '》',
    // 斜杠
    '/',
    // 反斜杠
    '\\\\',
    // 逗号
    ',',
    '，',
    // 句号
    '.',
    '。',
    // 冒号
    ':',
    '：',
    // 分号
    ';',
    '；',
    // 顿号
    '、',
    // 破折号
    '——',
    // 感叹号
    '!',
    '！',
    // 问号
    '?',
    '？',
    // 加减等于
    '+',
    '=',
    // 单引号
    "'",
    '‘',
    '’',
    // 双引号
    '"',
    '“',
    '”',
    // 金钱
    '$',
    '￥',
    // 百分号
    '%',
    '％',
    // 其它
    '@',
    '#',
    '`',
    '~',
    '*',
    '^',
    '……',
    '|',
    '&',
  ];

  // 新增
  if (isNotEmpty(include)) {
    specialCharacter = Array.from(new Set([...specialCharacter, ...include]));
  }

  // 移除
  if (isNotEmpty(exclude)) {
    specialCharacter = difference(specialCharacter, exclude);
  }

  return value.replace(new RegExp(`[${specialCharacter.join('')}]`, 'g'), '');
}
