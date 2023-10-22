import { axiosInstance } from "../axios";

export const decryptToken = async (tok) => {
  try {
    const res = await axiosInstance.get(`auth/decryptToken/${tok}`);
    return res;

  } catch (ex) {
    return ex;
  }
};