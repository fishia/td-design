import {
  CloseCircleFilled,
  ExclamationCircleFilled,
  SearchOutlined,
} from '@ant-design/icons'
import { message, Modal, ModalProps, Select, SelectProps } from 'antd'
import Tooltip from 'antd/es/tooltip'
import cls from 'classnames'
import { filter, map, omit, prop, props as Props, T, uniq, uniqBy } from 'ramda'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { getNodeLabelByValue, highlightKeyword } from 'td-design/util/tools'
import TdTagButton, { TdTagButtonProps } from '../TdTagButton'
import { LabeledValue, TdSelectOption } from '../TdTagSelect'
import Footers, { FootersProps } from './footer'

export interface TdCascaderOption extends Omit<TdSelectOption, 'children'> {
  children?: Array<TdCascaderOption>
}

export interface TdCascaderModalRef {
  show: () => void
  close: () => void
}

export type TdCheckedValueType = string | number | LabeledValue
export interface TdCascaderModalProps extends ModalProps {
  treeData: Array<TdCascaderOption>
  labelInValue?: boolean // 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式
  continuous?: boolean // 是否开启连续选择
  title?: string | React.ReactNode
  desc?: string | React.ReactNode //描述
  multiple?: boolean //是否开启多选
  limit?: number //最多选择多少个 tag，配合multiple
  span?: number // 分多少联
  gap?: number // 设置网格之间的间隙
  spanWidth?: Array<number> // 每联的宽度
  value?: Array<TdCheckedValueType> //叶子节点选中key,多选有效
  showSearch?: boolean // 开启搜索
  onSearch?: Promise<Array<TdSelectOption>> // 搜索api
  searchInputProps?: SelectProps // 搜索框属性
  async?: boolean // 异步加载
  checkAllText?: string // 配置选中所有并触发关闭的文案（单选时有效)
  selectedWhenCheckedAll?: boolean // 当选择到配置文案时直接关闭（单选时有效)
  onlyRecordLeafNode?: boolean // 是否仅返回叶子节点
  keepAlive?: boolean // 是否保留上次叶子选中状态（多选有效）
  leafMaxWidth?: number | string // 最后叶子节点最大宽度
  TdTagButtonProps?: TdTagButtonProps
  footerProps?: FootersProps
  onClose?: () => void
  onChange?: (checkedList: Array<TdCheckedValueType>) => void
  onConfirm?: (checkedList: Array<TdCheckedValueType>) => void
  selectOptionRender?: (item: LabeledValue) => React.ReactNode
}

