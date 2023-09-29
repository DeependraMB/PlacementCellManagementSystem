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
import Checker from "./Pages/Checker";


function App() {
  const { auth, setAuth } = useAuth();
  return (
    <div className="App">
      <Router>
        {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/studenthome"
            element={
              auth.token ? (
                <StudentHome />
              ) : (
                // Redirect to login if not authenticated
                <Navigate to="/signin" />
              )
            }
          />
          <Route path="/checker" element={<Checker />} />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </div>
  );
}

export default App;
