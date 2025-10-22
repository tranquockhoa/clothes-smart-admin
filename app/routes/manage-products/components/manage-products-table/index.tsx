import { Space, Tag, notification, type TableColumnsType, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TableCommon, { TABLE_TYPES } from "~/components/common/table";
import MyButton from "~/components/ui/button";
import Popconfirm from "~/components/ui/popconfirm";
import { useState } from "react";
import type { Product } from "~/interface/manage-products/manage-products";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { IError } from "~/interface/common/common";
import { STATUS_PRODUCT } from "~/enum/common";

export default function ManageProductsTable() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      _id: "68f8a450c86b07b806da5714",
      name: "ao",
      category: {
        _id: "68f8a3e4c86b07b806da5712",
        name: "áo mùa đông",
        description: "string",
        status: "active",
        createdAt: "2025-10-22T09:29:08.797Z",
        updatedAt: "2025-10-22T09:29:08.797Z",
        __v: 0,
      },
      price: 100000,
      variants: [],
      images: ["image1.jpg", "image2.jpg"],
      thumbnail: "",
      description: "áo đẹp",
      material: "vải",
      technology: "sạch",
      rating: "4.8",
      status: STATUS_PRODUCT.AVAILABLE,
      createdAt: "2025-10-22T09:30:56.977Z",
      updatedAt: "2025-10-22T09:30:56.977Z",
      __v: 0,
    },
  ]);

  const handleEdit = (record: Product) => {
    console.log("Edit product:", record);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setProducts((prev) => prev.filter((item) => item._id !== id));
      notification.success({
        message: MESSAGE_STATUS.SUCCESS,
        description: MESSAGE_STATUS.UPDATED_SUCCESSFULLY,
      });
    } catch (error) {
      notification.error({
        message: MESSAGE_STATUS.ERROR,
        description: (error as IError)?.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const columns: TableColumnsType<Product> = [
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (thumbnail: string, record: Product) => (
        <Image
          src={thumbnail}
          alt={record.name}
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: 4 }}
          fallback="https://via.placeholder.com/60"
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <div style={{ fontWeight: 500 }}>{text}</div>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category: Product["category"]) => (
        <Tag color="blue">{category.name}</Tag>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price: number) => (
        <span style={{ fontWeight: 600, color: "#f5222d" }}>
          {formatPrice(price)}
        </span>
      ),
    },
    {
      title: "Chất liệu",
      dataIndex: "material",
      key: "material",
      render: (text: string) => text || "—",
    },
    {
      title: "Công nghệ",
      dataIndex: "technology",
      key: "technology",
      render: (text: string) => text || "—",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 80,
      render: (rating: string) => <Tag color="gold">⭐ {rating}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag color={status === "available" ? "green" : "red"}>
          {status === "available" ? "Còn hàng" : "Hết hàng"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record: Product) => (
        <Space size="middle">
          <MyButton
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </MyButton>
          <Popconfirm
            title={`Xác nhận xoá sản phẩm ${record.name}?`}
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => handleDelete(record._id)}
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
      dataSource={products}
      rowKey="_id"
      loading={loading}
      scroll={{ x: 1200 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} của ${total} sản phẩm`,
      }}
    />
  );
}
