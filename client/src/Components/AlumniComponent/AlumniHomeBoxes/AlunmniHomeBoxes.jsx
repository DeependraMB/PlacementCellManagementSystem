import React from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";

function AlunmniHomeBoxes() {
  return (
    <div>
      <div
        class="row mt-4 mt-lg-5 align-items-center"
        style={{ marginLeft: "30px" }}
      >
        <div
          class="col-sm-6 col-xxl-3"
          style={{ padding: "10px 10px 10px 10px", margin: "" }}
        >
          <div class="pxp-dashboard-stats-card bg-primary bg-opacity-10 mb-3 mb-xxl-0">
            <div
              style={{ float: "left", paddingLeft: "10px", paddingTop: "10px" }}
            >
              <div
                class="pxp-dashboard-stats-card-icon-container"
                style={{ fontSize: "0px" }}
              >
                <EngineeringIcon />
              </div>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">7</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Job Shares
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xxl-3" style={{ marginRight: "0px" }}>
          <div
            class="pxp-dashboard-stats-card bg-success bg-opacity-10 mb-3 mb-xxl-0"
            style={{ marginRight: "50px" }}
          >
            <div class="pxp-dashboard-stats-card-icon text-success">
              <span class="fa fa-briefcase"></span>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">25</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Total Jobs
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xxl-3">
          <div
            class="pxp-dashboard-stats-card bg-warning bg-opacity-10 mb-3 mb-xxl-0"
            style={{ marginRight: "0px" }}
          >
            <div class="pxp-dashboard-stats-card-icon text-warning">
              <span class="fa fa-user"></span>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">45</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Profile Views
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xxl-3" style={{ marginRight: "0px" }}>
          <div
            class="pxp-dashboard-stats-card bg-danger bg-opacity-10 mb-3 mb-xxl-0"
            style={{ marginRight: "50px" }}
          >
            <div class="pxp-dashboard-stats-card-icon text-danger">
              <span class="fa fa-comments"></span>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">8</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Unread Messages
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlunmniHomeBoxes;
