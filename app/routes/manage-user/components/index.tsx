import { Form, notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileApi } from "~/apis/manage-user";
import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";
import MyModal from "~/components/ui/modal";
import MySelect from "~/components/ui/select";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { IError, IPageAble } from "~/interface/common/common";
import { IFormUpdateUserProfile } from "~/interface/manage-user/manage-user";
import { getAllUserRequest } from "~/store/features/manage-user/manage-user.action";
import { getUserProfileApiRequest } from "~/store/features/user-profile/user-profile.action";
import { AppDispatch, RootState } from "~/store/store";

interface ManagerUserEditFormModalProps {
  visible: boolean;
  onCancel: () => void;
  userId: string;
  pagination: IPageAble;
}

export const ManagerUserEditFormModal: React.FC<
  ManagerUserEditFormModalProps
> = ({ visible, onCancel, userId, pagination }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile } = useSelector((state: RootState) => state.userProfile);

  useEffect(() => {
    dispatch(getUserProfileApiRequest(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (userProfile) {
      form.setFieldsValue({
        name: userProfile.name,
        email: userProfile.email,
        address: userProfile.address,
        role: userProfile.role,
        status: userProfile.status,
      });
    }
  }, [userProfile, form]);

  const onFinish = async (form: IFormUpdateUserProfile) => {
    const payload: IFormUpdateUserProfile = {
      name: form.name,
      address: form.address,
      role: form.role,
      status: form.status,
    };
    try {
      const response = await updateUserProfileApi(userId, payload);
      if (response.status) {
        notification.success({
          message: MESSAGE_STATUS.SUCCESS,
          description: MESSAGE_STATUS.UPDATED_SUCCESSFULLY,
        });
        onCancel();
      }
    } catch (error) {
      notification.error({
        message: MESSAGE_STATUS.ERROR,
        description: (error as IError).data.message,
      });
    }
  };

  const handleOk = () => {
    MyModal.confirm({
      title: "Cập nhật thông tin người dùng",
      content: "Bạn có chắc chắn với hành động này",
      onOk: async () => {
        const values = form.getFieldsValue();
        await onFinish(values);
        await dispatch(getAllUserRequest(pagination));
      },
    });
  };

  return (
    <MyModal
      open={visible}
      onCancel={onCancel}
      title="Thông tin người dùng"
      width={1000}
      style={{ top: 40 }}
      onOk={handleOk}
    >
      <MyForm form={form} layout="vertical">
        <Form.Item label="Name" name="name">
          <MyInput placeholder="name" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <MyInput placeholder="email" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <MyInput placeholder="address" />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <MySelect placeholder="Select role">
            <MySelect.Option value="ADMIN">Admin</MySelect.Option>
            <MySelect.Option value="CLIENT">Client</MySelect.Option>
          </MySelect>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <MySelect placeholder="Select status">
            <MySelect.Option value="ACTIVE">Active</MySelect.Option>
            <MySelect.Option value="INACTIVE">Inactive</MySelect.Option>
          </MySelect>
        </Form.Item>
      </MyForm>
    </MyModal>
  );
};
