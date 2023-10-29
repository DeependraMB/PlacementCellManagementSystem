import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import StudentHome from "./Pages/StudentHome";
import { useAuth } from "../../client/src/Context/AuthContext";
import { Navigate } from "react-router-dom";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import AdminHome from "./Pages/AdminHome";
import AdminStudentManagePage from "./Pages/AdminStudentManagePage";
import OtpVerification from "./Components/PasswordReset/OtpVerification";
import StudentUpdateProfile from "./Pages/StudentUpdateProfile";
import AddTeacherPage from "./Pages/AdminPages/AddTeacherPage";
import AddTeacherForm from "./Components/AdminComponents/AddTeacherForm/AddTeacherForm";
import TeacherManagePage from "./Pages/AdminPages/TeacherManagePage";

function App() {
  const { auth, setAuth } = useAuth();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/studenthome"
            element={
              auth.token && auth.role === "student" ? (
                <StudentHome />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/adminhome"
            element={
              auth.token && auth.role === "admin" ? (
                <AdminHome />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/student-management"
            element={
              auth.token ? (
                <AdminStudentManagePage />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          {/* <Route path="/adminhome" element={<AdminHome />} /> */}
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/studupdateprofile" element={<StudentUpdateProfile />} />
          <Route
            path="/stud-update-profile"
            element={
              auth.token ? <StudentUpdateProfile /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/add-teacher"
            element={
              auth.token ? <AddTeacherForm /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/teacher-management"
            element={
              auth.token ? <TeacherManagePage /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
