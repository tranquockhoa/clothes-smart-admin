import ManageCategoriesTable from "./components/manage-categories-table";
import ManageCategoriesToolbar from "./components/manage-categories-toolbar";
import ManagePageLayout from "~/components/layouts/manage-page-layout";

export default function ManageCategories() {
  return (
    <ManagePageLayout>
      <ManageCategoriesToolbar />
      <ManageCategoriesTable />
    </ManagePageLayout>
  );
}
