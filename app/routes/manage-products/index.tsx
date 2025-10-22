import ManageProductsTable from "./components/manage-products-table";
import ManageProductsToolbar from "./components/manage-products-toolbar";
import ManagePageLayout from "~/components/layouts/manage-page-layout";

export default function ManageProducts() {
  return (
    <ManagePageLayout>
      <ManageProductsToolbar />
      <ManageProductsTable />
    </ManagePageLayout>
  );
}
