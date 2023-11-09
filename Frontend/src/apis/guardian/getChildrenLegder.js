import { axiosInstance } from "../axios";

export const getChildrenLedger = async (studentId) => {
    try {
        
        const res = await axiosInstance.get(
            `/guardian/getStudentLedger/${studentId}`
        );
        res.data.entities.forEach((child) => {
            child["T_DATE"] = child["T_DATE"].split("T")[0];
        });
        console.log('res',res);
        return res;
    } catch (ex) {
        return ex;
    }
};
