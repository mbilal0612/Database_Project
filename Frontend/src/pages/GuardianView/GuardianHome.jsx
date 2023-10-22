import React from 'react';
import { useEffect } from 'react';
import { decryptToken } from '../../apis/auth/getUserType';

const GuardianHome = () => {

  useEffect(()=>{

    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      console.log(userType);
      if( userType !== "GUARDIAN"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
    }

    checkUserType();
  });


  return (
    <div>GuardianHome</div>
  )
}

export default GuardianHome