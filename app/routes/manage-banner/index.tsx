import { Breadcrumb } from "antd";

export default function ManageBanner() {
  return (
    <div style={{ padding: 16 }}>
      <Breadcrumb items={[{ title: "Admin" }, { title: "Manage-banner" }]} />
    </div>
  );
}
