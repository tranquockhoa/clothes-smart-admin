import ManageUserTable from "./components/manage-user-table/manage-user-table";
import ManageUserToolbar from "./components/manage-user-toolbar";
import ManagePageLayout from "~/components/layouts/manage-page-layout";

export default function ManageAccount() {
  return (
    <ManagePageLayout>
      <ManageUserToolbar />
      <ManageUserTable />
    </ManagePageLayout>
  );
}
