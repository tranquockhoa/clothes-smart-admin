import React from "react";
import type { FormProps } from "antd";
import MyForm from "../../components/ui/form";
import MyButton from "../../components/ui/button";
import MyCheckBox from "../../components/ui/checkbox";
import MyInput from "../../components/ui/input";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm: React.FC = () => (
  <div className="flex justify-center items-center min-h-screen bg-green-300 ">
    <MyForm
      name="basic"
      requiredMark={false}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="w-[500px] p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center pt-4 pb-4 mb-8  bg-green-600">
        Đăng nhập
      </h2>

      <MyForm.Item<FieldType>
        label={
          <label className="block text-[16px] font-medium text-gray-800">
            Tài khoản
          </label>
        }
        name="username"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
      >
        <MyInput placeholder="Vui lòng nhập email" className="h-[45px]" />
      </MyForm.Item>

      <MyForm.Item<FieldType>
        label={
          <label className="block text-[16px] font-medium text-gray-800">
            Mật khẩu
          </label>
        }
        name="password"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <MyInput.Password placeholder="Nhập mật khẩu" className="h-[45px]" />
      </MyForm.Item>

      <MyForm.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <MyCheckBox>Nhớ mật khẩu</MyCheckBox>
      </MyForm.Item>

      <MyForm.Item label={null}>
        <MyButton type="primary" htmlType="submit">
          Đăng nhập
        </MyButton>
      </MyForm.Item>
    </MyForm>
  </div>
);

export default LoginForm;
