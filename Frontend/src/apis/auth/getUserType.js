import { axiosInstance } from "../axios";

export const decryptToken = async (token) => {
  try {
    const res = await axiosInstance.get("admin/queryLogin", {params:{token:token}});
    return res;

  } catch (ex) {
    return ex;
  }
};