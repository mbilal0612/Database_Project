import { axiosInstance } from "../axios";

export const getStudentDetails = async (id, token) => {
  try {
//need to change after creating student routes
    const res = await axiosInstance.get(`admin/getStudentByID/${id}`,{headers:{'Authorization':token}});

    return res;
  } catch (ex) {
    return ex;
  }
};

