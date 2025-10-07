import { TableProps, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "~/store/store";
import MyTable from "~/components/ui/table";
import { IUser } from "~/interface/user/user";
import { useEffect, useState } from "react";
import { getAllUserRequest } from "~/store/features/manage-user/manage-user.action";

const columns: TableProps<IUser>["columns"] = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Address", dataIndex: "address", key: "address" },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_, { role }) => {
      const color = role === "CLIENT" ? "geekblue" : "green";
      return <Tag color={color}>{role}</Tag>;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => {
      const color = status === "ADMIN" ? "red" : "green";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value: string) => {
      if (!value) return "-";
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
];

export default function ManageAccount() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { allUser, loading } = useSelector((state: RootState) => state.allUser);

  useEffect(() => {
    dispatch(getAllUserRequest(pagination));
  }, [dispatch, pagination]);

  const dataSource = allUser?.results || [];

  return (
    <div style={{ padding: 16 }}>
      <MyTable<IUser>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: allUser?.totalItems,
          onChange: (page, pageSize) =>
            setPagination({ current: page, pageSize }),
        }}
        rowClassName={() => "cursor-pointer"}
        className="rounded-lg border border-gray-200 shadow-lg hover:shadow-xl h-full"
      />
    </div>
  );
}
