import { Button, type ButtonProps } from "antd";
import type { FC } from "react";

const BaseButton: FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

const MyButton = Object.assign(Button, BaseButton);

export default MyButton;
