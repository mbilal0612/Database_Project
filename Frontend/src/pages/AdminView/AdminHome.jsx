import React from 'react';
import { useEffect } from 'react';
import { decryptToken } from '../../apis/auth/getUserType';
const AdminHome = () => {

  // * this handles the cases where the user is logged and will not be able to acccess the parts where it isn't allowed to
  // * student cant only access student home page
  useEffect(()=>{

    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data.userType;
      console.log(userType);
      if( userType !== "ADMIN"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
    };

    checkUserType();
  });

  return (
    <div>AdminHome</div>
  )
}

export default AdminHome