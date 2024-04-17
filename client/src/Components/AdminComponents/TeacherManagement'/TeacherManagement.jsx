import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "serialNumber", headerName: "Serial No", width: 80 },
  { field: "firstname", headerName: "First Name", width: 100 },
  { field: "lastname", headerName: "Last Name", width: 100 },
  { field: "department", headerName: "Department", width: 200 },
  { field: "gender", headerName: "Gender", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "mobno", headerName: "Mobile No", width: 150 },
];

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-teachers/get-teachers");
        const teacherData = response.data.map(async (teacher, index) => {
          const departmentName = await fetchDepartmentName(teacher.departmentId);
          console.log(departmentName)
          return {
            ...teacher,
            serialNumber: index + 1,
            department: departmentName,
            id: index + 1,
          };
        });
        const resolvedTeacherData = await Promise.all(teacherData);
        setTeachers(resolvedTeacherData);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchData();
  }, []);

  const fetchDepartmentName = async (departmentId) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-department-name/get-department-name/get-department-name/${departmentId}`);
      return response.data.departmentName;
    } catch (error) {
      console.error(`Error fetching department name for ID ${departmentId}:`, error);
      return "";
    }
  };

  const handleChangePage = (params) => {
    setPage(params.page);
  };

  const handleChangePageSize = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", marginTop: "120px" }}>
      <div style={{ height: 500, width: "80%" }}>
        <DataGrid
          rows={teachers}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
}
