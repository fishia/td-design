import { Modal, ModalFuncProps } from 'antd';
import classNames from 'classnames';
import React, { useImperativeHandle, useState } from 'react';
import { createRoot } from 'react-dom/client';

export interface TdModalProps extends ModalFuncProps {
  className?: string; // 自定义弹窗样式
  noContentBg?: boolean; // 是否显示弹窗背景 默认不显示
  noBoxShadow?: boolean; // 是否显示弹窗阴影 默认不显示
}

export interface modalIns {
  close: () => void;
  destroy: () => void;
}

const TdModal = React.forwardRef(
  (
    props: TdModalProps,
    ref: React.Ref<unknown> | undefined, //React.Ref<modalIns> | null
  ) => {
    const {
      content,
      className, // 自定义弹窗样式
      noContentBg = false, // 是否显示弹窗背景 默认显示
      noBoxShadow = false, // 是否显示弹窗阴影 默认显示
      footer,
    } = props;

    const [open, setOpen] = useState(true);

    const close = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({ close }));

    return (
      <Modal
        {...props}
        open={open}
        footer={footer || null} // 默认不显示footer部分
        className={classNames('modal-show-common', className, {
          'no-box-shadow': noBoxShadow,
          'content-transparent': noContentBg,
        })}
      >
        {content}
      </Modal>
    );
  },
);

export const showModal = ({
  onCancel,
  onOk,
  afterClose,
  ...props
}: TdModalProps) => {
  let ModalContainer = document.getElementById('ModalParent');
  if (!ModalContainer) {
    ModalContainer = document.createElement('div');
    ModalContainer.setAttribute('id', 'ModalParent');
    document.body.appendChild(ModalContainer);
  }
  const root = createRoot(ModalContainer);
  const modalRef = React.createRef<modalIns>();

  const destroy = () => {
    if (root) {
      ModalContainer?.parentNode?.removeChild(ModalContainer);
      root.unmount();
    }
  };

  const close = () => {
    modalRef?.current?.close();
  };

  const handleCancel = () => {
    close();
    if (onCancel) {
      onCancel();
    }
  };

  const handleOk = () => {
    close();
    if (onOk) {
      onOk();
    }
  };

  const handleAfterClose = () => {
    if (afterClose) {
      afterClose();
    }
    setTimeout(() => {
      destroy();
    }, 500);
  };

  root.render(
    <TdModal
      ref={modalRef}
      {...props}
      onCancel={handleCancel}
      onOk={handleOk}
      afterClose={handleAfterClose}
    />,
  );

  return {
    close,
    destroy,
  };
};

export default TdModal;
