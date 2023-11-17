import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const StatusButton = ({ status, onChange, email }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (newStatus) => {
    setAnchorEl(null);
    onChange(newStatus, email);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define colors based on different statuses
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#4CAF50"; // Green
      case "Placed":
        return "#FFC107"; // Yellow
      case "Blocked":
        return "red"; // Warning color
      case "Inactive":
        return "#9E9E9E"; // Grey
      default:
        return "#2196F3"; // Default color
    }
  };

  return (
    <div>
      <Button
        variant="outlined"  // Set to outlined style
        color="primary"
        onClick={handleButtonClick}
        style={{
          width: 100,
          height: 40,
          borderColor: getStatusColor(status),  // Set to desired color for outlines
          borderRadius: 20,  // Set to desired border radius
          color: getStatusColor(status),  // Set to desired color for text
          borderWidth: 2,
        }}
      >
        {status}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("Active")}
          style={{ color: getStatusColor("Active") }}
        >
          Active
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Placed")}
          style={{ color: getStatusColor("Placed") }}
        >
          Placed
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Blocked")}
          style={{ color: getStatusColor("Blocked") }}
        >
          Blocked
        </MenuItem>
        {/* <MenuItem
          onClick={() => handleMenuItemClick("Inactive")}
          style={{ color: getStatusColor("Inactive") }}
        >
          Inactive
        </MenuItem> */}
      </Menu>
    </div>
  );
};

export default StatusButton;
