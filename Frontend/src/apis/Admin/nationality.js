import { axiosInstance } from "../axios";

export const getNat = async () => {
    try {
        const res = await axiosInstance.get(`admin/getNationalities`);
        if(res.status === 200){
        return res.data.data;
        }
    } catch (ex) {
        return ex;
    }
};

