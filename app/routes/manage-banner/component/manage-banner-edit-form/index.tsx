import { Form } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyForm from "~/components/ui/form";
import MyInput from "~/components/ui/input";
import MyModal from "~/components/ui/modal";
import MySelect from "~/components/ui/select";
import { STATUS } from "~/enum/common";
import { getBannerByIdApiRequest } from "~/store/features/info-banner/info-banner.action";
import { AppDispatch, RootState } from "~/store/store";

interface ManagerBannerEditFormModalProps {
  visible: boolean;
  onCancel: () => void;
  bannerId: string;
}

export const ManagerBannerEditFormModal: React.FC<
  ManagerBannerEditFormModalProps
> = ({ visible, onCancel, bannerId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { infoBanner } = useSelector((state: RootState) => state.infoBanner);

  useEffect(() => {
    dispatch(getBannerByIdApiRequest(bannerId));
  }, [bannerId, dispatch]);

  useEffect(() => {
    if (infoBanner) {
      form.setFieldsValue({
        title: infoBanner.data.title,
        description: infoBanner.data.description,
        imageId: infoBanner.data.imageId,
        linkUrl: infoBanner.data.linkUrl,
        status: infoBanner.data.status,
        sortOrder: infoBanner.data.sortOrder,
      });
    }
  }, [infoBanner, form]);

  //   const onFinish = async (form: IFormUpdateBanner) => {
  //     const payload: IFormUpdateUserProfile = {
  //       name: form.name,
  //       address: form.address,
  //       role: form.role,
  //       status: form.status,
  //     };
  //     try {
  //       const response = await updateUserProfileApi(userId, payload);
  //       if (response.status) {
  //         notification.success({
  //           message: MESSAGE_STATUS.SUCCESS,
  //           description: MESSAGE_STATUS.UPDATED_SUCCESSFULLY,
  //         });
  //         onCancel();
  //       }
  //     } catch (error) {
  //       notification.error({
  //         message: MESSAGE_STATUS.ERROR,
  //         description: (
  //           <div>
  //             {(error as IError).data.message.map((mes, index) => (
  //               <div key={index}>
  //                 {mes}
  //                 <br />
  //               </div>
  //             ))}
  //           </div>
  //         ),
  //       });
  //     }
  //   };

  const handleOk = () => {
    MyModal.confirm({
      title: "Cập nhật thông tin người dùng",
      content: "Bạn có chắc chắn với hành động này",
      //   onOk: async () => {
      //     const values = form.getFieldsValue();
      //     await onFinish(values);
      //     await dispatch(getAllUserRequest(pagination));
      //   },
    });
  };

  return (
    <MyModal
      open={visible}
      onCancel={onCancel}
      title="Thông tin người dùng"
      width={1000}
      style={{ top: 40 }}
      onOk={handleOk}
    >
      <MyForm form={form} layout="vertical">
        <Form.Item label="Title" name="title">
          <MyInput placeholder="title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <MyInput placeholder="description" />
        </Form.Item>

        <Form.Item label="ImageId" name="imageId">
          <MyInput placeholder="imageId" />
        </Form.Item>

        <Form.Item label="LinkUrl" name="linkUrl">
          <MyInput placeholder="linkUrl" />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <MySelect placeholder="Select status">
            <MySelect.Option value={STATUS.ACTIVE}>Active</MySelect.Option>
            <MySelect.Option value={STATUS.INACTIVE}>Inactive</MySelect.Option>
          </MySelect>
        </Form.Item>
      </MyForm>
    </MyModal>
  );
};
