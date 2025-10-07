import { Form, notification, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";
import { RootState, AppDispatch } from "~/store/store";
import { getAdminUsersProfileRequest } from "~/store/features/profile/profile.action";
import MyButton from "~/components/ui/button";
import MyDatePicker from "~/components/ui/date-picker";
import { updateAdminProfile } from "~/apis/profile";
import { MESSAGE_STATUS } from "~/constants/common.const";
import {
  IFormUpdateProfile,
  IProfileFormValues,
} from "~/interface/profile/profile";
import { IResponseError } from "~/interface";

export default function Profile() {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getAdminUsersProfileRequest());
  }, [dispatch]);

  const onFinish = async (form: IProfileFormValues) => {
    const payload: IFormUpdateProfile = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      dob: form.dob ? form.dob.format("YYYY-MM-DD") : undefined,
      gender: form.gender,
    };
    try {
      const response = await updateAdminProfile(payload);
      if (response.status) {
        notification.success({
          message: MESSAGE_STATUS.SUCCESS,
          description: MESSAGE_STATUS.UPDATED_SUCCESSFULLY,
        });
      }
      dispatch(getAdminUsersProfileRequest());
    } catch (error) {
      notification.error({
        message: MESSAGE_STATUS.ERROR,
        description: (error as IResponseError).messages,
      });
    }
  };

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name,
        gender: profile.gender,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        dob: profile.dob ? dayjs(profile.dob) : null,
        role: profile.role,
      });
    }
  }, [profile, form]);

  return (
    <div className="flex items-center justify-center mt-[20px]">
      <MyForm
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="flex flex-col w-3xl bg-white p-6"
      >
        {loading && <p className="text-gray-500 mb-4">Loading profile...</p>}

        <MyForm.Item label="Name" name="name">
          <MyInput placeholder="name" />
        </MyForm.Item>
        <MyForm.Item label="Email" name="email" required>
          <MyInput placeholder="email" disabled />
        </MyForm.Item>
        <MyForm.Item label="Phone" name="phone">
          <MyInput placeholder="phone" />
        </MyForm.Item>
        <MyForm.Item label="Address" name="address">
          <MyInput placeholder="address" />
        </MyForm.Item>
        <MyForm.Item label="Gender" name="gender">
          <Select placeholder="Chọn giới tính">
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </MyForm.Item>
        <MyForm.Item label="Date of birth" name="dob">
          <MyDatePicker placeholder="Date of birth" style={{ width: "100%" }} />
        </MyForm.Item>
        <MyForm.Item label="Role" name="role" required>
          <Select placeholder="Chọn role" disabled>
            <Select.Option value="CLIENT">CLIENT</Select.Option>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
          </Select>
        </MyForm.Item>
        <MyForm.Item>
          <MyButton type="primary" htmlType="submit">
            Cập nhật
          </MyButton>
        </MyForm.Item>
      </MyForm>
    </div>
  );
}
