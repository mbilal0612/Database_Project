import { axiosInstance } from "../axios";

export const getCloProgress = async (studentId,courseId,token) => {
  try {

    const res = await axiosInstance.get(`/faculty/getCloProgress/${studentId}/${courseId}`,{headers:{'Authorization':token}});

    return res.data;
  } catch (ex) {
    console.log(ex);
    return ex;
  }
};
