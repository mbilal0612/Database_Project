import { axiosInstance } from "../axios";

export const getClassMarks = async (classId, assessmentId, token) => {
    try {
        const res = await axiosInstance.get(
            `/faculty/getClassMarks/${assessmentId}/${classId}`,
            { headers: { Authorization: token } }
        );

        return res.data;
    } catch (ex) {
        return ex;
    }
};

export const updateMarks = async (
    studentId,
    assessmentId,
    obtainedMarks,
    token
) => {
    try {
        let headers = {
            Authorization: token,
            "Content-Type": "application/json",
        };
        var data = {
            studentId: studentId,
            assessmentId: assessmentId,
            marks: obtainedMarks,
        };
        const res = await axiosInstance.put("/faculty/updateMarks", data, {
            headers: headers,
        });
        if (res.status === 200) {
            console.log("SUCCESS");
        } else {
            console.log("Something's wrong I can feel it");
        }
    } catch (ex) {
        return ex;
    }
};
