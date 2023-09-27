import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
