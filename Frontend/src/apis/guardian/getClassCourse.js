import { axiosInstance } from "../axios";

export const getClassCourse = async (classId) => {
    try {
        
        const res = await axiosInstance.get(
            `/guardian/getClassCourse/${classId}`
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
