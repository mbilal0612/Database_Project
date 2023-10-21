import { axiosInstance } from "../axios";

export const login = async (username, password) => {
  try {
    let input = {
      id: username,
      password: password,
    };

    const res = await axiosInstance.post("admin/queryLogin", input);

    return res;
  } catch (ex) {
    return ex;
  }
};


