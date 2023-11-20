import React, { useEffect, useState } from "react";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import { decryptToken } from "../../apis/auth/getUserType";
import { getDetails } from "../../apis/Faculty/getDetails";


const AddAssessment = () => {
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
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
        
        setLoading(false);
      };
  
      setLoading(true);
      getDetail();
  }, []);
  return (
    <>
      {loading ? (
        <SimpleBackdrop
          currentOpenState={true}
          handleClose={() => {}}
        ></SimpleBackdrop>
      ) : (
        <div className="div1">
          <FacultyNavbar />
          <h1>{sessionStorage.getItem("courseId")}</h1>
          <h2>{sessionStorage.getItem("classId")}</h2>
        </div>
      )}
    </>
  );
};

export default AddAssessment;
