import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../Context/AuthContext";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  TablePagination,
} from "@mui/material";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { auth, setAuth } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        // Replace with your actual API endpoint
        `http://localhost:5000/send-notification/received-notifications/${auth.email}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ margin: "20px 20px 20px 20px", maxHeight: "100" }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            paddingBottom: "30px",
            marginTop: "10px",
            paddingTop: "30px",
            bgcolor: "grey",
            fontWeight: "bolder",
          }}
        >
          All Notifications
        </Typography>
        <Divider sx={{ borderTop: "1px solid #000" }} />
        <TableContainer>
          <Table>
            
            <TableBody>
              {(rowsPerPage > 0
                ? notifications.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : notifications
              ).map((notification, index) => (
                <React.Fragment key={notification._id}>
                  <TableRow>
                    <TableCell>
                      <strong>{notification.subject}</strong>
                    </TableCell>
                    <TableCell>{notification.message}</TableCell>
                  </TableRow>
                  {index !== rowsPerPage - 1 && <Divider />}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={notifications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default NotificationsPage;
