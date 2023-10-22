import { axiosInstance } from "../axios";

export const decryptToken = async (tok) => {
  try {
    const res = await axiosInstance.get(`auth/decryptToken/${tok}`);
    // console.log(res);
    return res;

  } catch (ex) {
    return ex;
  }
};