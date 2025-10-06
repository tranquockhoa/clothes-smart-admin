import { IResponseError } from "~/interface";

export const getMessageError = (error: IResponseError) => {
  if (error && error.messages && error.messages.length) {
    return error.messages[0].message;
  }
  return "Error!";
};
