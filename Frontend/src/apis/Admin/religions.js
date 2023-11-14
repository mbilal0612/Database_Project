import { axiosInstance } from "../axios";

export const getReligions = async () => {

    try {
        const res = await axiosInstance.get(`admin/getReligions`);
        if(res.status === 200){
        return res.data.data;
        }
    } catch (ex) {
        return ex;
    }

};