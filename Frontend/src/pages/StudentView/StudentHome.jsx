import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import { getStudentDetails } from "../../apis/Student/getStudentDetails";
import SimpleBackdrop from "../../components/util-components/Loader";
import StudentNavbar from "../../components/Navbars/StudentNavbar";
import StudentHomeCard from "../../components/util-components/StudentHomeCard";
import { getStudentCourses } from "../../apis/Student/StudentCourses";
import StudentWelcome from "../../components/Welcome Message/StudentWelcome";
import { getDetails } from "../../apis/Faculty/getDetails.js";
import { getStudentPerformance } from "../../apis/Faculty/getStudentPerformance.js";

const StudentHome = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [studentCourses, setStudentCourses] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const res = await getStudentDetails(
        decryptedToken.data.id,
        sessionStorage.getItem("token")
      );

      setName(res.data.results[0].FIRST_NAME);

      var apiCourses = await getStudentCourses(decryptedToken.data.id, token);

      console.log(apiCourses.data);

      // this beautiful snippet is written by mr saad karim
      apiCourses = await Promise.all(
        await apiCourses.data.map(async function (course) {
          const res = await getDetails(course.FACULTY_ID, token);
          const teacherName = `${res.data.FIRST_NAME} ${res.data.LAST_NAME}`;
          course.FACULTY_NAME = teacherName;
          const perf = await getStudentPerformance(
            decryptedToken.data.id,
            course.CLASS_ID,
            course.COURSE_ID,
            token
          );
          course.MARKS = perf.average;
          return course;
        })
      );
      setStudentCourses(apiCourses);

      console.log(apiCourses);
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
        <>
          <div className="div1">
            <StudentNavbar />
          </div>
          <StudentWelcome name={name} />
          <div className="S2">Your Courses:</div>
          {studentCourses.map((item, index) => {
            return (
              <StudentHomeCard
                key={index}
                COURSE_ID={item.COURSE_ID}
                COURSE_NAME={item.COURSE_NAME}
                CLASS_ID={item.CLASS_ID}
                FACULTY_NAME={item.FACULTY_NAME}
                MARKS={item.MARKS}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default StudentHome;
