import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Dialog, DialogContent, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const useStyles = makeStyles((theme) => ({
  filterTextField: {
    marginRight: "8px",
    marginBottom: "20px", // Adjust the margin as needed
  },
  customToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "10px",
    "& .MuiButton-root": {
      border: "none", // Remove the button border
    },
    "& .MuiButton-startIcon": {
      marginRight: "8px", // Add some space between the icon and text
    },
  },
  dialogContent: {
    marginLeft: "50px",
    alignItems: "center",
  },
  filterTextField: {
    marginBottom: "20px",
    marginLeft: "10px",
  },
  button: {
    marginLeft: "140px",
  },
}));

const columns = [
  {
    field: "serialNumber",
    headerName: "Serial No",
    editable: true,
    checkboxSelection: true, // Add this line for checkboxes
    valueGetter: (params) => params.row.serialNumber || "-",
  },
  {
    field: "firstname",
    headerName: "First Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.firstname || "-",
  },
  {
    field: "lastname",
    headerName: "Last Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.lastname || "-",
  },
  {
    field: "department",
    headerName: "Department",
    rowLength: 30000,
    valueGetter: (params) => params.row.department || "-",
  },
  {
    field: "gender",
    headerName: "Gender",
    rowLength: 30000,
    valueGetter: (params) => params.row.gender || "-",
  },
  {
    field: "graduationYear",
    headerName: "Passout Year",
    rowLength: 30000,
    valueGetter: (params) => params.row.graduationYear || "-",
  },
  {
    field: "email",
    headerName: "Email",
    rowLength: 30000,
    valueGetter: (params) => params.row.email || "-",
  },
  {
    field: "mobno",
    headerName: "Mobile No",
    rowLength: 30000,
    valueGetter: (params) => params.row.mobno || "-",
  },
  {
    field: "dob",
    headerName: "Date of Birth",
    rowLength: 30000,
    valueGetter: (params) => params.row.dob || "-",
  },
  {
    field: "personalemail",
    headerName: "Personal Email",
    rowLength: 30000,
    valueGetter: (params) => params.row.personalemail || "-",
  },
  {
    field: "fathername",
    headerName: "Father's Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.fathername || "-",
  },
  {
    field: "mothername",
    headerName: "Mother's Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.mothername || "-",
  },
  {
    field: "housename",
    headerName: "House Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.housename || "-",
  },
  {
    field: "postoffice",
    headerName: "Post Office",
    rowLength: 30000,
    valueGetter: (params) => params.row.postoffice || "-",
  },
  {
    field: "city",
    headerName: "City",
    rowLength: 30000,
    valueGetter: (params) => params.row.city || "-",
  },
  {
    field: "state",
    headerName: "State",
    rowLength: 30000,
    valueGetter: (params) => params.row.state || "-",
  },
  {
    field: "pincode",
    headerName: "Pincode",
    rowLength: 30000,
    valueGetter: (params) => params.row.pincode || "-",
  },
  {
    field: "nationality",
    headerName: "Nationality",
    rowLength: 30000,
    valueGetter: (params) => params.row.nationality || "-",
  },
  {
    field: "tenthpercentage",
    headerName: "10th Percentage",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthpercentage || "-",
  },
  {
    field: "tenthCGPA",
    headerName: "10th CGPA",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthCGPA || "-",
  },
  {
    field: "tenthboard",
    headerName: "10th Board",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "tenthschoolname",
    headerName: "10th School Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "twelthpercentage",
    headerName: "12th Percentage",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "twelthCGPA",
    headerName: "12th CGPA",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "twelthboard",
    headerName: "12th Board",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "twelthschoolname",
    headerName: "12th School Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "ugcoursename",
    headerName: "Undergraduate Course Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "ugpercentage",
    headerName: "Undergraduate Percentage",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "ugCGPA",
    headerName: "Undergraduate CGPA",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "ugyearofgraduation",
    headerName: "Undergraduate Year of Graduation",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "ugcollegename",
    headerName: "Undergraduate College Name",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "uguniversity",
    headerName: "Undergraduate University",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "mcaaggregateCGPA",
    headerName: "MCA Aggregate CGPA",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  { field: "activearrears", headerName: "Active Arrears", rowLength: 30000 },
  {
    field: "historyofarrears",
    headerName: "History of Arrears",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "technicalskills",
    headerName: "Technical Skills",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "projects",
    headerName: "Projects",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "githublink",
    headerName: "GitHub Link",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "linkedinlink",
    headerName: "LinkedIn Link",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  {
    field: "languagesknown",
    headerName: "Languages Known",
    rowLength: 30000,
    valueGetter: (params) => params.row.tenthboard || "-",
  },
  // Add more fields as needed
];

export default function StudentManagement() {
  const [users, setUsers] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState({});
  const classes = useStyles();
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const fetchDepartmentName = async (departmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get-department-name/${departmentId}`
      );
      return response.data.departmentName;
    } catch (error) {
      console.error(
        `Error fetching department name for ID ${departmentId}:`,
        error
      );
      return "";
    }
  };

  const fetchPersonalData = async () => {
    try {
      const personalResponse = await axios.get(
        "http://localhost:5000/get-personal-details/get-personal-details"
      );
      const personalData = personalResponse.data;
      setPersonal(personalData);
      console.log(personalData);
    } catch (error) {
      console.error("Error fetching personal data:", error);
    }
  };

  const fetchEducationData = async () => {
    try {
      const educationResponse = await axios.get(
        "http://localhost:5000/get-education-details/get-education-details"
      );
      const educationData = educationResponse.data;
      setEducation(educationData);
    } catch (error) {
      console.error("Error fetching education data:", error);
    }
  };

  const fetchSkillsData = async () => {
    try {
      const skillsResponse = await axios.get(
        "http://localhost:5000/get-skills-details/get-skills-details"
      );
      const skillsData = skillsResponse.data;
      setSkills(skillsData);
    } catch (error) {
      console.error("Error fetching skills data:", error);
    }
  };

  const fetchUserAndCombineData = async () => {
    try {
      // Fetch data from personal
      const personalResponse = await axios.get(
        "http://localhost:5000/get-personal-details/get-personal-details"
      );
      const personalData = personalResponse.data;
      console.log(personalData);

      // Fetch data from education
      const educationResponse = await axios.get(
        "http://localhost:5000/get-education-details/get-education-details"
      );
      const educationData = educationResponse.data;
      console.log(educationData);

      // Fetch data from skills
      const skillsResponse = await axios.get(
        "http://localhost:5000/get-skills-details/get-skills-details"
      );
      const skillsData = skillsResponse.data;

      // Fetch users and combine data
      const response = await axios.get("http://localhost:5000/get-students");
      const usersData = response.data.map((user, index) => {
        const userEducationData =
          educationData.find((education) => education.email === user.email) ||
          {};
        const userSkillsData =
          skillsData.find((skills) => skills.email === user.email) || {};
        const userPersonalData =
          personalData.find((personal) => personal.email === user.email) || {};
        return {
          ...user,
          serialNumber: index + 1,
          // dob: personalData[index] ? personalData[index].dob : "-",
          // personalemail: personalData[index]
          //   ? personalData[index].personalemail
          //   : "-",
          // fathername: personalData[index] ? personalData[index].fathername : "-",
          // mothername: personalData[index] ? personalData[index].mothername : "-",
          // housename: personalData[index] ? personalData[index].housename : "-",
          // postoffice: personalData[index] ? personalData[index].postoffice : "-",
          // city: personalData[index] ? personalData[index].city : "-",
          // state: personalData[index] ? personalData[index].state : "-",
          // pincode: personalData[index] ? personalData[index].pincode : "-",
          // nationality: personalData[index] ? personalData[index].nationality : "-",
          // tenthpercentage: educationData[index]
          //   ? educationData[index].tenthpercentage
          //   : "-",
          // tenthCGPA: educationData[index] ? educationData[index].tenthCGPA : "-",
          // tenthboard: educationData[index] ? educationData[index].tenthboard : "-",
          // tenthschoolname: educationData[index]
          //   ? educationData[index].tenthschoolname
          //   : "-",
          // twelthpercentage: educationData[index]
          //   ? educationData[index].twelthpercentage
          //   : "-",
          // twelthCGPA: educationData[index] ? educationData[index].twelthCGPA : "-",
          // twelthboard: educationData[index]
          //   ? educationData[index].twelthboard
          //   : "-",
          // twelthschoolname: educationData[index]
          //   ? educationData[index].twelthschoolname
          //   : "-",
          // ugcoursename: educationData[index]
          //   ? educationData[index].ugcoursename
          //   : "-",
          // ugpercentage: educationData[index]
          //   ? educationData[index].ugpercentage
          //   : "-",
          // ugCGPA: educationData[index] ? educationData[index].ugCGPA : "-",
          // ugyearofgraduation: educationData[index]
          //   ? educationData[index].ugyearofgraduation
          //   : "-",
          // ugcollegename: educationData[index]
          //   ? educationData[index].ugcollegename
          //   : "-",
          // uguniversity: educationData[index]
          //   ? educationData[index].uguniversity
          //   : "-",
          // mcaaggregateCGPA: educationData[index]
          //   ? educationData[index].mcaaggregateCGPA
          //   : "-",
          // activearrears: educationData[index]
          //   ? educationData[index].activearrears
          //   : "-",
          // historyofarrears: educationData[index]
          //   ? educationData[index].historyofarrears
          //   : "-",
          // technicalskills: skillsData[index]
          //   ? skillsData[index].technicalskills
          //   : "-",
          // projects: skillsData[index] ? skillsData[index].projects : "-",
          // githublink: skillsData[index] ? skillsData[index].githublink : "-",
          // linkedinlink: skillsData[index] ? skillsData[index].linkedinlink : "-",
          // languagesknown: skillsData[index]
          //   ? skillsData[index].languagesknown
          //   : "-",
          ...userEducationData,
          ...userPersonalData,
          ...userSkillsData,
          // Add more properties from skills, education, and personal data as needed
        };
      });

      const usersWithDepartmentNames = await Promise.all(
        usersData.map(async (user) => {
          const departmentName = await fetchDepartmentName(user.departmentId);
          return { ...user, department: departmentName };
        })
      );

      setUsers(usersWithDepartmentNames);
    } catch (error) {
      console.error("Error fetching and combining data:", error);
    }
  };

  console.log(users);

  useEffect(() => {
    // Fetch all data sources
    fetchUserAndCombineData();
    // fetchPersonalData();
    // fetchEducationData();
    // fetchSkillsData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getRowId = (row) => row.email;

  console.log("users:", users);
  console.log("page:", page);
  console.log("rowsPerPage:", rowsPerPage);

  const openFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const closeFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className={classes.customToolbar}>
        <GridToolbar sx={{}} />
        <Button
          variant="outlined"
          color="primary"
          onClick={openFilterDialog}
          startIcon={<FilterListIcon />}
        >
          Filters
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleInputChange = (event) => {
    console.log(event);
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  console.log(filter);

  const filteredData = users.filter((userObj) => {
    return Object.keys(filter)?.every((key) => {
      const filterValue = (filter[key] || "").toLowerCase();

      if (!filterValue) {
        return true;
      }

      if (
        key === "tenthpercentage" ||
        key === "twelthpercentage" ||
        key === "ugpercentage"
      ) {
        return Number(userObj[key] || 0) >= Number(filterValue);
      }

      return (userObj[key] || "").toLowerCase().includes(filterValue);
    });
  });

  return (
    <div className="my-5 mx-5">
      <Dialog open={filterDialogOpen} onClose={closeFilterDialog}>
        <DialogContent className={classes.dialogContent}>
          <TextField
            onChange={handleInputChange}
            name="firstname"
            className={classes.filterTextField}
            label="Filter Firstname"
          />
          <TextField
            onChange={handleInputChange}
            name="lastname"
            className={classes.filterTextField}
            label="Filter Lastname"
          />
          <TextField
            onChange={handleInputChange}
            name="department"
            className={classes.filterTextField}
            label="Filter Department"
          />
          <TextField
            onChange={handleInputChange}
            name="tenthpercentage"
            className={classes.filterTextField}
            label="Filter 10th %"
            type="number"
          />
          <TextField
            onChange={handleInputChange}
            name="tenthCGPA"
            className={classes.filterTextField}
            label="Filter 10th CGPA"
          />
          <TextField
            onChange={handleInputChange}
            name="twelthpercentage"
            className={classes.filterTextField}
            label="Filter 12th %"
          />
          <TextField
            onChange={handleInputChange}
            name="twelthCGPA"
            className={classes.filterTextField}
            label="Filter twelthe CGPA"
          />
          <TextField
            onChange={handleInputChange}
            name="ugCGPA"
            className={classes.filterTextField}
            label="Filter UG CGPA"
          />
          <TextField
            onChange={handleInputChange}
            name="mcaaggregateCGPA"
            className={classes.filterTextField}
            label="MCA CGPA"
          />
          <TextField
            onChange={handleInputChange}
            name="activearrears"
            className={classes.filterTextField}
            label="Active Arrears"
          />
          <Button
            onClick={closeFilterDialog}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Apply Filters
          </Button>
        </DialogContent>
      </Dialog>
      {filteredData.length > 0 ? (
        <DataGrid
          sx={{ color: "black" }}
          checkboxSelection
          rows={filteredData}
          columns={columns}
          page={page}
          pageSize={rowsPerPage}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangeRowsPerPage}
          components={{
            Toolbar: CustomToolbar,
          }}
          getRowHeight={(params) => 60}
          style={{ height: "500px", width: "100%" }}
          rowKeyField="email"
          getRowId={(row) => row.email}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
