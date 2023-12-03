import { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
//import { getDetails } from "../../apis/Faculty/getDetails";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import OutlinedCard from "../../components/CourseCard";
import { getFacultyCourses } from "../../apis/Faculty/AllCourses";

const EnterMarks = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  var i = 0;

  useEffect(() => {
    const getDetail = async () => {
      const token = sessionStorage.getItem("token");
      if(!token)  window.location.assign('/notfound');
      const decryptedToken = await decryptToken(token);

      const arr = await getFacultyCourses(
        decryptedToken.data.id,
        sessionStorage.getItem("token")
      );
      if(decryptedToken.data.userType!="FACULTY"){
        window.location.assign('/notfound');
      }

      setCourses(arr.data);
    };

    getDetail();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [courses]);

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

          {courses.map((iter) => {
            return (
              <div style={{margin:"1%"}} key={i++}>
              <OutlinedCard 
                subject_code={iter.COURSE_ID}
                subject={iter.COURSE_NAME}
                grade={iter.CLASS_ID}
                click={() => {
                  sessionStorage.setItem("classId", iter.CLASS_ID);
                  sessionStorage.setItem("courseId", iter.COURSE_ID);
                  window.location.assign("/EnterMarks/AssessmentList");
                }}
                buttonName={"Assessment List"}
              />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default EnterMarks;
