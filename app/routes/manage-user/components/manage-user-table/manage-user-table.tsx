import { notification, Space, TableProps, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "~/store/store";
import MyTable from "~/components/ui/table";
import { IUser } from "~/interface/user/user";
import { useEffect, useState } from "react";
import { getAllUserRequest } from "~/store/features/manage-user/manage-user.action";
import MyButton from "~/components/ui/button";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteUserApi } from "~/apis/manage-user";
import Popconfirm from "~/components/ui/popconfirm";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { IError, IPageAble } from "~/interface/common/common";
import { ManagerUserEditFormModal } from "../manage-user-edit-form-modal";

export default function ManageUserTable() {
  const [pagination, setPagination] = useState<IPageAble>({
    current: 1,
    pageSize: 8,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { allUser, loading } = useSelector((state: RootState) => state.allUser);

  useEffect(() => {
    dispatch(getAllUserRequest(pagination));
  }, [dispatch, pagination]);

  const dataSource = allUser?.results || [];

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
        const color = status === "INACTIVE" ? "red" : "green";
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
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const handleDelete = async () => {
          try {
            await deleteUserApi(record._id ?? "");
            notification.success({
              message: MESSAGE_STATUS.SUCCESS,
              description: "Xóa thành công",
            });
          } catch (error) {
            notification.error({
              message: MESSAGE_STATUS.ERROR,
              description: (error as IError)?.data.message,
            });
          }
        };

        return (
          <Space size="middle">
            <MyButton
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedUser(record);
                setShowEditModal(true);
              }}
            >
              Edit
            </MyButton>

            <Popconfirm
              title={`Xác nhận xoá người ${record.name}?`}
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={handleDelete}
            >
              <MyButton color="red" variant="solid" icon={<DeleteOutlined />}>
                Delete
              </MyButton>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <ManagerUserEditFormModal
        visible={showEditModal}
        onCancel={() => {
          setShowEditModal(false);
        }}
        userId={selectedUser?._id ?? ""}
        pagination={pagination}
      />
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
