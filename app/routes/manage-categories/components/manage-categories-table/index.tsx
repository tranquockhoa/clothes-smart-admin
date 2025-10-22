import { Space, Tag, message, type TableColumnsType, notification } from "antd";
import Popconfirm from "~/components/ui/popconfirm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TableCommon, { TABLE_TYPES } from "~/components/common/table";
import MyButton from "~/components/ui/button";
import { useState } from "react";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { IError } from "~/interface/common/common";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ManageCategoriesTable() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Điện tử",
      description: "Các sản phẩm điện tử, công nghệ",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Thời trang",
      description: "Quần áo, phụ kiện thời trang",
      createdAt: "2024-01-16",
      updatedAt: "2024-01-16",
    },
  ]);

  const handleEdit = (record: Category) => {
    // TODO: Implement edit functionality
    console.log("Edit category:", record);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setCategories((prev) => prev.filter((item) => item.id !== id));
      message.success(MESSAGE_STATUS.SUCCESS);
    } catch (error) {
      notification.error({
        message: MESSAGE_STATUS.ERROR,
        description: (error as IError)?.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumnsType<Category> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text || "—",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record: Category) => (
        <Space size="middle">
          <MyButton
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </MyButton>
          <Popconfirm
            title={`Xác nhận xoá danh mục ${record.name}?`}
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => handleDelete(record.id)}
          >
            <MyButton color="red" variant="solid" icon={<DeleteOutlined />}>
              Delete
            </MyButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <TableCommon
      tableType={TABLE_TYPES.PRIMARY}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      columns={columns as any}
      dataSource={categories}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} của ${total} danh mục`,
      }}
    />
  );
}
