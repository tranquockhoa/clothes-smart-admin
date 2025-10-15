import authorizedRequest from "../config/axios";
import { ADMIN_FILES_UPLOAD } from "./config.endpoint";

export const mediaUploadApi = async (body: FormData) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // let requestBody: any = body;
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    // if (body.file && body.file instanceof File) {
    //   const formData = new FormData();
    //   formData.append("file", body.file);
    //   requestBody = formData;
    // }

    const response = await authorizedRequest.post(ADMIN_FILES_UPLOAD, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error mediaUploadApi:", error);
    throw error;
  }
};

export const getMediaApi = async (id: string) => {
  try {
    const response = await authorizedRequest.get(`/media/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getMediaApi:", error);
    throw error;
  }
};
