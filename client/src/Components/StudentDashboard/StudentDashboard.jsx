import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function StudentDashboard() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const checkData = sessionStorage.getItem("auth");
    if (!checkData) {
      // If not authenticated and no auth data in session storage, redirect to login
      navigate("/signin");
    }
  }, [auth.token, navigate, setAuth]);

  const handleLogout = () => {
    // Clear auth data in session storage
    sessionStorage.removeItem("auth");
  
    // Clear auth state
    setAuth({
      token: "",
      name: null,
      email: null,
      role: null,
      _id: null,
    });
  
    // Redirect to home page
    navigate("/");
  };
  

  return (
    <div className="container mt-7">
      <div className="mt-7">
        <h1 className="mt-7">StudentDashboard</h1>
        <h1 className="mt-7">StudentDashboard</h1>
        <h1 className="mt-7">StudentDashboard</h1>
        <h1 className="mt-7">StudentDashboard</h1>
        <h1 className="mt-7">{auth.name}</h1>
        <h1 className="mt-7">{auth.email}</h1>
        <h1 className="mt-7">{auth._id}</h1>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
