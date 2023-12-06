import { axiosInstance } from "../axios";


export async function getAssessmentsByCourseId(courseId, facultyId, token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/faculty/getAssessmentsByCourseId/${courseId}/${facultyId}`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        // console.log(res.data);
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

        //child["T_DATE"] = child["T_DATE"].split("T")[0];
        console.log("data",data);
        var temp = data.assessmentDate;
        // data["assessmentDate"]=data["assessmentDate"].split("T")[0];
        // console.log(temp.split("T")[0]); 
        console.log("data2",data);

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
        console.log(data);
        let headers = {
            "Authorization": token,
            "Content-Type": "application/json",
        };

        const res = await axiosInstance.post('/faculty/createQuestion', data, { headers: headers });
        if (res.status === 200) {
            console.log("SUCCESS");
        } else {
            console.log("Something's wrong I can feel it");
        }
        console.log(res);
    } catch (ex) {
        console.log('ex',ex)
        return ex;
    }
}

export async function getQuestions(assessmentId, token) {
    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/faculty/getAssessmentQuestions/${assessmentId}`, { headers: headers });
    // console.log(res.data.results);
    if (res.status == 200) {
        // console.log(res.data);
        return res.data;
    } else {
        console.log("Failure in Fetching Questions. [Database must be down!]");
    }
}

export async function getClos(courseId, token) {
    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/faculty/getCloByCourse/${courseId}`, { headers: headers });
    // console.log(res.data.results);
    if (res.status == 200) {
        // console.log(res.data);
        return res.data;
    } else {
        console.log("Failure in Fetching CLO's. [Database must be down!]");
    }
}

export async function deleteQuestion(questionId, token) {
    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.delete(`/faculty/deleteQuestion/${questionId}`, { headers: headers });
    // console.log(res.data.results);
    if (res.status == 200) {
        // console.log(res.data);
        return res.data;
    } else {
        console.log("Failure in deleting Question. [Database must be down!]");
    }
}

export async function deleteAssessment(assessmentId, token) {
    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.delete(`/faculty/deleteAssessment/${assessmentId}`, { headers: headers });
    // console.log(res.data.results);
    if (res.status == 200) {
        // console.log(res.data);
        return res.data;
    } else {
        console.log("Failure in deleting assessment. [Database must be down!]");
    }
}

export async function getPlos(token) {
    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/faculty/getAllPlo/`, { headers: headers });
    // console.log(res.data.results);
    if (res.status == 200) {
        // console.log(res.data);
        return res.data;
    } else {
        console.log("Failure in Fetching PLO's. [Database must be down!]");
    }
}

export async function createClo(data,token){
    try {

        let headers = {
            "Authorization": token,
            "Content-Type": "application/json",
        };
        console.log(data);
        const res = await axiosInstance.post('/faculty/createCLO', data, { headers: headers });
        if (res.status === 200) {
            console.log("SUCCESS");
        } else {
            console.log("Something's wrong I can feel it");
        }
    } catch (ex) {
        return ex;
    }
}