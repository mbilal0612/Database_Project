import { axiosInstance } from "../axios";

//academicYearService
export async function UserPasswordReset(data, token) {
    try {

        let headers = {
            "Authorization": token,
            "Content-Type": "application/json",
        };

        const res = await axiosInstance.patch('admin/devForcePasswordReset', data, { headers: headers });
        if (res.status === 200) {
            console.log("SUCCESS");
            return res;
        } else {
            console.log("Something's wrong I can feel it");
        }
    } catch (ex) {
        return ex;
    }
}

//tfaService
export async function QueryTFA(data) {
    try {

        let headers = {
            "Content-Type": "application/json",
        };

        const res = await axiosInstance.patch('admin/queryTFA', data, { headers: headers });
        if (res.status === 200) {
            return res;
        } else {
            console.log("Something's wrong I can feel it");
        }
    } catch (ex) {
        return ex;
    }
}

export async function numbNuts(){

}