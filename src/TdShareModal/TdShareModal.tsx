import { Modal, ModalProps, Spin } from 'antd'
import cls from 'classnames'
import html2canvas from 'html2canvas'
import dayjs from 'dayjs'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import DefaultImg from './assets/defaultBg.png'
import ImgChecked from './assets/imgCheck.png'
import Logo from './assets/logoWhite.svg'
import MouseImg from './assets/mouse.svg'
import ShareTip from './ShareTip'

export interface TdShareModalProps extends ModalProps {
  bgUrlList?: string[] // 背景图片列表
  bgUrl?: string // 背景图片
  mouseTipsText?: string | React.ReactElement // 鼠标提示文字
  showHeadLabel?: boolean // 是否展示时刻
  logo?: string
  year?: string
  month?: string
  day?: string
  watermarkWord?: string
}
export interface TdShareModalRef {
  show: () => void
  close: () => void
  toCanvas: () => void
}

export interface FooterProps {
  bgUrlList?: string[]
  setBgImg: (e: string) => void
  bgImgUrl?: string
}
const Footer = (props: FooterProps) => {
  const { bgUrlList = [], setBgImg, bgImgUrl } = props

  return (
    <div className="td-share-modal__footer">
      {bgUrlList.map(item => (
        <div className="td-share-modal__footer__bgWrapper">
          <img
            src={item}
            alt=""
            className="td-share-modal__footer__bgImg"
            onClick={() => setBgImg(item)}
          />
          {bgImgUrl === item ? (
            <div className="td-share-modal__footer__bgImg--selected">
              <img src={ImgChecked} className="checkImg" alt="" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

const TdShareModal = (
  props: TdShareModalProps,
  ref?: React.Ref<TdShareModalRef>,
) => {
  const {
    bgUrl = DefaultImg,
    mouseTipsText = (
      <div>
        鼠标右键复制图片
        <br />
        粘贴到微信分享
      </div>
    ),
    bgUrlList = [],
    logo = Logo,
    showHeadLabel = false,
    year,
    month = dayjs().format('MM'),
    day = dayjs().format('DD'),
    watermarkWord,
    ...rest
  } = props
  const [visible, setVisible] = useState(false)
  const canvasRef = useRef<any>(null)
  const [mouseState, setMouseState] = useState(true)
  const [bottomState, setBottomState] = useState(false)
  const [src, setSrc] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [bgImg, setBgImg] = useState<string | undefined>('')

  useEffect(() => {
    if (!mouseState) {
      setBottomState(true)
    }
  }, [mouseState])

  const handelClose = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    close: handelClose,
    toCanvas,
  }))

  const toCanvas = () => {
    setLoading(true)
    html2canvas(canvasRef.current, {
      allowTaint: true,
      useCORS: true,
      scale: 4,
    }).then(function (canvas) {
      setLoading(false)
      console.log(2)
      setSrc(canvas.toDataURL('image/png'))
    })
  }

  useEffect(() => {
    setBgImg(bgUrl)
  }, [bgUrl])

  useEffect(() => {
    if (visible) {
      setTimeout(toCanvas, 200)
    }
  }, [bgImg, visible])

  const onMouseDown: React.MouseEventHandler<HTMLImageElement> = event => {
    console.log(event)
    if (event.button === 2) {
    }
  }

  return (
    <Modal
      width="800px"
      destroyOnClose
      open={visible}
      title="分享概览"
      onCancel={handelClose}
      centered
      maskClosable={false}
      wrapClassName={cls(`td-share-modal`, rest?.wrapClassName)}
      footer={
        bgUrlList.length ? (
          <Footer bgUrlList={bgUrlList} setBgImg={setBgImg} bgImgUrl={bgImg} />
        ) : null
      }
      {...rest}
    >
      <div className="td-share-modal-canvas">
        <Spin spinning={loading}>
          <div className="td-share-modal-canvas__scrolls">
            <img
              src={src}
              onMouseDown={onMouseDown}
              alt=""
              style={{ zIndex: 3 }}
              className="td-share-modal-canvas__wrapper"
            />
            <div
              ref={canvasRef}
              className="td-share-modal-canvas__wrapper"
              style={{ zIndex: 2, backgroundImage: `url(${bgImg})` }}
            >
              <div className="td-share-modal-canvas__content">
                {showHeadLabel && (
                  <div className="rel">
                    <img src={logo} alt="" className="logo" />
                    <div className="date f18">
                      <div className="strong">
                        {year ? `${year}/` : ''}
                        {month}
                      </div>
                      <div className="f12">/ {day}</div>
                    </div>
                  </div>
                )}
                {watermarkWord && (
                  <p
                    className="watermark"
                    style={{
                      textShadow: '0px 2px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    {watermarkWord}
                  </p>
                )}
                {'children' in rest ? rest.children : null}
              </div>
            </div>
          </div>
        </Spin>
        <ShareTip
          type="left"
          imgUrl={MouseImg}
          style={{ marginLeft: `calc(100% + 16px)`, bottom: '100px' }}
          text={mouseTipsText}
          state={mouseState}
          setState={setMouseState}
        />
      </div>
    </Modal>
  )
}

export default forwardRef<TdShareModalRef, TdShareModalProps>(TdShareModal)
