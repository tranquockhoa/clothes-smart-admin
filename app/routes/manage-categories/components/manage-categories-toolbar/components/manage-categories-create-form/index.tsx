import { Modal, Form, Input } from "antd";

interface ManagerCategoriesCreateFormModalProps {
  visible: boolean;
  onCancel: () => void;
}

export function ManagerCategoriesCreateFormModal({
  visible,
  onCancel,
}: ManagerCategoriesCreateFormModalProps) {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Thêm danh mục mới"
      open={visible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên danh mục">
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea placeholder="Nhập mô tả danh mục" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
