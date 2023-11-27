import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import SimpleBackdrop from '../../components/util-components/Loader';
import StudentNavbar from "../../components/Navbars/StudentNavbar";
import ScheduleTable from '../../components/StudentComponents/ScheduleTable';

const Schedule = () => {
  const [render, setRender] = useState(false);
  useEffect(()=>{

    const checkUserType = async () =>{
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const userType = decryptedToken.data["userType"];
      // console.log(userType);
      if( userType !== "STUDENT"){
        window.location.assign("/UNATHORIZEDACCESS");
      }
      else setRender(true);
    }
    
    checkUserType();
  });

  const schedule = [
    ['Math', 'English', 'Science', 'History', 'Gym', 'CS', 'Art', 'Arabic'],
    ['English', 'Science', 'History', 'Math', 'Arabic', 'ITC', 'Gym', 'Art'],
    ['Math', 'English', 'Science', 'History', 'Gym', 'CS', 'Art', 'Arabic'],
    ['English', 'Science', 'History', 'Math', 'Arabic', 'ITC', 'Gym', 'Art'],
    ['Math', 'English', 'Science', 'History', 'Gym', 'CS', 'Art', 'Arabic']
  ];
  
  return (
    <>{render ? (
    <div className="div1">
      <StudentNavbar />
      <ScheduleTable schedule={schedule} />
    </div>
      ): (<SimpleBackdrop currentOpenState={true} handleClose={() => {}}></SimpleBackdrop>)}</>
    
  )
}

export default Schedule