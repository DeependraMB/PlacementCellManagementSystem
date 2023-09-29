import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./SignUpForm.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import validationSchema from "../../Helpers/ValidationSchema";

export default function SignUpForm() {
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [uniregno, setUniregno] = useState("");
  const [gender, setGender] = useState("");
  // const [mobno, setMobno] = useState("");
  // const [department, setDepartment] = useState("");
  // const [graduationyear, setGraduationYear] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const formData = {
  //   firstname: firstname,
  //   lastname: lastname,
  //   uniregno: uniregno,
  //   gender: gender,
  //   mobno: mobno,
  //   department: department,
  //   graduationyear: graduationyear,
  //   email: email,
  //   password: password,
  // };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(data, e) {
    e.preventDefault();
    data.role = "student";
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:5000/student/register/register",
        data
      );
      if (res.data && res.data.success) {
        navigate("/signin");
      } else {
        // Handle other conditions if needed
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="signup-page" style={{ paddingTop: "120px" }}>
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
              Sign Up
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
                        autoFocus
                        error={!!errors.firstName}
                        helperText={
                          errors.firstName ? errors.firstName.message : ""
                        }
                        //onChange={(e) => setFirstname(e.target.value)}
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
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete="family-name"
                        error={!!errors.lastName}
                        helperText={
                          errors.lastName ? errors.lastName.message : ""
                        }
                        // onChange={(e) => setLastname(e.target.value)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="uniregno"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="uniregno"
                        label="Uni. Reg. Number"
                        error={!!errors.uniregno}
                        helperText={
                          errors.uniregno ? errors.uniregno.message : ""
                        }
                        // onChange={(e) => setUniregno(e.target.value)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={gender} // Set the default value from the state variable
                    render={({ field }) => (
                      <div>
                        <Select
                          {...field}
                          fullWidth
                          label="Gender"
                          id="gender"
                          error={!!errors.gender}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        {errors.gender && (
                          <Typography variant="caption" color="error">
                            {errors.gender.message}
                          </Typography>
                        )}
                      </div>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="mobno"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="mobno"
                        label="Mobile Number"
                        error={!!errors.mobno}
                        helperText={errors.mobno ? errors.mobno.message : ""}
                        // onChange={(e) => setMobno(e.target.value)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="department"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="department"
                        label="Department"
                        error={!!errors.department}
                        helperText={
                          errors.department ? errors.department.message : ""
                        }
                        // onChange={(e) => setDepartment(e.target.value)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="graduationyear"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="graduationyear"
                        label="Graduation Year"
                        error={!!errors.graduationyear}
                        helperText={
                          errors.graduationyear
                            ? errors.graduationyear.message
                            : ""
                        }
                        // onChange={(e) => setGraduationYear(e.target.value)}
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
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        //  onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
                        }
                        //  onChange={(e) => setPassword(e.target.value)}
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
            <Grid container justifyContent="center">
              <Grid item className="already">
                <Link
                  to="/home"
                  sx={{ color: "black", textDecoration: "none" }}
                >
                  Already have an account?<span> Sign in </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
