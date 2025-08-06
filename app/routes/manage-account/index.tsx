import { Breadcrumb } from "antd";

export default function ManageAccount() {
  return (
    <div style={{ padding: 16 }}>
      <Breadcrumb items={[{ title: "Admin" }, { title: "Manage-account" }]} />
    </div>
  );
}
