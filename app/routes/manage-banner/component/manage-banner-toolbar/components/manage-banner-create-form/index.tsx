import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  notification,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBannerApi } from "~/apis/manage-banner";

import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";
import MyModal from "~/components/ui/modal";
import MySelect from "~/components/ui/select";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { STATUS } from "~/enum/common";
import { IError } from "~/interface/common/common";
import { IBannerData } from "~/interface/manage-banner";
import { IFileUploadResponse } from "~/interface/media/file";
import { getAllBannerApiRequest } from "~/store/features/all-banner/all-banner.action";
import { AppDispatch } from "~/store/store";
import { CONFIG } from "~/config/env";
import { ADMIN_FILES_UPLOAD } from "~/apis/config.endpoint";

interface ManagerBannerCreateFormModalProps {
  visible: boolean;
  onCancel: () => void;
}

export const ManagerBannerCreateFormModal: React.FC<
  ManagerBannerCreateFormModalProps
> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const [fileIdUploaded, setfileIdUploaded] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: IBannerData) => {
    const payload: IBannerData = {
      title: values.title,
      description: values.description,
      imageId: fileIdUploaded,
      linkUrl: values.linkUrl,
      status: values.status,
      sortOrder: values.sortOrder,
    };

    try {
      const response = await createBannerApi(payload);
      if (response.status) {
        notification.success({
          message: MESSAGE_STATUS.SUCCESS,
          description: MESSAGE_STATUS.CREATED_SUCCESSFULLY,
        });
        dispatch(getAllBannerApiRequest());
        setFileList([]);
        setfileIdUploaded("");
        onCancel();
      }
    } catch (error) {
      notification.error({
        message: MESSAGE_STATUS.ERROR,
        description: (error as IError)?.data?.message || "Lỗi tạo banner",
      });
    }
  };

  const handleOk = () => {
    MyModal.confirm({
      title: "Tạo mới banner",
      content: "Bạn có chắc chắn muốn tạo banner này?",
      onOk: async () => {
        const values = form.getFieldsValue();
        await onFinish(values);
      },
    });
  };

  const props: UploadProps = {
    action: `${CONFIG.BASE_URL}${CONFIG.BASE_URL_VERSION}/${ADMIN_FILES_UPLOAD}`,
    onChange({ file, fileList }) {
      setFileList(fileList);
      if (file.status === "done") {
        const res: IFileUploadResponse = file.response;
        setfileIdUploaded(res.data._id);
      }
    },
    onRemove() {
      setfileIdUploaded("");
      return true;
    },
  };

  return (
    <MyModal
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      title="Tạo mới banner"
      width={800}
      style={{ top: 40 }}
    >
      <MyForm form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" required>
          <MyInput placeholder="Title" />
        </Form.Item>

        <Form.Item label="Description" name="description" required>
          <MyInput placeholder="Description" />
        </Form.Item>

        <Form.Item label="Link URL" name="linkUrl">
          <MyInput placeholder="Link URL" />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <MySelect placeholder="Select status">
            <MySelect.Option value={STATUS.ACTIVE}>
              {STATUS.ACTIVE}
            </MySelect.Option>
            <MySelect.Option value={STATUS.INACTIVE}>
              {STATUS.INACTIVE}
            </MySelect.Option>
          </MySelect>
        </Form.Item>

        <Upload
          {...props}
          listType="picture"
          headers={{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }}
          maxCount={1}
          fileList={fileList}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Upload image
          </Button>
        </Upload>
      </MyForm>
    </MyModal>
  );
};
