import React from "react";

function Features() {
  return (
    <div className="container-fluid py-5" data-wow-delay="0.1s">
      <div className="container py-3">
        <div
          className="section-title text-center position-relative pb-5 mb-0 mx-auto"
          style={{ maxWidth: 600 }}
        >
          <h5 className="fw-bold text-primary text-uppercase">Our Services</h5>
          <h1 className="mb-0">
            Our Comprehensive Services for Career Success
          </h1>
        </div>
        <div className="row g-5">
          <div
            className="col-lg-4 col-md-6 animated bounce infinite"
            data-wow-delay="0.3s"
          >
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center p-5">
              <h4 className="mb-3">Professional Guidance:</h4>
              <p className="m-0">
                Our dedicated team of career experts and industry professionals
                is committed to providing you with personalized guidance and
                mentorship. From resume building to interview preparation, we'll
                help you navigate the job market with confidence.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 " data-wow-delay="0.6s">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center p-5">
              <h4 className="mb-3">Skill Enhancement Workshops:</h4>
              <p className="m-0">
                Stay ahead of the curve with our comprehensive workshops that
                cover emerging trends and technologies. From coding bootcamps to
                leadership seminars, we equip you with the skills employers are
                seeking.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-wow-delay="0.9s">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center p-5">
              <h4 className="mb-3">Soft Skills Training</h4>
              <p className="m-0">
                Enhance students' soft skills, including communication,
                teamwork, and problem-solving, which are crucial for succeeding
                in the professional world.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-wow-delay="0.3s">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center p-5">
              <h4 className="mb-3">Industry Insights:</h4>
              <p className="m-0">
                Get a firsthand look at different industries with our panel
                discussions and guest speaker series. Industry leaders share
                their experiences, giving you insights into the current job
                market and career paths.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6" data-wow-delay="0.6s">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center p-5">
              <h4 className="mb-3">Placement Drive Coordination</h4>
              <p className="m-0">
                Streamline the logistics of placement drives, ensuring a smooth
                process for both students and recruiters.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 " data-wow-delay="0.9s">
            <div className="position-relative bg-primary rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-3">
              <h3 className="text-white mb-3">Call Us For Quote</h3>
              <p className="text-white mb-3">
                Clita ipsum magna kasd rebum at ipsum amet dolor justo dolor est
                magna stet eirmod
              </p>
              <h2 className="text-white mb-0">+012 345 6789</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