const TdCascaderModal = (
  props: TdCascaderModalProps,
  ref?: React.Ref<TdCascaderModalRef>,
) => {
  const {
    open = false,
    treeData = [],
    value: checkedKeys,
    title,
    desc,
    multiple = false,
    labelInValue = false,
    // async = false,
    selectedWhenCheckedAll = false,
    checkAllText = '全部',
    limit = 5,
    leafMaxWidth = 114,
    span = 3,
    keepAlive = true,
    footer,
    TdTagButtonProps,
    searchInputProps,
    footerProps,
    onClose = T,
    onChange = T,
    onConfirm = T,
    selectOptionRender = T,
    className,
    style,
    onlyRecordLeafNode = true,
    ...rest
  } = props

  const [visible, setVisible] = useState(false)
  const [isFirst, setIsFirst] = useState(true) // 是否首次
  const [isClicked, setIsClicked] = useState(false) // 是否点击过（兼容单选时，有初始值情况下会自动关闭情况）
  const [selections, setSelections] = useState<LabeledValue[]>([]) // 所有有效选中项集合
  const [leafNodeSelections, setLeafNodeSelections] = useState<LabeledValue[]>(
    [],
  ) // 仅叶子节点选中有效集合
  const [chunks, setChunks] = useState<Array<Array<TdCascaderOption>>>([])
  const [rootNodeIndex, setRootNodeIndex] = useState<number>(0) //根节点选中索引
  const [deepLevel, setDeepLevel] = useState<number>(span) // 记录被点击的节点层级
  const [nodeLevel, setNodeLevel] = useState<number>(0) // 记录被点击的节点层级
  const [inputValue, setInputValue] = useState<string>('') //-工作地点默认文本值
  const [optionList, setOptionList] = useState<LabeledValue[]>([]) // 搜索列表

  const classNames = cls('td-cascaderModal', className)

  // ==================== 整理关联属性边界 =====================
  // 1、当multiple为false时，去除footer
  // 2、spanWidth的Length需等于span
  // 3、如果只记录叶子结点，即选即返,开启触发关键词关闭则关闭onlyRecordLeafNode属性
  // 4、开启最终叶子节点单选或者触发关键词关闭都需要将多选关闭
  const mergedBasic: Omit<TdCascaderModalProps, 'treeData'> =
    React.useMemo(() => {
      let basicConfig: Omit<TdCascaderModalProps, 'treeData'> = {
        showSearch: props?.multiple ? false : props?.showSearch,
        //onlyRecordLeafNode: !selectedWhenCheckedAll,
      }

      if (Array.isArray(props?.spanWidth) && props?.spanWidth.length) {
        if (props?.spanWidth.length < deepLevel) {
          console.warn('spanWidth的Length需等于树最深层级')
        }
        basicConfig = {
          ...basicConfig,
          spanWidth:
            props?.spanWidth.length > deepLevel
              ? props?.spanWidth.slice(0, deepLevel)
              : props?.spanWidth,
        }
      }

      return basicConfig
    }, [deepLevel])
  const {
    showSearch = false,
    spanWidth = [192, 192, 414],
    //onlyRecordLeafNode = true,
  } = mergedBasic

  // 外部弹窗开关受控,打开重置级联列表chunks
  useEffect(() => {
    setVisible(open)
  }, [open])

  // 递归拼接当前节点的所有父节点的名称
  const recursionConcatParentsLabelByNodeId = (
    data: TdCascaderOption[],
    value: string | number,
  ) => {
    // eslint-disable-next-line guard-for-in
    for (let i in data) {
      if (data[i].value === value) {
        return `${data[i].label}-${checkAllText}`
      }
      if (data[i].children) {
        let node: any = recursionConcatParentsLabelByNodeId(
          data[i].children as any,
          value,
        )
        if (node !== undefined) {
          return (node = data[i].label + '-' + node)
        }
      }
    }
  }
  // onChange,onConfirm执行
  const execCallback = (fn: (v: TdCheckedValueType[]) => void) => {
    let filterArr = leafNodeSelections
    if (labelInValue) {
      fn(filterArr)
    } else {
      fn(filterArr.map(item => item.value as string))
    }
  }
  // 关闭，进行部分初始化工作
  const handelClose = () => {
    onClose()
    setRootNodeIndex(0)
    setVisible(false)
    setIsFirst(true)
    setIsClicked(false)
    if (!keepAlive) {
      setSelections([])
    } else {
      // if (selectedWhenCheckedAll) {
      //   //去除非叶子节点
      //   setSelections(selections.filter(item => item.isLeaf))
      // }
    }
  }
  //提交
  const handleConfirm = () => {
    execCallback(onChange)
    execCallback(onConfirm)
    handelClose()
  }

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    close: handelClose,
  }))

  // 获取树的最深层级
  const getDeepLevel = (arr: TdCascaderOption[]) => {
    let maxLevel = 0
    function dfs(node: TdCascaderOption[], level: number) {
      maxLevel = Math.max(maxLevel, level)
      if (Array.isArray(node)) {
        node.forEach(child => {
          if (
            child.children &&
            Array.isArray(child.children) &&
            child?.children?.length
          )
            dfs(child.children, level + 1)
        })
      }
    }
    dfs(arr, 1)
    return maxLevel
  }

  // 获取最新chunks，重点
  const getChunksByTreeData = useCallback(
    (
      dataSource: TdCascaderOption[],
      levelNodeIndex: number,
      nodeLevel: number,
    ) => {
      let newArr = [...chunks]
      const deepRecursionTreeData = (
        arr: TdCascaderOption[],
        currentLevelNodeIndex: number,
        level: number,
      ) => {
        newArr.splice(level, 1, arr)
        setChunks(newArr)
        let childNode = arr[currentLevelNodeIndex]
        if (
          childNode &&
          childNode.children &&
          Array.isArray(childNode.children) &&
          childNode?.children?.length
        ) {
          // 顺位子栏默认加载第一个children
          deepRecursionTreeData(
            childNode.children as TdCascaderOption[],
            0,
            level + 1,
          )
        } else {
          // 如果该节点层级没有达到最深层级，则剩余级联列表置为空
          for (let i = level + 1; i < deepLevel; i++) {
            newArr.splice(i, 1, [])
          }
        }
      }
      deepRecursionTreeData(dataSource, levelNodeIndex, nodeLevel)
      return newArr
    },
    [chunks],
  )

  // 判断该节点是否叶子节点
  const isLeafNode = (node: TdCascaderOption) => {
    return !(
      node &&
      node.children &&
      Array.isArray(node.children) &&
      node?.children?.length
    )
  }

  // 根节点变化，默认选中根节点顺位栏的第一个，纯交互，不改变最终叶子节点选中情况
  const initSelectionsWhenRootChange = useCallback(
    (chunks: TdCascaderOption[][]) => {
      if (chunks.length) {
        let temps = selections.filter(item => !item.isLeaf)
        let tempsLeafs = selections.filter(item => item.isLeaf)
        temps.splice(0, 1, chunks[0][rootNodeIndex])
        for (let i = 1; i < deepLevel - 1; i++) {
          // 全选开启后，切换根节点时，当除叶子节点以外的选中状态都需要清空（因为要更新加载chunks)
          if (selectedWhenCheckedAll) {
            temps.splice(i, 1)
          } else {
            if (chunks[i][0]) {
              temps.splice(i, 1, chunks[i][0])
            }
          }
        }
        let uniqArr = uniq([...temps, ...tempsLeafs])
        setSelections(uniqArr)
        return uniqArr
      }
    },
    [rootNodeIndex, deepLevel, selections],
  )

  // 初始化checkedKeys
  const initCheckedKeys = useCallback(
    (tempSelections?: LabeledValue[]) => {
      if (isFirst && Array.isArray(checkedKeys)) {
        console.log(tempSelections, 'tempSelections')
        console.log(checkedKeys, 'checkedKeys')
        // 如果value为空，则去掉之前选中的所有叶子节点
        setSelections(
          uniqBy(
            Props(['value', 'label']),
            checkedKeys.length
              ? (tempSelections?.concat(
                  checkedKeys.map((item: any) => ({
                    value: item?.value || item,
                    label: getNodeLabelByValue(treeData, item?.value || item)
                      .label as string,
                    isLeaf: isLeafNode(
                      getNodeLabelByValue(treeData, item?.value || item).node,
                    ),
                  })),
                ) as any[])
              : (tempSelections?.filter(item => !item?.isLeaf) as any[]),
          ),
        )
        setIsFirst(false)
      }
    },
    [checkedKeys, isFirst],
  )

  // 初始化chunks或更改rootIndex时更新
  const initChunksByTreeData = useCallback(() => {
    if (visible) {
      const chunks = getChunksByTreeData(treeData, rootNodeIndex, 0)
      const tempSelections = initSelectionsWhenRootChange(chunks)
      initCheckedKeys(tempSelections)
    }
  }, [treeData, rootNodeIndex, visible])

  // 初始搜索列表（从级联数据里flatten之后取最后一级子节点)
  const initSearchOptions = useCallback(() => {
    let leafs: LabeledValue[] = []
    function get_leaf_nodes(
      node: TdCascaderOption,
      leaf_nodes: LabeledValue[],
    ) {
      if (!node.children) {
        let labels: string[] = getNodeLabelByValue(treeData, node.value, true)
          .label as any[]
        leaf_nodes.push({
          value: node.value,
          label: labels.join('-'),
        })
      } else {
        for (let child of node.children as TdCascaderOption[]) {
          get_leaf_nodes(child, leaf_nodes)
        }
      }
    }
    for (let child of treeData) {
      get_leaf_nodes(child, leafs)
    }
    setOptionList(leafs)
  }, [treeData])

  // 实时返回value callback
  const renderValue = useCallback(() => {
    // 如果单选且只记录最后一栏叶子节点或开启了触发关键词关闭，选中即可关闭
    if (!multiple) {
      if (
        (((onlyRecordLeafNode || selectedWhenCheckedAll) &&
          leafNodeSelections.length) ||
          (selectedWhenCheckedAll &&
            selections.filter(item => item.label === checkAllText)[0])) &&
        isClicked
      ) {
        execCallback(onChange)
        handelClose()
      }
    }
  }, [leafNodeSelections])

  // 初始化chunks
  useEffect(initChunksByTreeData, [initChunksByTreeData])

  // 默认初始化选中项
  useEffect(() => {
    if (showSearch) initSearchOptions()
  }, [])

  useEffect(() => {
    if (treeData.length) setDeepLevel(getDeepLevel(treeData))
  }, [treeData])

  // 返回有效选中节点
  useEffect(() => {
    let leafSelectedNodes = []
    console.log(selections, 'selection')
    if (checkAllText) {
      // 选中全部也可以记录节点
      leafSelectedNodes = filter(
        (v: LabeledValue) => v?.isLeaf || v?.label === checkAllText,
        selections,
      )
    } else {
      leafSelectedNodes = filter(
        (v: LabeledValue) => (v?.isLeaf ? true : false),
        selections,
      )
    }

    setLeafNodeSelections(
      leafSelectedNodes.map(item => ({
        ...item,
        label:
          item.label === checkAllText
            ? recursionConcatParentsLabelByNodeId(treeData, item.value)
            : item.label,
      })),
    )
  }, [selections])

  useEffect(renderValue, [renderValue])

  // 判断是否选中，自己或自己子节点只要被选中就赋予选中状态
  const isHadSelected = useCallback(
    (option: TdCascaderOption) => {
      // todo 还要判断是否是叶子节点，treeData,递归赋值isLeaf
      return (
        selections.filter(
          item =>
            item.value === option.value &&
            item.label === option.label &&
            isLeafNode(item as TdCascaderOption) == isLeafNode(option),
        ).length > 0
      )
    },
    [selections],
  )

  //  移除选中(备注：全部value和父节点一致)
  const removeSelected = (option: LabeledValue, selectedNodes = selections) => {
    return selectedNodes.filter(
      item => item.value !== option.value || item.label !== option.label,
    )
  }

  // 递归节点,去除选中项
  const recursiveRemoveNode = (
    data: TdCascaderOption[],
    selectedNodes: LabeledValue[],
  ) => {
    let tempSelections = [...selectedNodes]
    data.forEach((item: TdCascaderOption) => {
      if (isHadSelected(item))
        tempSelections = removeSelected(item, tempSelections)
      if (item.children) {
        tempSelections = recursiveRemoveNode(item.children, tempSelections)
      }
    })
    return tempSelections
  }

  // 清空同级层级非全部的互斥选项
  const clearChildSelectedNodes = (option: LabeledValue, level: number) => {
    let tempSelections = selections.filter(item => !item.isLeaf)
    let tempLeftNodesSelections = selections.filter(item => item.isLeaf)
    // 叶子节点直接保留
    if (level === deepLevel - 1) {
      // 去除叶子节点非“全部”选项以外的选中
      tempLeftNodesSelections = tempLeftNodesSelections.filter(
        item => !map(prop('value'), chunks[level]).includes(item.value as any),
      )
      tempLeftNodesSelections.push(option)
    } else {
      tempSelections.splice(level, 1, option)
      // 循环去除同层级下面的所有子节点选中情况
      tempLeftNodesSelections = recursiveRemoveNode(
        chunks[level],
        tempLeftNodesSelections,
      )
    }
    return [...tempSelections, ...tempLeftNodesSelections]
  }

  // 清空同层级全部———（关键词）的选中状态
  const clearCheckAllNodes = (option: LabeledValue, level: number) => {
    let tempSelections = selections.filter(item => !item.isLeaf)
    let tempLeftNodesSelections = selections.filter(item => item.isLeaf)
    let checkAllNode = chunks[level].filter(item => item.label === checkAllText)
    // 取出该层级的"全选"节点value,判断该节点是不是选中状态，是，去除，否，push叶子节点
    if (checkAllNode.length > 0) {
      if (isHadSelected(checkAllNode[0])) {
        tempLeftNodesSelections = removeSelected(
          checkAllNode[0],
          tempLeftNodesSelections,
        )
      }
    }
    // 叶子节点直接push（包括“全选”）
    if (option.isLeaf) {
      tempLeftNodesSelections.push(option)
    } else if (level !== deepLevel - 1) {
      // 非叶子节点且不是最深层级直接替换当前层级的选中
      tempSelections.splice(level, 1, option)
    }
    return [...tempSelections, ...tempLeftNodesSelections]
  }

  // 判断选择是否上限
  const limitSelected = (option: LabeledValue, level: number) => {
    if (limit && multiple) {
      if (onlyRecordLeafNode) {
        if (level === deepLevel - 1 && leafNodeSelections.length >= limit) {
          message.warning(`最多支持选择${limit}个`)
          return true
        }
      } else {
        if (leafNodeSelections.length >= limit) {
          {
            message.warning(`最多支持选择${limit}个`)
            return true
          }
        }
      }
    }
    return false
  }

  // 选项点击事件,重点
  const handleOptionClick = (
    checked: boolean,
    option: LabeledValue,
    index: number,
    level: number,
    data?: TdCascaderOption[],
  ) => {
    setIsClicked(true)
    if (checked) {
      if (!limitSelected(option, level)) {
        //不管多选，单选。 如果点击的是根节点，需记录索引，更新数据源
        if (level === 0) {
          setRootNodeIndex(index)
          // 单选，去除选中项,多选，更新根节点选中项
          if (multiple) {
            let tempSelections = [...selections]
            tempSelections.splice(0, 1, option)
            setSelections(tempSelections)
          } else {
            setSelections([option])
          }
        } else {
          // 如果点击的是非根节点，需初始化已该节点为父节点的子列表
          setNodeLevel(level)
          if (data) getChunksByTreeData(data, index, level)
          if (multiple) {
            // 多选,叶子节点直接push，非叶子节点替换当前栏的选中节点
            let tempSelections = [...selections]
            if (selectedWhenCheckedAll) {
              if (option.label === checkAllText) {
                // 如果是全选，清空同层级下的所有叶子节点
                tempSelections = clearChildSelectedNodes(option, level)
              } else {
                // 如果点击非全部节点，去除同层级全部节点的选中
                tempSelections = clearCheckAllNodes(option, level)
              }
            } else {
              if (option.isLeaf) {
                tempSelections.push(option)
              } else {
                tempSelections.splice(level, 1, option)
              }
            }
            setSelections(tempSelections)
          } else {
            // 单选，去除改层级之后的子层级选中情况，更新选中结果
            let tempSelections = selections.slice(0, level + 1)
            tempSelections.splice(level, 1, option)
            setSelections(tempSelections)
          }
        }
      }
    } else {
      //仅多选，叶子节点可反选
      if (multiple && option.isLeaf) {
        setSelections(selections.filter(item => item.value !== option.value))
      }
    }
  }

  // 渲染底部
  const renderFooter = () => {
    // footer为false或者null不显示footer,为true时，默认显示选中项，不传直接使用Modal自带的footer
    if (
      (typeof footer === 'boolean' && !footer) ||
      Object.prototype.toString.call(footer) === '[object Null]'
    ) {
      return null
    }
    if (typeof footer === 'boolean' && footer) {
      return (
        <Footers
          label={`已选(${leafNodeSelections?.length})`}
          okText={`确认(${
            leafNodeSelections?.length === 0 ? '' : leafNodeSelections?.length
          })`}
          options={leafNodeSelections.map(item => ({
            ...omit(['loading'], item),
          }))}
          onChange={value => {
            if (value)
              setSelections(
                selections
                  .filter(item => !item.isLeaf)
                  .concat(
                    map(omit(['checked']))(
                      value as LabeledValue[],
                    ) as LabeledValue[],
                  ),
              )
          }}
          onOk={handleConfirm}
          TdTagSelectProps={{
            multiple: true,
            labelInValue: true,
            TdTagButtonProps: {
              width: 'auto',
              closable: true,
              ellipsis: true,
            },
          }}
          {...footerProps}
        />
      )
    }
  }

  return (
    <Modal
      width={800}
      open={visible}
      onOk={handleConfirm}
      onCancel={handelClose}
      centered
      {...rest}
      maskClosable
      wrapClassName="td-cascaderModal__modal"
      title={
        <div className="td-cascaderModal__top">
          {title && (
            <div className="td-cascaderModal__title">
              {title}
              {desc ? (
                <span className="td-cascaderModal__desc">({desc})</span>
              ) : null}
            </div>
          )}
          {showSearch && (
            <div className="td-cascaderModal__searchInput">
              <SearchOutlined
                style={{
                  fontSize: '16px',
                  color: '#A6A6A6',
                  position: 'absolute',
                  left: '14px',
                  top: '13px',
                  zIndex: 6,
                }}
              />
              <Select
                showSearch
                labelInValue
                showArrow={false}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (
                    (optionList.filter(
                      item => item.value === (option as LabeledValue).value,
                    )[0]?.label as string) ?? ''
                  ).includes(input.toLowerCase())
                }
                allowClear={{
                  clearIcon: (
                    <CloseCircleFilled
                      style={{
                        fontSize: '14px',
                        color:
                          (inputValue || '').length > 0
                            ? '#bfbfbf'
                            : 'transparent',
                        cursor:
                          (inputValue || '').length > 0 ? 'pointer' : 'text',
                      }}
                    />
                  ),
                }}
                options={optionList.map(item => ({
                  ...item,
                  label:
                    'selectOptionRender' in props
                      ? selectOptionRender(item)
                      : highlightKeyword(
                          item.label as string,
                          inputValue.toLowerCase(),
                        ),
                }))}
                notFoundContent={
                  inputValue ? (
                    <div className="td-cascaderModal__searchInput__notFount">
                      <ExclamationCircleFilled />
                      暂无包含“{inputValue}”的省市区
                    </div>
                  ) : null
                }
                onSearch={setInputValue}
                onSelect={o => {
                  setIsClicked(true)
                  setLeafNodeSelections([
                    {
                      ...o,
                      label: optionList.filter(
                        item => item.value === (o as LabeledValue).value,
                      )[0]?.label,
                    },
                  ])
                }}
                {...searchInputProps}
              />
            </div>
          )}
        </div>
      }
      footer={renderFooter()}
    >
      <div className={classNames} style={style}>
        <div className="td-cascaderModal__list">
          {chunks.map((chunk, level) => (
            <ul
              className="td-cascaderModal__chunkList"
              key={level}
              style={{
                flexFlow:
                  level === deepLevel - 1 ? 'row wrap' : 'column nowrap',
                width: spanWidth[level] || 'auto',
                flexShrink: spanWidth[level] ? 0 : 1,
              }}
            >
              {chunk.map((blockItem, index) => (
                <li
                  key={index}
                  style={{
                    width: '100%',
                    maxWidth: level === deepLevel - 1 ? leafMaxWidth : '100%',
                    margin: level === deepLevel - 1 ? '0px 10px 16px 0px' : '',
                  }}
                >
                  <Tooltip title={blockItem.label}>
                    <TdTagButton
                      checked={isHadSelected(blockItem)}
                      ellipsis
                      {...{
                        theme: 'default',
                        ghost: false,
                        bordered: false,
                        icon: null,
                        type: 'link',
                        ...blockItem,
                      }}
                      {...TdTagButtonProps}
                      onClick={(e, checked) => {
                        handleOptionClick(
                          checked,
                          { ...blockItem, isLeaf: isLeafNode(blockItem) },
                          index,
                          level,
                          chunk,
                        )
                      }}
                    >
                      {blockItem.label}
                    </TdTagButton>
                  </Tooltip>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef<TdCascaderModalRef, TdCascaderModalProps>(
  TdCascaderModal,
)
