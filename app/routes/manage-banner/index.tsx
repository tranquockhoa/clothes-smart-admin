import { ManageBannerTable } from "./component/manage-banner-table";
import ManageBannerToolbar from "./component/manage-banner-toolbar";

export default function ManageBanner() {
  return (
    <div style={{ padding: 16 }}>
      <ManageBannerToolbar />
      <ManageBannerTable></ManageBannerTable>
    </div>
  );
}
