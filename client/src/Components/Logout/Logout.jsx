import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Logout({ varient }) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  
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
        <button
          className={`logOut btn btn-outline-${varient} my-2 my-sm-0`}
          type="button"
          onClick={handleLogout}
          
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
