import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import SimpleBackdrop from '../../components/util-components/Loader';
import AdminNavbar from '../../components/Navbars/AdminNavbar';

const AdminHome = () => {
  const [render, setRender] = useState(false);
  useEffect(()=>{

    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      console.log(userType);
      if( userType !== "ADMIN"){
        window.location.assign("/UNAUTHORIZEDACCESS");
      }
      else setRender(true);
    }
    
    checkUserType();
  });

  
  return (
    <>{render ? (
    <div className="div1">
      <AdminNavbar/>
      AdminHome
      </div>
      ): (<SimpleBackdrop currentOpenState={true} handleClose={() => {}}></SimpleBackdrop>)}</>
  
  )
}

export default AdminHome