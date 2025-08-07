import { Alert, type AlertProps } from "antd";
import type { FC } from "react";

const BaseAlert: FC<AlertProps> = (props) => {
  return <Alert {...props} />;
};

const MyAlert = Object.assign(Alert, BaseAlert);

export default MyAlert;
