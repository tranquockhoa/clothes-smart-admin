import { Table, type TableProps } from "antd";
import type { FC } from "react";

export const TABLE_TYPES = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
} as const;

type TableType = keyof typeof TABLE_TYPES;

interface TableCommonProps extends Omit<TableProps, "className"> {
  tableType?: TableType;
  className?: string;
}

const TABLE_STYLES: Record<TableType, string> = {
  [TABLE_TYPES.PRIMARY]:
    "rounded-lg border border-gray-200 shadow-lg hover:shadow-xl h-full",
  [TABLE_TYPES.SECONDARY]: "rounded border border-gray-100 shadow-sm",
};

const TableCommon: FC<TableCommonProps> = ({
  tableType = TABLE_TYPES.PRIMARY,
  className = "",
  ...props
}) => {
  const baseClassName = TABLE_STYLES[tableType];
  const finalClassName = `${baseClassName} ${className}`.trim();

  return <Table className={finalClassName} {...props} />;
};

export default TableCommon;
