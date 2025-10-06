import MyTable from "~/components/ui/table";
import { IUser } from "~/interface/user/user";

export default function ManageAccount() {
  return (
    <div style={{ padding: 16 }}>
      <MyTable<IUser> />
    </div>
  );
}
