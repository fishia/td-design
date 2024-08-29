import { Image, ImageProps } from 'antd';
import cls from 'classnames';
import { T } from 'ramda';
import {
  GroupConsumerProps,
  PreviewGroupPreview,
} from 'rc-image/lib/PreviewGroup';
import React, { useEffect, useState, FC } from 'react';

export interface ThumbImageProps extends ImageProps {
  thumb?: string;
}
export interface TdImageGroupProps extends GroupConsumerProps, IBasicProps {
  urls: Array<ThumbImageProps>; // 图片地址
  errorImage?: string; // 默认加载出错占位图
  current?: number; // 默认预览第几个图
  autoplay?: boolean; // 开启轮播（需大于一张图）
  pauseOnHover?: boolean; // hover暂停轮播
  duration?: number; // 轮播持续时间
  AlbumMode?: boolean; // 开启相册模式
  width?: string | number; //图片宽度
  height?: string | number; //图片高度
  onImageClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number,
  ) => void; // 图片点击
  rootClassName?: string; //轮播父元素
}

const prefixCls = 'td-image-group';

const TdImageGroup: FC<TdImageGroupProps> = (props: TdImageGroupProps) => {
  const {
    urls,
    errorImage = require('./assets/default_error.png'),
    current = 0,
    pauseOnHover = false,
    autoplay = false,
    AlbumMode = false,
    width = 200,
    height = 200,
    duration = 30,
    rootClassName,
    className,
    onImageClick = T,
    style,
    ...rest
  } = props;

  const [preIndex, setIndex] = useState(current);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const classNames = cls(prefixCls, className, {
    [`${prefixCls}__animate`]: autoplay,
    [`${prefixCls}__pauseOnHover`]: pauseOnHover,
    [`${prefixCls}__paused`]: paused,
  });

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number,
  ) => {
    setIndex(i);
    if (onImageClick) onImageClick(e, i);
  };

  useEffect(() => {
    setPaused(visible);
  }, [visible]);

  const ImageRender: FC<ThumbImageProps> = (image) => (
    <Image
      width={width}
      height={height}
      {...{ ...image, src: image.thumb || image.src }}
      preview={{ src: image.src }}
      fallback={errorImage}
      onClick={(e) => {
        if (image?.onClick) image.onClick(e);
      }}
    />
  );
  const ImagesRender: FC<{ preview?: boolean | PreviewGroupPreview }> = (
    props = {},
  ) => {
    return (
      <Image.PreviewGroup
        preview={'preview' in props ? props.preview : true}
        {...rest}
      >
        {urls.map((item, i) => (
          <ImageRender {...item} key={i} onClick={(e) => handleClick(e, i)} />
        ))}
      </Image.PreviewGroup>
    );
  };

  if (urls.length === 1) {
    return <ImageRender {...urls[0]} />;
  }

  if (autoplay) {
    return (
      <div
        className={cls(`${prefixCls}__wrapper`, rootClassName)}
        style={{ ...style, height }}
      >
        <div
          className={classNames}
          onClick={() => setVisible(true)}
          style={{ animationDuration: `${duration}s`, width: 300 }}
        >
          <ImagesRender
            preview={{
              current: preIndex,
              visible,
              onChange: (v) => setIndex(v),
              onVisibleChange: (V) => setVisible(V),
            }}
          />
        </div>
      </div>
    );
  }
  if (AlbumMode) {
    return (
      <>
        <ImageRender
          {...{
            ...urls[current],
            preview: {
              visible: false,
            },
            onClick: () => setVisible(true),
          }}
        />
        <div style={{ display: 'none' }}>
          <ImagesRender
            preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
          />
        </div>
      </>
    );
  }

  return <ImagesRender />;
};

export default TdImageGroup;
