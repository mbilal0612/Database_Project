import React from 'react';
import { useEffect } from 'react';
import { decryptToken } from '../../apis/auth/getUserType';

const FacultyHome = () => {

  useEffect(()=>{
    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      // console.log(decryptedToken);
      const userType = decryptedToken.data.userType;
      console.log(userType);
      if( userType !== "FACULTY"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
    }

    checkUserType();
  });

  return (
    <div>FacultyHome</div>
  )
}

export default FacultyHome