import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { validationSchema } from "../../../Helpers/ValidationSchema";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

export default function TeacherAddForm() {
  const { auth } = useAuth();
  const [gender, setGender] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartmentId] = useState(""); // Fix this variable name
  const [email, setEmail] = useState("");
  const [teacher, setTeacher] = useState("");
  const navigate = useNavigate();

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .matches(/^[^\s\d]+$/, "Spaces and numbers are not allowed in first name")
      .matches(/^[A-Za-z]+$/, "First name should only contain letters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .matches(/^[A-Za-z\s]+$/, "Last name should only contain letters")
      .matches(/^\D*$/, "Numbers are not allowed in last name"),
    gender: yup.string().required("Gender is required"),
    mobno: yup
      .string()
      .required("Mobile Number is required")
      .matches(
        /^[1-9]\d{9}$/,
        "Mobile number must be exactly 10 digits and not start with zero"
      )
      .test(
        "no-repeated-digits",
        "Repeated digits are not allowed",
        (value) => {
          const repeatingPattern = /(.)\1{9}/; // Matches repeated digits 10 times
          return !repeatingPattern.test(value);
        }
      )
      .matches(/^\S*$/, "Spaces are not allowed in the mobile number"),
    email: yup
      .string()
      .required("Email address is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      ),
    department: yup.string().required("Department is required"),
    batch: yup.string().required("Batch is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // Fetch department data when the component mounts
    async function fetchDepartments() {
      try {
        const response = await axios.get(
          "http://localhost:5000/departments/departments"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }

    fetchDepartments();

    console.log("Mundalil");
    console.log(auth._id);
    async function fetchTeacherDetails() {
      try {
        const response = await axios.get(
            `http://localhost:5000/get-teacher/${auth._id}`
          );
          
          setTeacher(response.data);
          
      } catch (error) {}
    }

    fetchTeacherDetails()
  }, []); 

  useEffect(() => {
   
    
  }, []); 

 

  

  async function onSubmit(data) {
    data.department = selectedDepartment;
    console.log(data.department);
    data.role = "teacher";
    console.log(data); // Check the data before sending the request
    try {
      const response = await axios.post(
        "http://localhost:5000/teacher/register/register",
        data
      );

      if (response.data && response.data.success === false) {
        toast.error(response.data.message);
      } else if (response.data && response.data.success === true) {
        toast.success(response.data.message);
        navigate("/teacher-list");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <div>
      <div className="add-teacher-page" style={{ paddingTop: "120px" }}>
        <Container
          component="main"
          sx={{
            backgroundColor: "white",
            margin: "0 auto",
            marginTop: "0px",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              marginBottom: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Teacher
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginTop: "25px" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="given-name"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onBlur={() => trigger("firstName")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("firstName");
                        }}
                        error={!!errors.firstName}
                        helperText={
                          errors.firstName ? errors.firstName.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete="family-name"
                        onBlur={() => trigger("lastName")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("lastName");
                        }}
                        error={!!errors.lastName}
                        helperText={
                          errors.lastName ? errors.lastName.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={gender}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="gender"
                          onBlur={() => trigger("gender")}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("gender");
                          }}
                          error={!!errors.gender}
                          fullWidth
                          label="Gender"
                          select // Add select prop to make it a dropdown
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <Typography variant="caption" color="error">
                        {errors.gender.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="mobno"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="mobno"
                        label="Mobile Number"
                        onBlur={() => trigger("mobno")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("mobno");
                        }}
                        error={!!errors.mobno}
                        helperText={errors.mobno ? errors.mobno.message : ""}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""

                    render={({ field }) => (
                      <div className="d-flex">
                        <TextField
                          {...field}
                          fullWidth
                          id="email"
                          label="Email Address"
                          value={email || teacher.email}
                          autoComplete="email"
                          onBlur={() => trigger("email")}
                          onChange={(e) => {
                            field.onChange(e);
                            setEmail(e.target.value);
                            trigger("email");
                          }}
                          error={!!errors.email}
                          helperText={errors.email ? errors.email.message : ""}
                        />
                      </div>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <Controller
                      name="department"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="department"
                          label="Department"
                          onBlur={() => trigger("department")}
                          onChange={(e) => {
                            setSelectedDepartmentId(e.target.value);

                            // Set the selected department ID as the value
                            field.onChange(e.target.value);
                            trigger("department");
                          }}
                          error={!!errors.department}
                          helperText={
                            errors.department ? errors.department.message : ""
                          }
                          select
                        >
                          {departments.map((department) => (
                            <MenuItem
                              key={department._id}
                              value={department.departmentId}
                            >
                              {department.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="batch">Batch</InputLabel>
                    <Controller
                      name="batch"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="batch"
                          onBlur={() => trigger("batch")}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("batch");
                          }}
                          error={!!errors.batch}
                          fullWidth
                          label="Batch"
                          select
                        >
                          <MenuItem value="A">Div A</MenuItem>
                          <MenuItem value="B">Div B</MenuItem>
                          <MenuItem value="C">Div C</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.batch && (
                      <Typography variant="caption" color="error">
                        {errors.batch.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        onBlur={() => trigger("password")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("password");
                        }}
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Container>
      </div>
    </div>
  );
}
