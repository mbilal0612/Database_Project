import { axiosInstance } from "../axios";

export const getChildrenFee = async (studentId) => {
    try {
        
        const res = await axiosInstance.get(
            `/guardian/getChildrenFee/${studentId}`
        );
        // res.data.forEach((child) => {
        //     child["P_DATE"] = child["P_DATE"].split("T")[0];
        // });
        console.log('res',res);
        return res;
    } catch (ex) {
        return ex;
    }
};
