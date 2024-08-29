import { useEffect, useReducer, useState } from 'react'

export const useLength = (val = '', { showCount = false } = {}) => {
  const [len, setLen] = useState(0)
  useEffect(() => {
    if (showCount) {
      setLen(String(val ?? '').length)
    }
  }, [val])
  return len
}

// 类似于class component的setState
export const useSet = (initState: any) => {
  const [state, setState] = useReducer((state: any, newState: any) => {
    let action = newState
    if (typeof newState === 'function') {
      action = action(state)
    }
    if (newState.action && newState.payload) {
      action = newState.payload
      if (typeof action === 'function') {
        action = action(state)
      }
    }
    const result = { ...state, ...action }
    return result
  }, initState)
  return [
    state,
    (state: any) => {
      setState(state)
    },
  ]
}
