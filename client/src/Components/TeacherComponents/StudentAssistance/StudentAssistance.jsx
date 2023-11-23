import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";

const columns = [
  // { id: "serialNumber", label: "Serial No", minWidth: 20 },
  { id: "firstname", label: "First Name", minWidth: 100 },
  { id: "lastname", label: "Last Name", minWidth: 100 },
  // { id: "department", label: "Department", minWidth: 100 },
  { id: "gender", label: "Gender", minWidth: 50 },
  { id: "graduationYear", label: "Passout Year", minWidth: 80 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "mobno", label: "Mobile No", minWidth: 100 },
];

export default function StudentAssistance() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { auth } = useAuth();
  const [teacherData, setTeacherData] = useState({});

  useEffect(() => {
    const userId = auth._id;

    axios
      .get(`http://localhost:5000/get-user-byid/get-user-byid/get-user-byid/${userId}`)
      .then((response) => {
        setTeacherData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });

    axios
      .get("http://localhost:5000/get-students//get-students")
      .then((response) => {
        // Filter students based on your criteria (e.g., department and batch)
        
        const filteredUsers = response.data.filter(
          (users) =>
            users.departmentId === teacherData.departmentId && users.batch === teacherData.batch
        );
        console.log(filteredUsers);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [auth, teacherData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="my-5 mx-5">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 720 }}>
          <Table stickyHeader aria-label="sticky table" sx={{ borderRadius: "8px" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#defcfb",
                      zIndex: 100,
                      fontWeight: "bold",
                      border: "2px solid #000",
                      borderRadius: "3px",
                      textAlign: "center",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    style={{
                      border: "1px solid #000",
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} style={{ border: "1px solid #000" }}>
                        {column.id === "department" ? row.department : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
