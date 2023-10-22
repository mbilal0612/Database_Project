import React from 'react';
import { useEffect } from 'react';
import { decryptToken } from '../../apis/auth/getUserType';
import PasswordField from '../../components/util-components/PasswordField';

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
    <div><PasswordField margin={1}/></div>
  )
}

export default GuardianHome