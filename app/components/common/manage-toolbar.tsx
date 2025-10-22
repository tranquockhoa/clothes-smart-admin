import { PlusOutlined } from "@ant-design/icons";
import { Space } from "antd";
import MyButton from "~/components/ui/button";
import { useState, type ReactElement, cloneElement } from "react";

interface BaseModalProps {
  visible: boolean;
  onCancel: () => void;
}

interface ManageToolbarProps {
  buttonText: string;
  modalComponent: ReactElement<BaseModalProps>;
  buttonIcon?: ReactElement;
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

export default function ManageToolbar({
  buttonText,
  modalComponent,
  buttonIcon = <PlusOutlined />,
  onModalOpen,
  onModalClose,
}: ManageToolbarProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onModalClose?.();
  };

  // Clone modal component và inject props
  const modalWithProps = cloneElement(modalComponent, {
    visible: showModal,
    onCancel: handleCloseModal,
  } as BaseModalProps);

  return (
    <Space size="middle">
      {modalWithProps}
      <MyButton
        color="primary"
        variant="solid"
        icon={buttonIcon}
        onClick={handleOpenModal}
      >
        {buttonText}
      </MyButton>
    </Space>
  );
}
