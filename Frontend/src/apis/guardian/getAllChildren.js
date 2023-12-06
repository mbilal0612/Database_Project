import { axiosInstance } from "../axios";

export const getAllChildren = async (guardianId) => {
    try {
        const res = await axiosInstance.get(
            `/guardian/getAllChildren/${guardianId}`
        );
        console.log(res);
        return res;
    } catch (ex) {
        return ex;
    }
};
