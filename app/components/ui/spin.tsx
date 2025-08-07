import { Spin, type SpinProps } from "antd";
import type { FC } from "react";

const BaseSpin: FC<SpinProps> = (props) => {
  return <Spin {...props} />;
};

const MySpin = Object.assign(Spin, BaseSpin);

export default MySpin;
