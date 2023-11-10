import { axiosInstance } from "../axios";

export const getStudentCourses = async (tok, token) => {
  try {
    const res = await axiosInstance.get(`student/getStudentCourses/${tok}`,{headers:{'Authorization':token}});

    return res;
  } catch (ex) {
    return ex;
  }
};