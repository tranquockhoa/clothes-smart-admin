import {
  DeleteOutlined,
  EditOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import {
  Button,
  notification,
  Popconfirm,
  Space,
  TableColumnsType,
  Tag,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store/store";
import { getAllBannerApiRequest } from "~/store/features/all-banner/all-banner.action";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { IBannerData } from "~/interface/manage-banner";
import { deleteBannerApi, reorderBannerApi } from "~/apis/manage-banner";
import MyButton from "~/components/ui/button";
import { MESSAGE_STATUS } from "~/constants/common.const";
import { IError } from "~/interface/common/common";
import { ManagerBannerEditFormModal } from "../manage-banner-edit-form";
import TableCommon from "~/components/common/table";

interface DataType extends IBannerData {}

interface RowContextProps {
  // eslint-disable-next-line no-unused-vars
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

export const ManageBannerTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allBanner } = useSelector((state: RootState) => state.allBanner);
  const [dataSource, setDataSource] = React.useState<DataType[]>(
    allBanner?.data ?? [],
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<string | null>("");

  console.log(dataSource);
  useEffect(() => {
    dispatch(getAllBannerApiRequest());
  }, [dispatch]);

  useEffect(() => {
    if (allBanner?.data) {
      setDataSource(allBanner.data);
    }
  }, [allBanner]);
  const columns: TableColumnsType<DataType> = [
    { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
    { title: "Title", dataIndex: "title", align: "center" },
    { title: "Description", dataIndex: "Description", align: "center" },
    { title: "LinkUrl", dataIndex: "linkUrl", align: "center" },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (value) => (
        <Tag color={value === "ACTIVE" ? "green" : "red"}>{value}</Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const handleDelete = async () => {
          try {
            await deleteBannerApi(record._id ?? "");
            notification.success({
              message: MESSAGE_STATUS.SUCCESS,
              description: "Xóa thành công",
            });
            dispatch(getAllBannerApiRequest());
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
                setShowEditModal(true);
                setSelectedBanner(record._id ?? null);
              }}
            >
              Edit
            </MyButton>

            <Popconfirm
              title={`Xác nhận xoá người?`}
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

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    if (active.id !== over.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record._id === active.id,
        );
        const overIndex = prevState.findIndex(
          (record) => record._id === over.id,
        );

        const newData = arrayMove(prevState, activeIndex, overIndex);

        reorderBannerApi(newData.map((item) => item._id))
          .then(() => console.log("Reordered successfully"))
          .catch((err) => console.error("Reorder failed", err));

        return newData;
      });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <ManagerBannerEditFormModal
        visible={showEditModal}
        bannerId={selectedBanner ?? ""}
        onCancel={() => {
          setShowEditModal(false);
        }}
      />
      <SortableContext
        items={allBanner?.data.map((i) => i._id) ?? []}
        strategy={verticalListSortingStrategy}
      >
        <TableCommon<DataType>
          rowKey="_id"
          components={{ body: { row: Row } }}
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};
