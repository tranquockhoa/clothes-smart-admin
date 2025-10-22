import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Upload,
  type UploadFile,
  type UploadProps,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CONFIG } from "~/config/env";
import { ADMIN_FILES_UPLOAD } from "~/apis/config.endpoint";
import type { IFileUploadResponse } from "~/interface/media/file";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { IError } from "~/interface/common/common";

interface ManagerProductsCreateFormModalProps {
  visible: boolean;
  onCancel: () => void;
}

export function ManagerProductsCreateFormModal({
  visible,
  onCancel,
}: ManagerProductsCreateFormModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
  const [imagesFileList, setImagesFileList] = useState<UploadFile[]>([]);
  const [thumbnailId, setThumbnailId] = useState<string>("");
  const [imageIds, setImageIds] = useState<string[]>([]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (!thumbnailId) {
        message.error("Vui lòng upload ảnh đại diện!");
        return;
      }

      const payload = {
        ...values,
        thumbnail: thumbnailId,
        images: imageIds,
      };

      console.log("Create product:", payload);
      message.success("Tạo sản phẩm thành công!");

      form.resetFields();
      setThumbnailFileList([]);
      setImagesFileList([]);
      setThumbnailId("");
      setImageIds([]);
      onCancel();
    } catch (error) {
      notification.error({
        message: MESSAGE_STATUS.ERROR,
        description: (error as IError)?.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setThumbnailFileList([]);
    setImagesFileList([]);
    setThumbnailId("");
    setImageIds([]);
    onCancel();
  };

  // Upload props cho thumbnail
  const thumbnailUploadProps: UploadProps = {
    action: `${CONFIG.BASE_URL}${CONFIG.BASE_URL_VERSION}/${ADMIN_FILES_UPLOAD}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    listType: "picture-card",
    maxCount: 1,
    fileList: thumbnailFileList,
    onChange({ file, fileList }) {
      setThumbnailFileList(fileList);
      if (file.status === "done") {
        const res: IFileUploadResponse = file.response;
        setThumbnailId(res.data._id);
      }
    },
    onRemove() {
      setThumbnailId("");
      return true;
    },
  };

  // Upload props cho images
  const imagesUploadProps: UploadProps = {
    action: `${CONFIG.BASE_URL}${CONFIG.BASE_URL_VERSION}/${ADMIN_FILES_UPLOAD}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    listType: "picture-card",
    multiple: true,
    fileList: imagesFileList,
    onChange({ file, fileList }) {
      setImagesFileList(fileList);
      if (file.status === "done") {
        const res: IFileUploadResponse = file.response;
        setImageIds((prev) => [...prev, res.data._id]);
      }
    },
    onRemove(file) {
      if (file.response) {
        const res: IFileUploadResponse = file.response;
        setImageIds((prev) => prev.filter((id) => id !== res.data._id));
      }
      return true;
    },
  };

  return (
    <Modal
      title="Thêm sản phẩm mới"
      open={visible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm!" },
            { min: 2, message: "Tên sản phẩm phải có ít nhất 2 ký tự!" },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
        >
          <Select placeholder="Chọn danh mục">
            {/* TODO: Load categories from API */}
            <Select.Option value="category1">Điện tử</Select.Option>
            <Select.Option value="category2">Thời trang</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[
            { required: true, message: "Vui lòng nhập giá!" },
            { type: "number", min: 0, message: "Giá phải lớn hơn 0!" },
          ]}
        >
          <InputNumber
            placeholder="Nhập giá sản phẩm"
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            { max: 1000, message: "Mô tả không được vượt quá 1000 ký tự!" },
          ]}
        >
          <Input.TextArea placeholder="Nhập mô tả sản phẩm" rows={4} />
        </Form.Item>

        <Form.Item name="material" label="Chất liệu">
          <Input placeholder="Nhập chất liệu" />
        </Form.Item>

        <Form.Item name="technology" label="Công nghệ">
          <Input placeholder="Nhập công nghệ" />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện"
          rules={[{ required: true, message: "Vui lòng upload ảnh đại diện!" }]}
        >
          <Upload {...thumbnailUploadProps}>
            {thumbnailFileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="Hình ảnh sản phẩm">
          <Upload {...imagesUploadProps}>
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload Images</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
