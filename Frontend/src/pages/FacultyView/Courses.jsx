import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import { getDetails } from "../../apis/Faculty/getDetails";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import OutlinedCard from "../../components/CourseCard";
import { getFacultyCourses } from "../../apis/Faculty/AllCourses";

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [courses, setCourses] = useState([]);
  var i = 0;

  useEffect(() => {
    const getDetail = async () => {
      const token = sessionStorage.getItem("token");
      const decryptedToken = await decryptToken(token);
      const res = await getDetails(
        decryptedToken.data.id,
        sessionStorage.getItem("token")
      );
      const arr = await getFacultyCourses(
        decryptedToken.data.id,
        sessionStorage.getItem("token")
      );
      setName(res.data.FIRST_NAME);
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
              <OutlinedCard
                key={i++}
                subject_code={iter.COURSE_ID}
                subject={iter.COURSE_NAME}
                grade={iter.CLASS_ID}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Courses;
