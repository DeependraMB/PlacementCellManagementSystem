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
  { id: "department", label: "Department", minWidth: 100 },
  { id: "gender", label: "Gender", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "phno", label: "Mobile No", minWidth: 100 },
];

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const fetchDepartmentName = async (departmentId) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-department-name/${departmentId}`);
      return response.data.departmentName;
    } catch (error) {
      console.error(`Error fetching department name for ID ${departmentId}:`, error);
      return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-teachers");
        const teacherData = response.data.map((teacher, index) => ({
          ...teacher,
          serialNumber: index + 1,
        }));

        const teachersWithDepartmentNames = await Promise.all(
          teacherData.map(async (teacher) => {
            const departmentName = await fetchDepartmentName(teacher.departmentId);
            return { ...teacher, department: departmentName };
          })
        );

        setTeachers(teachersWithDepartmentNames);
      } catch (error) {
        console.error("Error fetching teachers:", error);
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
              {teachers
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
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 25, 100]}
          component="div"
          count={teachers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
