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
import AddAlumniPage from "./Pages/AdminPages/AddAlumniPage";
import TeacherManagePage from "./Pages/AdminPages/TeacherManagePage";
import TeacherHome from "../src/Pages/TeacherPages/TeacherHome";
import StudentAssistancePage from "../src/Pages/TeacherPages/StudentAssistancePage";
import NotesManagementPage from "./Pages/AdminPages/NotesManagementPage";
import NotesShare from "./Pages/TeacherPages/NotesShare";
import NotesShareForm from "./Pages/TeacherPages/NotesShareForm";
import NotesMaterial from "./Components/StudentComponents/NotesMaterial/NotesMaterial";
import NotesMaterialPage from "./Pages/StudentPages/NotesMaterialPage";
import UpdateTeacherProfile from "./Pages/TeacherPages/UpdateTeacherProfile";
import ViewProfilePage from "./Pages/TeacherPages/ViewProfilePage";
import ChangePasswordPage from "./Pages/TeacherPages/ChangePasswordPage";
import StudentNotificationPage from "./Pages/StudentPages/StudentNotificationPage";
import ExamListPage from "./Pages/TeacherPages/ExamListPage";
import CreateExamPage from "./Pages/TeacherPages/CreateExamPage";
import StudentExamListPage from "./Pages/StudentPages/ExamListPage";
import ConductExamPage from "./Pages/StudentPages/ConductExamPage";
import StudentExamResultPage from "./Pages/StudentPages/StudentExamResultPage";
import AboutUsPage from "./Pages/AboutUsPage";
import AlumniHome from "./Pages/AlumniPages/AlumniHome";
import JobSharingPage from "./Pages/AlumniPages/JobSharingPage";

function App() {
  const { auth, setAuth } = useAuth();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
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
            path="/alumnihome"
            element={
              auth.token && auth.role === "alumni" ? (
                <AlumniHome />
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
          <Route
            path="/studentupdateprofile"
            element={
              auth.token ? <StudentUpdateProfile /> : <Navigate to="/signin" />
            }
          />

          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/otp-verification" element={<OtpVerification />} />

          <Route
            path="/stud-update-profile"
            element={
              auth.token ? <StudentUpdateProfile /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/add-teacher"
            element={
              auth.token ? <AddTeacherPage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/add-alumni"
            element={auth.token ? <AddAlumniPage /> : <Navigate to="/signin" />}
          />
          <Route
            path="/teacher-management"
            element={
              auth.token ? <TeacherManagePage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/teacherhome"
            element={auth.token ? <TeacherHome /> : <Navigate to="/signin" />}
          />
          <Route
            path="/student-assistance"
            element={
              auth.token ? <StudentAssistancePage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/notes-management"
            element={
              auth.token ? <NotesManagementPage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/notes-share"
            element={auth.token ? <NotesShare /> : <Navigate to="/signin" />}
          />

          <Route
            path="/notes-share-form"
            element={
              auth.token ? <NotesShareForm /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/notes-material"
            element={
              auth.token ? <NotesMaterialPage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/teacher-update-profile"
            element={
              auth.token ? <UpdateTeacherProfile /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/teacher-view-profile"
            element={
              auth.token ? <ViewProfilePage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/teacher-change-password"
            element={
              auth.token ? <ChangePasswordPage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/student-notifications"
            element={
              auth.token ? (
                <StudentNotificationPage />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          <Route
            path="/teacher-exam-list"
            element={auth.token ? <ExamListPage /> : <Navigate to="/signin" />}
          />
          <Route
            path="/create-exam"
            element={
              auth.token ? <CreateExamPage /> : <Navigate to="/signin" />
            }
          />

          <Route
            path="/student-exam-list"
            element={
              auth.token ? <StudentExamListPage /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/conduct-exam/:examId"
            element={
              auth.token ? <ConductExamPage /> : <Navigate to="/signin" />
            }
          />

          <Route
            path="/result/:examId"
            element={
              auth.token ? <StudentExamResultPage /> : <Navigate to="/signin" />
            }
          />

          {/* ALUMNI ROUTES */}{/* ALUMNI ROUTES */}{/* ALUMNI ROUTES */}{/* ALUMNI ROUTES */}
          <Route
            path="/jobsharing"
            element={
              auth.token ? <JobSharingPage /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
