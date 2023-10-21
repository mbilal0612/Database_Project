import { useState } from "react";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminHome from "./pages/AdminView/AdminHome";
import Admin from "./pages/AdminView/Admin";
import Student from "./pages/AdminView/Student";
import Guardian from "./pages/AdminView/Guardian";
import Faculty from "./pages/AdminView/Faculty";
import StudentHome from "./pages/StudentView/StudentHome";
import Assignments from "./pages/StudentView/Assignments";
import Attendance from "./pages/StudentView/Attendance";
import Grades from "./pages/StudentView/Grades";
import Schedule from "./pages/StudentView/Schedule";
import GuardianHome from "./pages/GuardianView/GuardianHome";
import Ledger from "./pages/GuardianView/Ledger";
import FacultyHome from "./pages/FacultyView/FacultyHome";
import APCreation from "./pages/FacultyView/APCreation";
import Courses from "./pages/FacultyView/Courses";
import EnterMarks from "./pages/FacultyView/EnterMarks";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  React.useEffect(() => {
    const check = () => {
      const token = sessionStorage.getItem("token");
    
      if (token) return true;
      else return false;
    };
    setisLoggedIn(check);
  }, []);
  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="*" Component={NotFound} />
        </Routes>
      ) : (
        <Routes>
          //routes for admin view
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/Guardian" element={<Guardian />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Faculty" element={<Faculty />} />
          //routes for student view
          <Route path="/StudentHome" element={<StudentHome />} />
          <Route path="/Assignments" element={<Assignments />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Grades" element={<Grades />} />
          <Route path="/Schedule" element={<Schedule />} />
          //routes for guardian view
          <Route path="/GuardianHome" element={<GuardianHome />} />
          <Route path="/Ledger" element={<Ledger />} />
          //routes for faculty view
          <Route path="/FacultyHome" element={<FacultyHome />} />
          <Route path="/APCreation" element={<APCreation />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/EnterMarks" element={<EnterMarks />} />
          //not FOUND
          <Route path="*" Component={NotFound} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
