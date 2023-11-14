import { axiosInstance } from "../axios";

const funcs = {

    createUser : async (data, token) => {
        try {

            let headers ={
                "Authorization": token,
                "Content-Type": "application/json",
            };

            const res = await axiosInstance.post('admin/createUser', data, {headers:headers});            
            if(res.status === 200){
                console.log("SUCCESS");
            }else{
                console.log("Something's wrong I can feel it");
            }
        } catch (ex) {
            return ex;
        }
    }

}

export default funcs;