import { axiosInstance } from "../axios";

export const getChildrenECA = async (studentId) => {
    try {
        
        const res = await axiosInstance.get(
            `/guardian/getChildrenECA/${studentId}`
        );
        console.log('eca',res);
        return res;
    } catch (ex) {
        return ex;
    }
};
