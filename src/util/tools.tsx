import { split } from 'lodash'
import React from 'react'
import { TdCascaderOption } from 'td-design/TdCascaderModal'

// 高亮关键词
export function highlightKeyword(
  str: string,
  lowerKeyword: string,
  prefixCls = 'td-cascaderModal',
) {
  const cells = str
    .toLowerCase()
    .split(lowerKeyword)
    .reduce(
      (list: string[], cur: string, index: number) =>
        index === 0 ? [cur] : [...list, lowerKeyword, cur],
      [],
    )
  const fillCells: React.ReactNode[] = []
  let start = 0

  cells.forEach((cell: string, index: number) => {
    const end = start + cell.length
    let originWorld: React.ReactNode = str.slice(start, end)
    start = end

    if (index % 2 === 1) {
      originWorld = (
        // eslint-disable-next-line react/no-array-index-key
        <span
          className={`${prefixCls}-menu-item-keyword`}
          key={`separator-${index}`}
        >
          {originWorld}
        </span>
      )
    }

    fillCells.push(originWorld)
  })

  return fillCells
}

// 通过value遍历数拿到label,可获取节点
export const getNodeLabelByValue = (
  treeData: Array<TdCascaderOption>,
  value: string | number,
  merge = false,
) => {
  let label = ''
  let cascaderLabel: any[] = []
  let node: any = {}
  const deepRecursionLabelById = (
    arr: TdCascaderOption[],
    value: string | number,
    labels: any[],
  ) => {
    if (Array.isArray(arr) && arr.length) {
      for (let i = 0; i < arr.length; i++) {
        let nl = [...(labels || [])]
        nl.push(arr[i].label)
        if (arr[i].value === value) {
          label = arr[i].label || ''
          cascaderLabel = nl
          node = arr[i]
          break
        } else if (arr[i].children) {
          deepRecursionLabelById(
            arr[i].children as TdCascaderOption[],
            value,
            nl,
          )
        }
      }
    }
  }
  deepRecursionLabelById(treeData, value, [])
  return merge ? { node, label: cascaderLabel } : { node, label }
}

export function getParam(url: string, name: string) {
  const params = split(url, '?', 2)
  return new URLSearchParams(params[1]).get(name) || ''
}

export function isFunction(fn: any) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
