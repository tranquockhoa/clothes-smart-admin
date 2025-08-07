import { Segmented, type SegmentedProps } from "antd";
import type { FC } from "react";

const BaseSegmented: FC<SegmentedProps> = (props) => {
  return <Segmented {...props} />;
};

const MySegmented = Object.assign(Segmented, BaseSegmented);

export default MySegmented;
