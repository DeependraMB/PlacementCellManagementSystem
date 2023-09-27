import React from "react";
import "./FrontPage.css";
import './TypingAnimation';
import TypingAnimation from "./TypingAnimation";

function FrontPage() {
  return (
    <div style={{}}>
      <section
        className="lg:h-screen py-36 relative flex items-center background-effect overflow-hidden bg-no-repeat bg-cover"
        style={{
          height: 660,
          backgroundImage: "url(bg2.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
        }}
      >
        <div>
          <div
            className="absolute inset-0 z-0 bg-top bg-cover"
            style={{
              height: 660,
              backgroundImage: "url(curve-shape.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container-fluid z-1 py-5">
              <div className="grid grid-cols-1 py-5">
                <p
                  className="lg:leading-normal leading-normal mb-0 py-5 text-start px-5 fw-bold"
                  style={{
                    fontSize: "65px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    lineHeight: "1.5", // Adjust line-height as needed, e.g., "1.2" or "1.5"
                    letterSpacing: "-1px",
                  }}
                >
                  Make The Best Move to <br />
                  Choose Your{" "}
                  <span className="text-emerald-600 text-warning">
                    <TypingAnimation text="Future" />
                  </span>
                </p>
                {/* <img
                  src="placement-cell-icon.png" // Replace with the actual image path
                  alt="Placement Cell Services"
                  className="w-20 mt-0 ml-0" // Adjust width and margin as needed
                /> */}
                <p
                  className="text-slate-400 text-lg max-w-xl py-2 ml-0 text-start px-5 fw-bold"
                  style={{
                    fontSize: "25px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    lineHeight: "1.5", 
                    letterSpacing: "-1px",
                    opacity: ".5"
                  }}
                >
                  Explore Job Opportunities,Professional Development &amp;
                  Career Guidance. <br/>Our placement cell has a proven track record
                  of connecting students with outstanding job opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FrontPage;
