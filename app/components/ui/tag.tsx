import { Tag, type TagProps } from "antd";
import type { FC } from "react";

const BaseTag: FC<TagProps> = (props) => {
  return <Tag {...props} />;
};

const MyTag = Object.assign(Tag, BaseTag);

export default MyTag;
