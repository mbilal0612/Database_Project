import { axiosInstance } from "../axios";

export const getStudentPerformance = async (studentId,classId, courseId, token) => {
  try {

    const res = await axiosInstance.get(`faculty/getStudentPerformance/${studentId}/${classId}/${courseId}`,{headers:{'Authorization':token}});

    return res.data;
  } catch (ex) {
    return ex;
  }
};