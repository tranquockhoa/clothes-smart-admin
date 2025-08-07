import { Checkbox, type CheckboxProps } from "antd";
import type { FC } from "react";

const BaseCheckBox: FC<CheckboxProps> = (props) => {
  return <Checkbox {...props} />;
};

const MyCheckBox = Object.assign(Checkbox, BaseCheckBox);

export default MyCheckBox;
