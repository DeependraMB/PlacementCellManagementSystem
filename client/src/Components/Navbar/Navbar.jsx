import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Logo/Logo";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);

  // Add a scroll event listener to track scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkStyles = {
    fontSize: "18px",
    fontWeight: "bold",
    color: scrolling ? "#000" : "#fff",

    position: "relative",
  };

  return (
    <div
      className={`container-fluid ${
        scrolling ? "bg-light shadow" : "bg-transparent"
      }`}
    >
      <nav
        className={`navbar navbar-expand-sm ${
          scrolling ? "bg-light" : "bg-transparent"
        } navbar-light py-1 py-lg-3 px-0 px-lg-5 fixed-top`}
      >
        <div>
          <Logo/>
        </div>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <div className="navbar-nav fw-bold mx-auto py-0 ">
            <Link to="/" className="nav-item nav-link fw-bold">
              Home
            </Link>
            <Link to="/" className="nav-item nav-link fw-bold">
              Recruiters
            </Link>
            <Link to="/" className="nav-item nav-link fw-bold">
              Facilities
            </Link>
            <Link to="/" className="nav-item nav-link l fw-bold ">
              <span style={linkStyles}>Announcements</span>
            </Link>
            <Link
              to="/aboutus"
              className="nav-item nav-link l fw-bold"
              style={linkStyles}
            >
              About
            </Link>
            <Link
              to="/"
              className="nav-item nav-link l fw-bold"
              style={linkStyles}
            >
              Contact
            </Link>
          </div>
          <div className="login-buttons">
            <Link to="/signin" className="btn btn-primary px-4 mx-3">
              LogIn
            </Link>
            <Link to="/signup" className="btn btn-primary px-4">
              SignUp
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
