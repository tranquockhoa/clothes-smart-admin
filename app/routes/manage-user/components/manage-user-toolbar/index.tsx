import { PlusOutlined } from "@ant-design/icons";
import { Space } from "antd";
import MyButton from "~/components/ui/button";
import { ManagerUserCreateFormModal } from "../manage-user-create-form-modal";
import { useState } from "react";

export default function ManageUserToolbar() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const handleCancel = () => {
    setShowCreateModal(false);
  };

  return (
    <Space size="middle">
      <ManagerUserCreateFormModal
        visible={showCreateModal}
        onCancel={handleCancel}
      />
      <MyButton
        color="primary"
        variant="solid"
        icon={<PlusOutlined />}
        onClick={() => {
          setShowCreateModal(true);
        }}
      >
        Thêm tài khoản
      </MyButton>
    </Space>
  );
}
