import { axiosInstance } from "../axios";

export const getCloDetails = async (cloId,studentId,courseId) => {
    try {
        
        const res = await axiosInstance.get(
            `/guardian/getClorow/${cloId}/${studentId}/${courseId}/`
        );

        console.log('res',res);
        return res;
    } catch (ex) {
        return ex;
    }
};
