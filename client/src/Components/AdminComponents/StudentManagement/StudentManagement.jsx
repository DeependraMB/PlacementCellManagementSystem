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

const columns = [
  { id: "serialNumber", label: "Serial No", minWidth: 20 },
  { id: "firstname", label: "First Name", minWidth: 100 },
  { id: "lastname", label: "Last Name", minWidth: 100 },
  { id: "department", label: "Department", minWidth: 100 }, // Assuming "department" contains department name
  { id: "gender", label: "Gender", minWidth: 50 },
  { id: "graduationYear", label: "Passout Year", minWidth: 80 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "phno", label: "Mobile No", minWidth: 100 },
];

export default function StudentManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-students");
        console.log(response.data);
        setUsers(
          response.data.map((user, index) => ({ ...user, serialNumber: index + 1 }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

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
                      backgroundColor: "#ffff",
                      zIndex: 100,
                      fontWeight: "bold",
                      backgroundColor: "black",
                      borderRadius: "3px",
                      textAlign: "center",
                      color: "white",
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
                .map((row,index) => (
                  <TableRow
                    key={row.id}
                    style={{
                      border: "1px solid #000",
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} style={{   }}>
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
