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
  import "./LoginForm.css";
  import { useState } from "react";
  import axios from "axios";
  import { NavLink, useNavigate } from "react-router-dom";
  import { useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { useAuth } from "../../Context/AuthContext";
  import { useEffect } from "react";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup.string().required("Password is required"),
  });

  function LoginForm() {
    useEffect(() => {
      const checkData = sessionStorage.getItem("auth");
      if (checkData) {
        
        const authData = JSON.parse(checkData);
        if (authData.role === "student") {
          navigate("/studenthome");
        } else if (authData.role === "admin") {
          navigate("/adminhome");
        } else if(authData.role === "alumni") {
          navigate("/alumnihome");
        }  else if(authData.role === "teacher") {
          navigate("/teacherhome");
        }
      }
    }, []);

    const { auth, setAuth } = useAuth();
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const onSubmit = (formData) => {
      //event.preventDefault();
      try {
        axios
          .post("http://localhost:5000/user/login/login", formData)
          .then((res) => {
            console.log(res.data)
            if (res.data && res.data.success) {
              setAuth({
                ...auth,
                name: res.data.user.name,
                token: res.data.token,
                email: res.data.user.email,
                role: res.data.user.role,
                _id: res.data.user._id,
              });
              sessionStorage.setItem("auth", JSON.stringify(res.data));
              
              if (res.data.user.role === "student") {
                toast.success(res.data.message);
                navigate("/studenthome");
              } else if (res.data.user.role === "admin") {
                navigate("/adminhome");
              } else if (res.data.user.role === "teacher") {
                navigate("/teacherhome")
              } else if (res.data.user.role === "alumni") {
                navigate("/alumnihome")
              }
            } else {
              toast.error(res.data.message)
            }
          });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <div className="login-page" style={{ paddingTop: "120px" }}>
          <Container
            component="main"
            sx={{
              backgroundColor: "white",
              margin: "0 0 0 auto",
              marginTop: "0px",
              marginRight: "140px",
              width: "330px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px",
              borderRadius: "10px",
            }}
          >
            <CssBaseline />

            <Box
              sx={{
                marginTop: 3,
                marginBottom: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <form>
                <Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Email Address"
                          autoComplete="email"
                          error={!!errors.email}
                          helperText={errors.email ? errors.email.message : ""}
                        />
                      )}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} className="grid-pass">
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Password"
                          type="password"
                          autoComplete="new-password"
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
                  type="button"
                  onClick={() => handleSubmit(onSubmit)()}
                  fullWidth
                  variant="contained"
                  className="button1"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item className="already">
                    <NavLink
                      to="/signup"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Don't have an account?<span> Sign Up </span>
                    </NavLink>
                    <NavLink
                      to="/password-reset"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Forget password?<span> Click Here! </span>
                    </NavLink>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </div>
      </div>
    );
  }

  export default LoginForm;
