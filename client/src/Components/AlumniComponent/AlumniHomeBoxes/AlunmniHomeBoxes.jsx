import React from "react";

function AlunmniHomeBoxes() {
  return (
    <div>
      <div class="row mt-4 mt-lg-5 align-items-center" style={{marginLeft: "30px"}}>
        <div class="col-sm-6 col-xxl-3" style={{padding: "10px 10px 10px 10px",margin: ""}}>
          <div class="pxp-dashboard-stats-card bg-primary bg-opacity-10 mb-3 mb-xxl-0">
            <div class="pxp-dashboard-stats-card-icon text-primary">
              <span class="fa fa-file-text-o"></span>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">13</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Job applications
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xxl-3" style={{marginRight: "0px"}}>
          <div class="pxp-dashboard-stats-card bg-success bg-opacity-10 mb-3 mb-xxl-0" style={{marginRight: "50px"}}>
            <div class="pxp-dashboard-stats-card-icon text-success">
              <span class="fa fa-user-circle-o"></span>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">312</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Profile visits
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xxl-3">
          <div class="pxp-dashboard-stats-card bg-warning bg-opacity-10 mb-3 mb-xxl-0" style={{marginRight: "0px"}}>
            <div class="pxp-dashboard-stats-card-icon text-warning">
              <span class="fa fa-envelope-o"></span>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">14</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Unread messages
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xxl-3" style={{marginRight: "0px"}}>
          <div class="pxp-dashboard-stats-card bg-danger bg-opacity-10 mb-3 mb-xxl-0" style={{marginRight: "50px"}}>
            <div class="pxp-dashboard-stats-card-icon text-danger">
              <span class="fa fa-bell-o"></span>
            </div>
            <div class="pxp-dashboard-stats-card-info p-3">
              <div class="pxp-dashboard-stats-card-info-number">5</div>
              <div class="pxp-dashboard-stats-card-info-text pxp-text-light">
                Notifications
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlunmniHomeBoxes;
