import { Popconfirm, type PopconfirmProps } from "antd";
import type { FC } from "react";

const BasePopconfirm: FC<PopconfirmProps> = (props) => {
  return <Popconfirm {...props} />;
};

const MyPopconfirm = Object.assign(Popconfirm, BasePopconfirm);

export default MyPopconfirm;
