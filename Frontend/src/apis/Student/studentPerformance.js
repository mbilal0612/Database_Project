import { axiosInstance } from "../axios";

export const getMyPerformance = async (studentId,classId, courseId, token) => {
  try {

    const res = await axiosInstance.get(`student/getStudentPerformance/${studentId}/${classId}/${courseId}`,{headers:{'Authorization':token}});

    return res.data;
  } catch (ex) {
    return ex;
  }
};