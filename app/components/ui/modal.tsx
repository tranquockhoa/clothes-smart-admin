import { Modal, type ModalProps } from "antd";
import type { FC } from "react";

const BaseMoDal: FC<ModalProps> = (props) => {
  return <Modal {...props} />;
};

const MyModal = Object.assign(Modal, BaseMoDal);

export default MyModal;
