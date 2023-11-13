import React from "react";

function Footer() {
  return (
    <div className="">
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row gap-3">
            <div className="col-md-3">
              <a
                className="d-flex justify-content-center justify-content-md-start"
                href="#"
              >
                {/* <img
                  alt=""
                  loading="lazy"
                  width={141}
                  height={24}
                  decoding="async"
                  data-nimg={1}
                  className=""
                  style={{ color: 'transparent' }}
                  srcSet="/_next/image?url=%2Fimages%2Flogo-light.png&w=256&q=75 1x, /_next/image?url=%2Fimages%2Flogo-light.png&w=384&q=75 2x"
                  src="/_next/image?url=%2Fimages%2Flogo-light.png&w=384&q=75"
                /> */}
              </a>
            </div>
            <div className="col-md-9 justify-content-center">
              <ul className="list-unstyled d-flex justify-content-center justify-content-md-start">
                <li className="me-4">
                  <a className="text-white text-decoration-none">Home</a>
                </li>
                <li className="me-4">
                  <a className="text-white text-decoration-none">
                    How it works
                  </a>
                </li>
                <li className="me-4">
                  <a className="text-white text-decoration-none">
                    Create a job
                  </a>
                </li>
                <li className="me-4">
                  <a className="text-white text-decoration-none">About us</a>
                </li>
                <li>
                  <a className="text-white text-decoration-none">Contact us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="py-3 border-top border-dark">
        <div className="container text-center">
          <p className="mb-0 text-gray-300 font-medium">
            ©{/* */}2023{/* */} CampusNexa. Design &amp; Develop with{" "}
            <i className="mdi mdi-heart text-danger" /> by{" "}
            <a
              target="_blank"
              className="text-reset"
              href="https://shreethemes.in/"
            >
              CampusNexa
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
