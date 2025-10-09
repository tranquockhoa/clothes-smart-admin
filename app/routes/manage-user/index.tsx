import ManageUserTable from "./components/manage-user-table/manage-user-table";
import ManageUserToolbar from "./components/manage-user-toolbar";

export default function ManageAccount() {
  return (
    <div className="p-[32px] flex flex-col gap-[10px]">
      <ManageUserToolbar />
      <ManageUserTable />
    </div>
  );
}
