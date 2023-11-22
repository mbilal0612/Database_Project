import React, { useEffect, useState, setState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import { getClos, getQuestions } from "../../apis/Faculty/Assessments";
import QuestionsTable from "../../components/FacultyComponents/QuestionsList";

const AssessmentDetails = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [cloList, setCloList] = useState([]);
  const [maxMarks, setMaxMarks] = useState([]);
  const [question, setQuestion] = useState([]);
  const [selectedClo, setSelectedClo] = useState([]);
  useEffect(() => {
    const getDetail = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        window.location.assign("/notfound");
      }
      const decryptedToken = await decryptToken(token);

      if (decryptedToken.data.userType != "FACULTY") {
        window.location.assign("/notfound");
      }
      sessionStorage.setItem("facultyId", decryptedToken.data.id);
      const getList = await getQuestions(
        sessionStorage.getItem("assessmentId"),
        token
      );
      console.log(getList);
      const getClo = await getClos(sessionStorage.getItem("courseId"), token);
      setCloList(getClo);
      setQuestions(getList.results);
      console.log(getList);

      setLoading(false);
    };

    setLoading(true);
    getDetail();
  }, []);
  const handleEntry = async () => {
    if (maxMarks >= 0 && question) {
    }
  };
  return (
    <>
      {" "}
      {loading ? (
        <SimpleBackdrop currentOpenState={true} handleClose={() => {}} />
      ) : (
        <div className="div1">
          <FacultyNavbar />
          <h1>{sessionStorage.getItem("courseId")}</h1>
          <h2>{sessionStorage.getItem("classId")}</h2>
          <h2>
            {sessionStorage.getItem("assessmentId")}:{" "}
            {sessionStorage.getItem("assessmentName")}
          </h2>
          <QuestionsTable
            rows={questions}
            CLO={cloList}
            handleMax={(event) => {
              setMaxMarks(event.target.value);
            }}
            handleQuestion={(event) => {
              setQuestion(event.target.value);
            }}
            setSelectedClo={setSelectedClo}
            buttonPressed={handleEntry}
          />
        </div>
      )}
    </>
  );
};
export default AssessmentDetails;
