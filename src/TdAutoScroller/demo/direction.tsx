import React from 'react'
import {
  AnimationAxis,
  AnimationDirection,
  TdAutoScroller,
  TdAutoScrollerRef,
} from 'td-design'

const Direction = () => {
  const divStyle: React.CSSProperties = {
    width: '300px',
    height: '100px',
    background: '#3913e2',
    color: 'white',
    lineHeight: '80px',
    textAlign: 'center',
    border: '1px solid white',
  }

  const buttonStyle: React.CSSProperties = {
    margin: '0 20px 20px 0',
  }

  const [direction, setDirection] = React.useState<AnimationDirection>(
    AnimationDirection.REVERSE,
  )
  const [axis, setAxis] = React.useState<AnimationAxis>(AnimationAxis.X)

  const ref = React.useRef<TdAutoScrollerRef>(null)

  return (
    <div className="direction-demo">
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setDirection(AnimationDirection.NORMAL)}
      >
        正向滚动
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setDirection(AnimationDirection.REVERSE)}
      >
        反向滚动
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setAxis(AnimationAxis.X)}
      >
        X轴滚动
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setAxis(AnimationAxis.Y)}
      >
        Y轴滚动
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => {
          ref.current?.toggleAnimationPlayState()
        }}
      >
        初始滚动状态为禁止滚动，点击切换开关状态
      </button>

      <div>
        目前滚动方向---
        {direction === AnimationDirection.NORMAL ? '正向' : '反向'}
      </div>
      <div style={{ marginBottom: '20px' }}>目前坐标轴方向---{axis}</div>

      <TdAutoScroller
        direction={direction}
        axis={axis}
        ref={ref}
        defaultState={false}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => {
          return (
            <div key={i} style={divStyle}>
              {v}
            </div>
          )
        })}
      </TdAutoScroller>
    </div>
  )
}

export default Direction
