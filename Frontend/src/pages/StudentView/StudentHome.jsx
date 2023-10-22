import React from 'react'
import { useEffect } from 'react';
import { decryptToken } from '../../apis/auth/getUserType';

const StudentHome = () => {

  useEffect(()=>{

    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      console.log(userType);
      if( userType !== "STUDENT"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
    }

    checkUserType();
  });


  return (
    <div>StudentHome</div>
  )
}

export default StudentHome