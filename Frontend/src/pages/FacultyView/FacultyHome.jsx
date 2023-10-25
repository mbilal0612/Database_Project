import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import SimpleBackdrop from '../../components/util-components/Loader';
import FacultyNavbar from '../../components/Navbars/FacultyNavbar';

const FacultyHome = () => {
  const [render, setRender] = useState(false);
  useEffect(()=>{

    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      console.log(userType);
      if( userType !== "FACULTY"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
      else setRender(true);
    }
    
    checkUserType();
  });

  
  return (
    <>{render ? (<div>
      <FacultyNavbar />
      FacultyHome</div>): (<SimpleBackdrop currentOpenState={true} handleClose={() => {}}></SimpleBackdrop>)}</>
    
  )
}

export default FacultyHome