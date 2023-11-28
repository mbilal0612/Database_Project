import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import SimpleBackdrop from '../../components/util-components/Loader';
import StudentNavbar from "../../components/Navbars/StudentNavbar";
import GuardianGradeTable from '../../components/GuardianComponents/GuardianGradeTable';
import { Paper } from '@mui/material';

const Grades = () => {
  const [render, setRender] = useState(false);
  const [userid, setId] = useState("");

  useEffect(()=>{
    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      setId(decryptedToken.data.id)
      if( userType !== "STUDENT"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
      else setRender(true);
    }
    
    checkUserType();
  });
  
  return (
    <>{render ? (
    <div className="div1">
      <StudentNavbar />
      <Paper sx={{m:2, height:"100%"}} elevation={24}>
        <GuardianGradeTable studentId={userid}/>
      </Paper>
    </div>
      ): (<SimpleBackdrop currentOpenState={true} handleClose={() => {}}></SimpleBackdrop>)}</>
    
  )
}

export default Grades