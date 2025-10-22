import ManageToolbar from "~/components/common/manage-toolbar";
import { ManagerProductsCreateFormModal } from "./components/manage-products-create-form";

export default function ManageProductsToolbar() {
  return (
    <ManageToolbar
      buttonText="Add"
      modalComponent={
        <ManagerProductsCreateFormModal visible={false} onCancel={() => {}} />
      }
    />
  );
}
