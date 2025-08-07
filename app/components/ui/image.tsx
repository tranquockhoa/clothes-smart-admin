import type { ImageProps } from "antd";
import type { FC } from "react";
import { Image } from "antd";
const BaseImage: FC<ImageProps> = (props) => {
  return <Image {...props} />;
};

const MyImage = Object.assign(Image, BaseImage);

export default MyImage;
