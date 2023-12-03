import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import { getCourseDetails } from "../../apis/Faculty/getCourseDetails";
import MarksEnteringTable from "../../components/FacultyComponents/StudentsMarksTable";



const StudentList = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  
  useEffect(() => {
    const getDetail = async () => {
      const token = sessionStorage.getItem("token");
      if(!token){
        window.location.assign('/notfound');
      }
      const decryptedToken = await decryptToken(token);

      if(decryptedToken.data.userType!="FACULTY"){
        window.location.assign('/notfound');
      }
      const table = await getCourseDetails(sessionStorage.getItem("classId"), token);
      setStudents(table);

      setLoading(false);
    };

    setLoading(true);
    getDetail();
  }, []);
  
  return (
    <>
      {loading ? (
        <SimpleBackdrop currentOpenState={true} handleClose={() => {}} />
      ) : (
        <div className="div1">
          <FacultyNavbar />
          <h1>{sessionStorage.getItem("courseId")}</h1>
          <h2>{sessionStorage.getItem("classId")}</h2>
          <MarksEnteringTable contents={students}/>
        </div>
      )}
    </>
  );
};

export default StudentList;
