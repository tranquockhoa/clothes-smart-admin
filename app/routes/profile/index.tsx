import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";

export default function Profile() {
  return (
    <div className=" flex items-center justify-center mt-[20px]">
      <MyForm layout="vertical" className="flex flex-col w-3xl bg-white ">
        <MyForm.Item label="Name">
          <MyInput placeholder="name" />
        </MyForm.Item>
        <MyForm.Item label="Email">
          <MyInput placeholder="email" />
        </MyForm.Item>
        <MyForm.Item label="Phone">
          <MyInput placeholder="phone" />
        </MyForm.Item>
        <MyForm.Item label="Address">
          <MyInput placeholder="address" />
        </MyForm.Item>
        <MyForm.Item label="Gender">
          <MyInput placeholder="gender" />
        </MyForm.Item>
        <MyForm.Item label="Date of birth">
          <MyInput placeholder="Date of birth" />
        </MyForm.Item>
        <MyForm.Item label="Role">
          <MyInput placeholder="role" />
        </MyForm.Item>
      </MyForm>
    </div>
  );
}
