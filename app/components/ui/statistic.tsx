import { Statistic, type StatisticProps } from "antd";
import type { FC } from "react";

const BaseStatistic: FC<StatisticProps> = (props) => {
  return <Statistic {...props} />;
};

const MyStatistic = Object.assign(Statistic, BaseStatistic);

export default MyStatistic;
