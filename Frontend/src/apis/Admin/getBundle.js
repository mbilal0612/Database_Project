import { axiosInstance } from "../axios";

//AcademicYearService
export async function AcademicYears(token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get('/admin/getAcademicYears', { headers: headers });
    //console.log(res.data);
    if (res.status == 200) {
        return res.data.data;
    } else {
        console.log("Failure in Fetching Academic Years. [Database must be down!]");
    }
}

//Class Service
export async function ClassesForArrears(token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get('/admin/getClassesForArrears', { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Classes. [Database must be down!]");
    }
}

export async function AllClasses(token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get('/admin/getAllClasses', { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Classes. [Database must be down!]");
    }
}

//courseService
export async function AllCourses(token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/getAllCourses`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        console.log(res.data);
        return res.data;
    } else {
        console.log("Failure in Fetching Courses Information. [Database must be down!]");
    }
}

//studentService
export async function StudentInfo(token, ID) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/getStudentInfo/${ID}`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Student Information. [Database must be down!]");
    }
}

//FinanceService
export async function StudentLedger(token, ID) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/generateStudentLedger/${ID}`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Student Ledger. [Database must be down!]");
    }

}

export async function StudentFee(token, ID) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/getStudentFee/${ID}`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Student Information. [Database must be down!]");
    }

}

//userService
export async function Faculty(token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/getFaculty`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Student Information. [Database must be down!]");
    }
}

//courseService
export async function Courses(token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/getAllCourses`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Student Information. [Database must be down!]");
    }
}

//cloService
export async function CLOByCourse(token, courseID) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/getCLOByCourse/${courseID}`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Student Information. [Database must be down!]");
    }

}

//ploService
export async function AllPlos(token) {

    let headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    };

    const res = await axiosInstance.get(`/admin/getAllPlos`, { headers: headers });
    //console.log(res.data.results);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log("Failure in Fetching Student Information. [Database must be down!]");
    }

}