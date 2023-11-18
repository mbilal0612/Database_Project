import { axiosInstance } from "../axios";

export const getStudentCourses = async (id, token) => {
  try {
    const res = await axiosInstance.get(`student/getStudentCourses/${id}`, {
      headers: { Authorization: token },
    });

    return res;
  } catch (ex) {
    return ex;
  }
};
