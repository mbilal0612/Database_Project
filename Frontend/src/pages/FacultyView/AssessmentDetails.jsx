import React, { useEffect, useState } from "react";
import { decryptToken } from "../../apis/auth/getUserType";
import SimpleBackdrop from "../../components/util-components/Loader";
import FacultyNavbar from "../../components/Navbars/FacultyNavbar";
import {
  createClo,
  createQuestion,
  getClos,
  getPlos,
  getQuestions,
} from "../../apis/Faculty/Assessments";
import QuestionsTable from "../../components/FacultyComponents/QuestionsList";
import CLOCard from "../../components/FacultyComponents/CLOCard";

const AssessmentDetails = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [cloList, setCloList] = useState([]);
  const [maxMarks, setMaxMarks] = useState(0);
  const [question, setQuestion] = useState("");
  const [selectedClo, setSelectedClo] = useState([]);
  const [ploList, setPloList] = useState([]);
  const [selectedPlo, setSelectedPlo] = useState([]);
  const [newCloId, setNewCloId] = useState("");
  const [newCloName, setNewCloName] = useState("");
  const [newCloDesc, setNewCloDesc] = useState("");

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
      const getClo = await getClos(sessionStorage.getItem("courseId"), token);
      setCloList(getClo);
      setQuestions(getList.results);
      const getPlo = await getPlos(token);
      setPloList(getPlo);
      setLoading(false);
    };

    setLoading(true);
    getDetail();
  }, []);
  const handleEntry = async () => {
    if (maxMarks >= 0 && question != "") {
      var obj = {
        assessmentId: sessionStorage.getItem("assessmentId"),
        questionDesc: question,
        maxMarks: maxMarks,
        cloList: selectedClo,
      };
      var api = await createQuestion(obj, sessionStorage.getItem("token"));
      console.log("done");
      window.location.reload(false);
    }
  };
  const handleNewClo = async () => {
    if (newCloId != "" && newCloDesc != "" && newCloName != "") {
      var obj = {
        courseId: sessionStorage.getItem("courseId"),
        cloDesc: newCloDesc,
        cloName: newCloName,
        cloId: sessionStorage.getItem("courseId")+"-"+newCloId,
        ploIds: selectedPlo,
      };
      var api = await createClo(obj, sessionStorage.getItem("token"));
      // console.log(api);
      window.location.reload(false);
      // console.log(newCloDesc);
      // console.log(newCloName);
      // console.log(sessionStorage.getItem("courseId")+"-"+newCloId);
      // console.log(selectedPlo);
      
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
          <CLOCard
            courseId={sessionStorage.getItem("courseId")}
            setSelectedPlo={setSelectedPlo}
            ploList={ploList}
            handleNewClo={handleNewClo}
            setCloDesc={setNewCloDesc}
            setCloId={setNewCloId}
            setCloName={setNewCloName}
          />
        </div>
      )}
    </>
  );
};
export default AssessmentDetails;
