---
nav:
  title: TdInput 输入框
  path: 1
group: 通用
---

# TdInput 输入框

文本输入框

**变更点**

- 增加输入框添加取消业务模式。
- 默认过滤常见的特殊字符(失去焦点时处理)，\_ 和 - 除外
- 默认去除空格
- 默认开启敏感词校验
- TextArea 默认开启计数，敏感词校验

## 代码演示

<code src="./demos/demo1.tsx">基本用法</code>
<code src="./demos/demo3.tsx">自定义特殊字符过滤</code>
<code src="./demos/demo4.tsx">敏感词校验</code>
<code src="./demos/demo5.tsx">自定义接口(校验敏感词)</code>
<code src="./demos/demo2.tsx">文本域(校验敏感词)</code>
<code src="./demos/demo6.tsx">验证码、确认模式</code>

## API

更多 API 参考[Input](https://ant.design/components/input-cn/)，以下为差异点

### TdInputProps

| 参数                    | 说明                                 | 类型                                         | 默认值    | 版本 |
| ----------------------- | ------------------------------------ | -------------------------------------------- | --------- | ---- |
| trim                    | 是否过滤两边空格                     | boolean                                      | true      |      |
| countDown               | 可选，是否开启验证码模式             | boolean                                      | false     |      |
| specialCharactersFilter | 是否过滤特殊字符           | boolean \| SpecialCharactersFilterOption     | false     |      |
| checkSensitiveWords     | 是否检测敏感词，默认开启             | boolean \| CheckSensitiveWordsOption         | true      |      |
| watchSensitive          | 开启检测敏感词后，自定义校验接口方法 | (value: string) => Promise<boolean>          |           |      |
| onGetMsgCode          | 获取验证码方法 | () => void          |           |      |
| buttonProps          | [TdButton](/components/td-button#api) |         |           |      |

<font color=red>备注：</font>设置编辑确认模式后，<strong>onChange(e) </strong>变成<strong> onChange(value)</strong>

**SpecialCharactersFilterOption**
| 参数 | 说明 | 类型 | 默认值 |
| ----------------------- | ---------------- | ------------------------------------- | ------ |
| include | 可选， 包括，新增需额外过滤的字符 | Array | [] |
| exclude | 可选，排除，排除不需要过滤的字符 | Array | [] |

检测工具完整[参考文档](https://www.npmjs.com/package/sensitive-word-tool?activeTab=readme)

**CheckSensitiveWordsOption**
| 参数 | 说明 | 类型 | 默认值 |
| ----------------------- | ---------------- | ------------------------------------- | ------ |
| wordList | 可选，用于设置初始的敏感词 | Array | [] |
| noiseWords | 可选，用于设置干扰词，敏感词检测时会将待检测文本中的干扰词删除后再匹配 | string | \t\r\n~!@#$%^&\*()\_+-=【】、{}|;\':"，。、《》？αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩①②③④⑤⑥⑦⑧⑨⑩⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇≈≡≠ ＝ ≤≥ ＜＞ ≮≯∷± ＋－×÷／∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙≌∽√§№☆★○●◎◇◆□℃‰€■△▲※→←↑↓〓¤°＃＆＠＼︿＿￣―♂♀┌┍┎┐┑┒┓─┄┈├┝┞┟┠┡┢┣│┆┊┬┭┮┯┰┱┲┳┼┽┾┿╀╁╂╃└┕┖┗┘┙┚┛━┅┉┤┥┦┧┨┩┪┫┃┇┋┴┵┶┷┸┹┺┻╋╊╉╈╇╆╅╄ |
| useDefaultWords | 是否使用默认敏感词 | bool | true |

### TdInput ref

```
export interface ITdInputRef extends TdButtonRef, Partial<InputRef> {
  inputFocus: () => void;
  hasSensitiveWords?: boolean;
}
```

### TdInput.TextArea

| 参数                | 说明                     | 类型                              | 默认值 | 版本 |
| ------------------- | ------------------------ | --------------------------------- | ------ | ---- |
| showCount                | 是否显示计数         | bool                              | true   |      |
| trim                | 是否过滤两边空格         | bool                              | false   |      |
| checkSensitiveWords | 是否检测敏感词，默认开启 | bool \| CheckSensitiveWordsOption | false   |      |
