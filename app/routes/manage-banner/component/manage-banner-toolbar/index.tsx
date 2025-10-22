import { PlusOutlined } from "@ant-design/icons";
import { Space } from "antd";
import MyButton from "~/components/ui/button";
import { useState } from "react";
import { ManagerBannerCreateFormModal } from "./components/manage-banner-create-form";

export default function ManageBannerToolbar() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const handleCancel = () => {
    setShowCreateModal(false);
  };

  return (
    <Space size="middle">
      <ManagerBannerCreateFormModal
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
