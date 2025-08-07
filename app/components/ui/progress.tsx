import { Progress, type ProgressProps } from "antd";
import type { FC } from "react";

const BaseProgress: FC<ProgressProps> = (props) => {
  return <Progress {...props} />;
};

const MyProgress = Object.assign(Progress, BaseProgress);

export default MyProgress;
