import { axiosInstance } from "../axios";

export const getDetails = async (id, token) => {
  try {

    const res = await axiosInstance.get(`faculty/getFacultyById/${id}`,{headers:{'Authorization':token}});

    return res;
  } catch (ex) {
    return ex;
  }
};


