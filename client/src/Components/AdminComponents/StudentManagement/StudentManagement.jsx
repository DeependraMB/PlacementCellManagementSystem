import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  
} from "@mui/x-data-grid";
import { TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Dialog, DialogContent, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StatusButton from "./StatusButton";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    width: "1000px", // Adjust the width as needed
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textField: {
    width: "100%",
  },
  textArea: {
    width: "100%",
    flexGrow: 1, // Fill remaining space
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    margin: "8px",
  },

  heading: {
    paddingLeft: "450px",
    marginTop: "36px",
    color: "blue",
    fontWeight: "bold",
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
  customHeader: {
    backgroundColor: "#ebeae8",
    fontFamily: "bold",
    fontSize: "14px",
    alignItems: "center",
  },

  button: {
    marginLeft: "140px",
  },
}));




export default function StudentManagement({onChange}) {
  const [users, setUsers] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState({});
  const classes = useStyles();
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);

  const columns = [
    {
      field: "serialNumber",
      headerName: "Serial No",
      headerClassName: "custom-header",
      editable: true,
      checkboxSelection: true,
      valueGetter: (params) => params.row.serialNumber || "-",
      width: 80,
    },
    {
      field: "firstname",
      headerName: "First Name",
      rowLength: 30000,
      valueGetter: (params) => params.row.firstname || "-",
      width: 140,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      rowLength: 30000,
      valueGetter: (params) => params.row.lastname || "-",
      width: 100,
    },
    {
      field: "department",
      headerName: "Department",
      rowLength: 30000,
      valueGetter: (params) => params.row.department || "-",
      width: 165,
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
      width: 200,
    },
    {
      field: "mobno",
      headerName: "Mobile No",
      rowLength: 30000,
      valueGetter: (params) => params.row.mobno || "-",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <StatusButton
          status={params.row.status}
          onChange={(status) => handleStatusChange(params.row.email, status)}
        />
      ),
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      rowLength: 30000,
      valueGetter: (params) => params.row.dob || "-",
      width: 120,
    },
    {
      field: "personalemail",
      headerName: "Personal Email",
      rowLength: 30000,
      valueGetter: (params) => params.row.personalemail || "-",
      width: 160,
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
      valueGetter: (params) => params.row.tenthschoolname || "-",
    },
    {
      field: "twelthpercentage",
      headerName: "12th Percentage",
      rowLength: 30000,
      valueGetter: (params) => params.row.twelthpercentage || "-",
    },
    {
      field: "twelthCGPA",
      headerName: "12th CGPA",
      rowLength: 30000,
      valueGetter: (params) => params.row.twelthCGPA || "-",
    },
    {
      field: "twelthboard",
      headerName: "12th Board",
      rowLength: 30000,
      valueGetter: (params) => params.row.twelthboard || "-",
    },
    {
      field: "twelthschoolname",
      headerName: "12th School Name",
      rowLength: 30000,
      valueGetter: (params) => params.row.twelthschoolname || "-",
    },
    {
      field: "ugcoursename",
      headerName: "Undergraduate Course Name",
      rowLength: 30000,
      valueGetter: (params) => params.row.ugcoursename || "-",
    },
    {
      field: "ugpercentage",
      headerName: "Undergraduate Percentage",
      rowLength: 30000,
      valueGetter: (params) => params.row.ugpercentage || "-",
    },
    {
      field: "ugCGPA",
      headerName: "Undergraduate CGPA",
      rowLength: 30000,
      valueGetter: (params) => params.row.ugCGPA || "-",
    },
    {
      field: "ugyearofgraduation",
      headerName: "Undergraduate Year of Graduation",
      rowLength: 30000,
      valueGetter: (params) => params.row.ugyearofgraduation || "-",
    },
    {
      field: "ugcollegename",
      headerName: "Undergraduate College Name",
      rowLength: 30000,
      valueGetter: (params) => params.row.ugcollegename || "-",
    },
    {
      field: "uguniversity",
      headerName: "Undergraduate University",
      rowLength: 30000,
      valueGetter: (params) => params.row.uguniversity || "-",
    },
    {
      field: "mcaaggregateCGPA",
      headerName: "MCA Aggregate CGPA",
      rowLength: 30000,
      valueGetter: (params) => params.row.mcaaggregateCGPA || "-",
    },
    { field: "activearrears", headerName: "Active Arrears", rowLength: 30000 },
    {
      field: "historyofarrears",
      headerName: "History of Arrears",
      rowLength: 30000,
      valueGetter: (params) => params.row.historyofarrears || "-",
    },
    {
      field: "technicalskills",
      headerName: "Technical Skills",
      rowLength: 30000,
      valueGetter: (params) => params.row.technicalskills || "-",
    },
    {
      field: "projects",
      headerName: "Projects",
      rowLength: 30000,
      valueGetter: (params) => params.row.projects || "-",
    },
    {
      field: "githublink",
      headerName: "GitHub Link",
      rowLength: 30000,
      valueGetter: (params) => params.row.githublink || "-",
    },
    {
      field: "linkedinlink",
      headerName: "LinkedIn Link",
      rowLength: 30000,
      valueGetter: (params) => params.row.linkedinlink || "-",
    },
    {
      field: "languagesknown",
      headerName: "Languages Known",
      rowLength: 30000,
      valueGetter: (params) => params.row.languagesknown || "-",
    },
    // Add more fields as needed
  ];

  //Fetching

  const fetchDepartmentName = async (departmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get-department-name/get-department-name/get-department-name/${departmentId}`
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
      const response = await axios.get("http://localhost:5000/get-students/get-students");
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
          ...userEducationData,
          ...userPersonalData,
          ...userSkillsData,
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
    fetchUserAndCombineData();
  }, []);

  const handleStatusChange = async (email, newStatus) => {
    console.log("Updating status for email:", email, "to", newStatus);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/update-student-status/update-student-status",
        {
          email,
          newStatus,
        }
      );
  
      
      fetchUserAndCombineData();
      console.log(`Status updated successfully for user with ID`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getRowId = (row) => row.email;

  //Dialog CLOSE AND OPEN

  const openFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const openSendDialog = () => {
    setSendDialogOpen(true);
  };

  const closeFilterDialog = () => {
    setFilterDialogOpen(false);
  };
  const closeSendDialog = () => {
    setSendDialogOpen(false);
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
        <Button
          variant="outlined"
          color="primary"
          onClick={openSendDialog}
          startIcon={<NotificationsIcon />}
        >
          Send Notifications
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

  // console.log(filteredData);

  // useEffect(() => {
  //   const filteredEmails = filteredData.map((userObj) => userObj.email);

  //   setFilteredEmails(filteredEmails);
  // }, [filter]);

  const emailsData = {
    email: selectedEmails,
  };

  console.log(emailsData);
  const emailsJSON = JSON.stringify(emailsData);

  const handleSendNotification = () => {

    const notificationData = {
      subject,
      message,
    };

    sendEmailsToBackend({
      email: selectedEmails,
      ...notificationData,
    });

    closeSendDialog();
  };

  const sendEmailsToBackend = async (emailsData, notificationDataa) => {
    try {
      const dataToSend = {
        ...emailsData,
        subject,
        message,
      };

      console.log(dataToSend);
      const response = await axios.post(
        "http://localhost:5000/send-notification/send-notification",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Emails sent to the backend:", response.data);
    } catch (error) {
      console.error("Error sending emails to the backend:", error);
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    console.log("Selection Model:", selectionModel);

    const selectedEmails = selectionModel.map((selectedEmail, index) => {
      const userIndex = filteredData.findIndex(
        (user) => user.email === selectedEmail
      );

      console.log(
        `Selected Index ${selectedEmail} (Data Index ${index}${selectedEmail}):`,
        filteredData[userIndex]
      );

      return filteredData[userIndex]?.email;
    });

    console.log("Selected Emails:", selectedEmails);

    setSelectedEmails(selectedEmails);
    console.log("Updated Selected Emails in State:", selectedEmails);
  };


  return (
    <div className="my-5 mx-5">
      <Dialog maxWidth="xl" open={sendDialogOpen} onClose={closeSendDialog}>
        <Typography
          className="mt-3 justify-content-center"
          sx={{ marginLeft: "450px", fontWeight: "bold", fontFamily: "NUNITO" }}
        >
          SEND NOTIFICATION
        </Typography>
        <DialogContent className={classes.dialogContent}>
          {/* <InputLabel htmlFor="subject" className={object.label}>
          Subject
        </InputLabel> */}
          <TextField
            name="subject"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={classes.textField}
          />
          <br />
          {/* <InputLabel htmlFor="message" className={object.label}>
          Message
        </InputLabel> */}
          <TextareaAutosize
            className={`${classes.textArea}`}
            name="message"
            minRows={4}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={classes.buttonContainer}>
            <Button
              onClick={closeSendDialog}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Close
            </Button>
            <Button
              onClick={handleSendNotification}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Send Notification
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
      {/* <Button variant="outlined" color="primary" onClick={sendEmailsToBackend}>
        Send Notification
      </Button> */}
      {filteredData.length > 0 ? (
        <DataGrid
          columns={columns.map((column) => ({
            ...column,
            headerClassName: classes.customHeader,
          }))}
          sx={{ color: "black", fontFamily: "Nunito" }}
          checkboxSelection
          rows={filteredData}
          // columns={columns}
          page={page}
          pageSize={rowsPerPage}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangeRowsPerPage}
          components={{
            Toolbar: CustomToolbar,
          }}
          getRowHeight={(params) => 60}
          style={{ height: "700px", width: "100%" }}
          rowKeyField="email"
          getRowId={(row) => row.email}
          onRowSelectionModelChange={handleSelectionModelChange}
          selectionModel={selectedEmails.map((email) =>
            filteredData.findIndex((user) => user.email === email)
          )}
          renderCell={(params) => (
            <StatusButton
            status={params.row.status}
            email={params.row.email}
            onChange={(status) => handleStatusChange(params.row.email, status)}
          />
          )}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
