import React, { Component } from "react";
import Slider from "react-slick";
import "./RecruitersRow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IBMImage from "../../Assets/TCS.jpg";
import TCSImage from "../../Assets/IBM.jpg";
import CapgeminiImage from "../../Assets/Wipro.jpg";
import WiproImage from "../../Assets/TCS.jpg";

const imageStyles = {
  width: "270px",
  height: "100px",
  margin: "0 1.5px",
};
const containerStyle = {
  maxWidth: "1200px", // Set the maximum width for the container
  margin: "0 auto", // Center the container horizontally
};

export default class AutoPlayMultipleImages extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    return (
      <div className="container-fluid py-5" style={containerStyle}>
        <div class="section-head center wt-small-separator-outer py-3">
          <div class="wt-small-separator site-text-primary">
            <div className="text-primary" id="head1">
              Top Companies
            </div>
          </div>
          <h2 className="wt-title py-3" id="head2">
            Get hired in top companies
          </h2>
        </div>
        <Slider {...settings}>
          <div className="company-div">
            <img
              style={imageStyles}
              className="company-logo"
              src={IBMImage}
              alt="IBM"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={TCSImage}
              alt="TCS"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={TCSImage}
              alt="TCS"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={TCSImage}
              alt="TCS"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={TCSImage}
              alt="TCS"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={TCSImage}
              alt="TCS"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={TCSImage}
              alt="TCS"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={CapgeminiImage}
              alt="Capgemini"
            />
          </div>
          <div>
            <img
              style={imageStyles}
              className="company-logo"
              src={WiproImage}
              alt="Wipro"
            />
          </div>
        </Slider>
      </div>
    );
  }
}
