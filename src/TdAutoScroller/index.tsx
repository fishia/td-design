import classNames from 'classnames'
import React, {
  CSSProperties,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

enum AnimationPlayState {
  /** 暂停动画 */
  PAUSED = 'paused',
  /** 播放动画 */
  RUNNING = 'running',
}

export enum AnimationDirection {
  /** 正向滚动 */
  NORMAL = 'normal',
  /** 反向滚动 */
  REVERSE = 'reverse',
}

export enum AnimationAxis {
  /** 横向滚动 */
  X = 'X',
  /** 竖向滚动 */
  Y = 'Y',
}

interface TdAutoScrollerProps {
  children?: React.ReactNode
  /** 动画滚动时间 */
  duration?: number
  /** 动画滚动方向 */
  direction?: AnimationDirection
  /** 动画滚动坐标轴 */
  axis?: AnimationAxis
  customStyle?: CSSProperties
  defaultState?: boolean
}

export interface TdAutoScrollerRef {
  /** 切换组件播放暂停状态 */
  toggleAnimationPlayState: () => void
}

const TdAutoScroller = forwardRef(
  (props: TdAutoScrollerProps, ref: Ref<TdAutoScrollerRef>) => {
    const {
      children,
      duration = 20,
      direction = AnimationDirection.NORMAL,
      customStyle,
      axis = AnimationAxis.X,
      defaultState = true,
    } = props

    const [startDistance, setStartDistance] = useState(0)
    const [endDistance, setEndDistance] = useState(0)
    const [animationPlayState, setAnimationPlayState] = useState(defaultState)

    const [uid, setUid] = useState(
      `${Math.random().toString(36).substring(2, 10)}`,
    )
    const [keyframesName, setKeyframesName] = useState(`autoscroll_${uid}`)
    const [keyframes, setKeyframes] = useState('')

    useEffect(() => {
      const container = document.getElementById(
        `td-autoscroller-container_${uid}`,
      )

      if (container) {
        const { scrollWidth, scrollHeight } = container
        if (axis === AnimationAxis.X) {
          setStartDistance(
            direction === AnimationDirection.NORMAL ? 0 : scrollWidth / 2,
          )
          setEndDistance(
            direction === AnimationDirection.NORMAL ? scrollWidth / 2 : 0,
          )
        } else {
          setStartDistance(
            direction === AnimationDirection.NORMAL ? 0 : scrollHeight / 2,
          )
          setEndDistance(
            direction === AnimationDirection.NORMAL ? scrollHeight / 2 : 0,
          )
        }
      }
    }, [direction, axis, uid])

    useEffect(() => {
      setKeyframes(`
        @keyframes ${keyframesName} {
          0% {
            transform: translate${axis}(-${startDistance}px);
          }
          100% {
            transform: translate${axis}(-${endDistance}px);
          }
        }
      `)
    }, [keyframesName, axis, startDistance, endDistance])

    useImperativeHandle(ref, () => ({
      toggleAnimationPlayState: () =>
        setAnimationPlayState(!animationPlayState),
    }))

    return (
      <div className="td-autoscroller" style={customStyle}>
        <style>{keyframes}</style>
        <div
          className={classNames(
            'td-autoscroller-container',
            `td-autoscroller-container--${axis}`,
          )}
          id={`td-autoscroller-container_${uid}`}
          onMouseEnter={() => setAnimationPlayState(false)}
          onMouseLeave={() => setAnimationPlayState(true)}
          style={{
            animation: `${keyframesName} ${duration}s linear infinite`,
            animationPlayState: `${
              animationPlayState
                ? AnimationPlayState.RUNNING
                : AnimationPlayState.PAUSED
            }`,
          }}
        >
          {children}
          {children}
        </div>
      </div>
    )
  },
)

export default TdAutoScroller
