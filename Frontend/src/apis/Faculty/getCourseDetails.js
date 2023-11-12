import { axiosInstance } from "../axios";

export const getCourseDetails = async (classId, token) => {
  try {

    const res = await axiosInstance.get(`faculty/getCourseDetails/${classId}`,{headers:{'Authorization':token}});

    return res.data;
  } catch (ex) {
    return ex;
  }
};
