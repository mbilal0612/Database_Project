import { axiosInstance } from "../axios";

export const getFacultyCourses = async (tok, token) => {
  try {
    const res = await axiosInstance.get(`faculty/getFacultyCourses/${tok}`,{headers:{'Authorization':token}});

    return res;
  } catch (ex) {
    return ex;
  }
};
