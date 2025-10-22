import { ManageBannerTable } from "./component/manage-banner-table";
import ManageBannerToolbar from "./component/manage-banner-toolbar";
import ManagePageLayout from "~/components/layouts/manage-page-layout";

export default function ManageBanner() {
  return (
    <ManagePageLayout>
      <ManageBannerToolbar />
      <ManageBannerTable />
    </ManagePageLayout>
  );
}
