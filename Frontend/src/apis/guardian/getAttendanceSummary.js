import { axiosInstance } from "../axios";

export const getAttendanceSummary = async (studentId) => {
    try {
        const res = await axiosInstance.get(
            `/guardian/getChildrenAttendanceSummary/${studentId}`
        );
        
        
        
        return res;
    } catch (ex) {
        return ex;
    }
};

