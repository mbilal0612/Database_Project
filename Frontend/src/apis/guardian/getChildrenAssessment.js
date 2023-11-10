import { axiosInstance } from "../axios";

export const getChildrenCourseAssessment = async (studentId,courseId) => {
    try {
        const res = await axiosInstance.get(
            `/guardian/getChildrenCourseAssessment/${studentId}/${courseId}`
        );
        // res.data.forEach((child) => {
        //     child["P_DATE"] = child["P_DATE"].split("T")[0];
        // });
        console.log("ASS",res);
        return res;
    } catch (ex) {
        return ex;
    }
};
