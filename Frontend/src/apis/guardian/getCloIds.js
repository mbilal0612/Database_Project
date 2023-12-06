import { axiosInstance } from "../axios";

export const getCloIds = async (studentId, courseId) => {
    try {
        
        const res = await axiosInstance.get(
            `/guardian/getCloIds/${studentId}/${courseId}`
        );

        console.log('res',res);
        return res;
    } catch (ex) {
        return ex;
    }
};
