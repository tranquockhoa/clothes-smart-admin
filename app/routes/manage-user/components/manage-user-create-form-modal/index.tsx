import { DatePicker, Form, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { createNewUserApi } from "~/apis/manage-user";

import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";
import MyModal from "~/components/ui/modal";
import MySelect from "~/components/ui/select";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { Role, STATUS } from "~/enum/common";
import { IError, IPageAble } from "~/interface/common/common";
import { IUser } from "~/interface/user/user";
import { getAllUserRequest } from "~/store/features/manage-user/manage-user.action";
import { AppDispatch } from "~/store/store";

interface ManagerUserCreateFormModalProps {
  visible: boolean;
  onCancel: () => void;
}

export const ManagerUserCreateFormModal: React.FC<
  ManagerUserCreateFormModalProps
> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const pagination: IPageAble = {
    current: 1,
    pageSize: 8,
  };
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (form: IUser) => {
    const payload: IUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
      dob: form.dob,
      gender: form.gender,
      role: form.role,
      status: form.status,
    };

    try {
      const response = await createNewUserApi(payload);
      if (response.status) {
        notification.success({
          message: MESSAGE_STATUS.SUCCESS,
          description: MESSAGE_STATUS.CREATED_SUCCESSFULLY,
        });

        dispatch(getAllUserRequest(pagination));
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
      title: "Tạo mới người dùng",
      content: "Bạn có chắc chắn với hành động này",
      onOk: async () => {
        const values = form.getFieldsValue();
        await onFinish(values);
      },
    });
  };

  return (
    <MyModal
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      title="Tạo mới tài khoản"
      width={1000}
      style={{ top: 40 }}
    >
      <MyForm form={form} layout="vertical">
        <Form.Item label="Name" name="name" required>
          <MyInput placeholder="name" />
        </Form.Item>

        <Form.Item label="Email" name="email" required>
          <MyInput placeholder="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <MyInput placeholder="password" />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <MyInput placeholder="phone" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <MyInput placeholder="address" />
        </Form.Item>

        <Form.Item label="Date of birth" name="dob">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <MySelect placeholder="Select role">
            <MySelect.Option value={Role.ADMIN}>{Role.ADMIN}</MySelect.Option>
            <MySelect.Option value={Role.CLIENT}>{Role.CLIENT}</MySelect.Option>
          </MySelect>
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
      </MyForm>
    </MyModal>
  );
};
