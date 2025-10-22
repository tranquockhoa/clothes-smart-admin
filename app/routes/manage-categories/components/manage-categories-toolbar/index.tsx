import { ManagerCategoriesCreateFormModal } from "./components/manage-categories-create-form";
import { useState } from "react";
import { Space } from "antd";
import MyButton from "~/components/ui/button";
import { PlusOutlined } from "@ant-design/icons";

export default function ManageCategoriesToolbar() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const handleCancel = () => {
    setShowCreateModal(false);
  };
  return (
    <Space size="middle">
      <ManagerCategoriesCreateFormModal
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
        Thêm mới
      </MyButton>
    </Space>
  );
}
