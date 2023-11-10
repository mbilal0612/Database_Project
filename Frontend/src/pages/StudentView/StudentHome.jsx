import React, {useEffect, useState} from 'react'
import { decryptToken } from '../../apis/auth/getUserType';
import { getStudentDetails } from '../../apis/Student/getStudentDetails';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import CircularWithValueLabel from "../../components/util-components/circularProgressWithLabel.jsx";
import CustomizedProgressBars from "../../components/util-components/FacebookCircularProgress.jsx";
import SimpleBackdrop from '../../components/util-components/Loader';
import StudentNavbar from "../../components/Navbars/StudentNavbar";
import StudentHomeCard from '../../components/util-components/StudentHomeCard';
import { getStudentCourses } from "../../apis/Student/StudentCourses";
import StudentWelcome from '../../components/Welcome Message/StudentWelcome';

const StudentHome = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const studentcourses = [{subject_code:"arb1",subject:"Arabic", grade:"9b", Teacher:"Sir Ahmed", marks:"75%"}, 
                          {subject_code:"cmpt100",subject:"Introduction To Programming", grade:"9b", Teacher:"Sir Abid", marks:"83%"}, 
                          {subject_code:"eng1",subject:"English", grade:"9b", Teacher:"Miss Ayesha", marks:"67%"},
                          {subject_code:"phys1",subject:"Physics", grade:"9b", Teacher:"Sir Tariq", marks:"58%"},
                          {subject_code:"math1",subject:"Mathematics", grade:"9b", Teacher:"Miss Sana", marks:"93%"}]
  // const [studentcourses, setStudentCourses] = useState([]);
  var i = 0;



  useEffect(() => {
    const getDetail = async () => {
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const res = await getStudentDetails(
        decryptedToken.data.id,
        sessionStorage.getItem("token")
      );
      setName(res.data.FIRST_NAME);
      console.log(res);
      setLoading(false);
    };
    setLoading(true);
    getDetail();
  }, []);

  // useEffect(() => {
  //   setLoading(false);
  // }, [studentcourses]);

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
      <div className="S2">
       Your Courses:
      </div> 
      {studentcourses.map((iter) => {
            return (
              <StudentHomeCard
                key={i++}
                subject_code={iter.subject_code}
                subject={iter.subject}
                grade={iter.grade}
                Teacher={iter.Teacher}
                marks={iter.marks}
              />
            );
          })}
</>
      )}
    </>
  );
        }















//   return (
//     <>{render ? (
//       <>
//       <div className="div1">
//         <StudentNavbar />
//         StudentHome
//       </div>
//       <div className="S1">
//         Welcome, <br></br>
//         StudentName
//       </div>  
//       <div className="S2">
//        Your Courses:
//       </div> 
//       {studentcourses.map((iter) => {
//             return (
//               <StudentHomeCard
//                 key={i++}
//                 subject_code={iter.COURSE_ID}
//                 subject={iter.COURSE_NAME}
//                 grade={iter.CLASS_ID}
//               />
//             );
//           })}
// </>
//       ): (<SimpleBackdrop currentOpenState={true} handleClose={() => {}}></SimpleBackdrop>)}</>
    
//   )
// }

export default StudentHome