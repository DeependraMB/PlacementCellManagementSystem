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
import SnackBar from "../../Helpers/SnackBar";
import { toast } from "react-toastify";
import { FormControl, InputLabel } from "@mui/material";

export default function SignUpForm() {
  const [gender, setGender] = useState("");
  // const [open, setOpen] = useState(false);
  // const [handleClose, setHandleClose] = useState("")
  // const [message, setMessage] = useState("");
  // const [severity, setSeverity] = useState("");
  const navigate = useNavigate();

  // function isSetOpen(){
  //     setOpen(true)
  // }

  const {
    handleSubmit,
    control,
    trigger,
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
      if (res.data && res.data.success == true) {
        toast.success(res.data.message);
        navigate("/signin");
      }
      if (res.data && res.data.success == false) {
        toast.info(res.data.message);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* <SnackBar open={open} message="Default Message" severity="success" /> */}
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
                        //autoFocus
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
                  <Controller
                    name="uniregno"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="uniregno"
                        label="Uni. Reg. Number"
                        onBlur={() => trigger("uniregno")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("uniregno");
                        }}
                        error={!!errors.uniregno}
                        helperText={
                          errors.uniregno ? errors.uniregno.message : ""
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
                          field.onChange(e);
                          trigger("deparment");
                        }}
                        error={!!errors.department}
                        helperText={
                          errors.department ? errors.department.message : ""
                        }
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
                        fullWidth
                        id="graduationyear"
                        label="Graduation Year"
                        onBlur={() => trigger("graduationyear")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("graduationyear");
                        }}
                        error={!!errors.graduationyear}
                        helperText={
                          errors.graduationyear
                            ? errors.graduationyear.message
                            : ""
                        }
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
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        onBlur={() => trigger("email")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("email");
                        }}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
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
      {/*  */}
    </div>
  );
}
