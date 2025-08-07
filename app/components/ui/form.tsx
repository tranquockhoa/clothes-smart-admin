import type { FC } from "react";
import { Form } from "antd";
import type { FormProps } from "react-router";

const BaseForm: FC<FormProps> = (props) => {
  return <Form {...props} />;
};

const MyForm = Object.assign(Form, BaseForm);

export default MyForm;
