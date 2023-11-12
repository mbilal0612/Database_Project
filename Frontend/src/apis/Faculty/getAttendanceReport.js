import { axiosInstance } from "../axios";

export const getAttendanceReport = async (studentId,token) => {
  try {

    const res = await axiosInstance.get(`admin/getStudentAttendanceReportByAcademicYear/${studentId}/2023`,{headers:{'Authorization':token}});

    return res.data;
  } catch (ex) {
    return ex;
  }
};
