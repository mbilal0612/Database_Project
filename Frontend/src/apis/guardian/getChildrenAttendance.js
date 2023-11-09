import { axiosInstance } from "../axios";

export const getChildrenAttendance = async (studentId) => {
    try {
        const res = await axiosInstance.get(
            `/guardian/getAllChildrenAttendance/${studentId}`
        );
        res.data.forEach((child) => {
            child["P_DATE"] = child["P_DATE"].split("T")[0];
        });
        console.log(res);
        return res;
    } catch (ex) {
        return ex;
    }
};
