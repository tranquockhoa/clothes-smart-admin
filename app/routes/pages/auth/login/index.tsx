import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, notification } from "antd";
import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";
import MyButton from "~/components/ui/button";
import MyCheckBox from "~/components/ui/checkbox";
import { VALIDATION_MESSAGE } from "~/constants/validation-message";
import { LoginParams } from "~/interface/auth";
import { loginApi } from "~/apis/auth";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { useNavigate } from "react-router";

const initialValues: LoginParams = {
  email: "",
  password: "",
  remember: false,
};

interface IError {
  data: { message: string };
}

const LoginMyForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (form: LoginParams) => {
    try {
      delete form.remember;
      const res = await loginApi(form);
      if (res && res.accessToken) {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      }
      notification.success({
        message: MESSAGE_STATUS.SUCCESS,
        description: MESSAGE_STATUS.LOGIN_SUCCESSFULLY,
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: MESSAGE_STATUS.ERROR,
        description: (error as IError)?.data?.message || "Lỗi",
      });
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen bg-[#1abc9c]">
      <h2 className="text-[36px] w-[420px] py-3 text-center rounded-t-[8px] text-white font-bold bg-[#16a085] ">
        Đăng nhập
      </h2>
      <MyForm<LoginParams>
        name="login"
        initialValues={initialValues}
        className="flex flex-col bg-white w-[420px] rounded-b-[8px] shadow-md !p-5"
        onFinish={onFinish}
      >
        <MyForm.Item
          name="email"
          rules={[
            { required: true, message: VALIDATION_MESSAGE.USERNAME_REQUIRED },
          ]}
        >
          <MyInput
            className="[&_input::placeholder]:text-base w-full"
            prefix={<UserOutlined />}
            placeholder="Nhập email"
          />
        </MyForm.Item>

        <MyForm.Item
          name="password"
          rules={[
            { required: true, message: VALIDATION_MESSAGE.PASSWORD_REQUIRED },
          ]}
        >
          <MyInput
            className="[&_input::placeholder]:text-base"
            prefix={<LockOutlined />}
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </MyForm.Item>

        <MyForm.Item>
          <Flex justify="space-between" align="center">
            <MyForm.Item name="remember" valuePropName="checked" noStyle>
              <MyCheckBox>Nhớ mật khẩu</MyCheckBox>
            </MyForm.Item>
          </Flex>
        </MyForm.Item>

        <MyButton
          block
          type="primary"
          htmlType="submit"
          className="!mb-3 !font-medium !text-[16px]"
        >
          Đăng nhập
        </MyButton>
      </MyForm>
    </div>
  );
};

export default LoginMyForm;
