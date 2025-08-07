import { Upload, type UploadProps } from "antd";
import type { FC } from "react";

const BaseUpload: FC<UploadProps> = (props) => {
  return <Upload {...props} />;
};

const MyUpload = Object.assign(Upload, BaseUpload);

export default MyUpload;
