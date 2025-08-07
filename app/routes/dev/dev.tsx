import { useEffect, useRef, useState } from "react";
import MyButton from "../../components/ui/button";
import MyCheckBox from "../../components/ui/checkbox";
import MyInput from "../../components/ui/input";
import MyModal from "../../components/ui/modal";
import MyUpload from "../../components/ui/upload";
import MySelect from "../../components/ui/select";
import MyInputNumber from "../../components/ui/input-number";
import MyTable from "../../components/ui/table";
import MySegmented from "~/components/ui/segmented";
import MyTag from "~/components/ui/tag";
import MyAlert from "~/components/ui/alert";
import MyPopconfirm from "~/components/ui/popconfirm";
import MyProgress from "~/components/ui/progress";
import MySpin from "~/components/ui/spin";
import MyDatePicker from "~/components/ui/date-picker";
import MyTimePicker from "~/components/ui/time-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Flex, message, type PopconfirmProps } from "antd";

dayjs.extend(customParseFormat);
export default function Dev() {
  const [auto] = useState(false);
  const [percent, setPercent] = useState(-50);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => clearTimeout(timerRef.current!);
  }, [percent]);

  const mergedPercent = auto ? "auto" : percent;

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    MyTags: string[];
  }
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      MyTags: ["nice", "developer"],
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <MyButton>My button</MyButton>
      <MyCheckBox>MyCheckBox</MyCheckBox>
      <MyInput
        style={{
          width: 300,
        }}
        placeholder="input"
      />
      <MyButton type="primary" onClick={showModal}>
        Open Modal
      </MyButton>
      <MyModal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </MyModal>
      <MyUpload>
        <MyButton>Click to upload</MyButton>
      </MyUpload>
      <MySelect
        defaultValue={1}
        mode="multiple"
        options={[{ value: 1 }, { value: 2 }, { value: 3 }]}
      />
      <MyInputNumber min={1} defaultValue={1} />
      <MyTable<DataType> dataSource={data} columns={columns} />
      <MySegmented
        options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
      />
      <Flex gap="4px 0" wrap>
        <MyTag color="cyan">cyan</MyTag>
        <MyTag color="blue">blue</MyTag>
        <MyTag color="geekblue">geekblue</MyTag>
        <MyTag color="purple">purple</MyTag>
      </Flex>
      <MyAlert message="Success Text" type="success" />
      <MyPopconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <MyButton danger>Delete</MyButton>
      </MyPopconfirm>
      <MyProgress type="circle" percent={100} size={80} />
      <MySpin percent={mergedPercent} size="small" />
      <MyDatePicker picker="year" />
      <MyTimePicker defaultValue={dayjs("12:08:23", "HH:mm:ss")} />
    </div>
  );
}
