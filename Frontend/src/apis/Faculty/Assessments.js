import { axiosInstance } from "../axios";


export async function getAssessmentsByCourseId(courseId, facultyId, token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/faculty/getAssessmentsByCourseId/${courseId}/${facultyId}`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        console.log(res.data);
        return res.data;
    } else {
        console.log("Failure in Fetching Assessments. [Database must be down!]");
    }
}

export async function createAssessment(data, token){
    try {

        let headers = {
            "Authorization": token,
            "Content-Type": "application/json",
        };

        const res = await axiosInstance.post('/faculty/insertAssessment', data, { headers: headers });
        if (res.status === 200) {
            console.log("SUCCESS");
        } else {
            console.log("Something's wrong I can feel it");
        }
    } catch (ex) {
        return ex;
    }
}

export async function createQuestion(data,token){
    try {

        let headers = {
            "Authorization": token,
            "Content-Type": "application/json",
        };

        const res = await axiosInstance.post('INSERT URL', data, { headers: headers });
        if (res.status === 200) {
            console.log("SUCCESS");
        } else {
            console.log("Something's wrong I can feel it");
        }
    } catch (ex) {
        return ex;
    }
}