import { axiosInstance } from "../axios";

export const getChildrenRecentClass = async (studentId) => {
    try {
        
        const res = await axiosInstance.get(
            `/guardian/getRecentChildrenClass/${studentId}`
        );

        console.log('res4',res);
        return res;
    } catch (ex) {
        return ex;
    }
};
