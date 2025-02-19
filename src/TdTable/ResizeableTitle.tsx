import React from 'react'
import { Resizable } from 'react-resizable'

interface ResizeableTitleProps {
  onResize: () => void
  width: number
}
const ResizeableTitle = (props: ResizeableTitleProps) => {
  const { onResize, width, ...restProps } = props
  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export default ResizeableTitle
