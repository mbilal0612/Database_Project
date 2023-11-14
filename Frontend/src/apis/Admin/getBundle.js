import { axiosInstance } from "../axios";

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