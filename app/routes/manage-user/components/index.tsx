import { Form } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";
import MyModal from "~/components/ui/modal";
import MySelect from "~/components/ui/select";
import { getUserProfileApiRequest } from "~/store/features/user-profile/user-profile.action";
import { AppDispatch, RootState } from "~/store/store";

interface ManagerUserEditFormModalProps {
  visible: boolean;
  onCancel: () => void;
  userId: string;
}

export const ManagerUserEditFormModal: React.FC<
  ManagerUserEditFormModalProps
> = ({ visible, onCancel, userId }) => {
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

  return (
    <MyModal
      open={visible}
      onCancel={onCancel}
      title="Thông tin người dùng"
      width={1000}
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
