import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Navbar/Navbar2";
import { toast } from "react-toastify";

// Define the validation schema for the email address
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
});

function PasswordReset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Use useForm with yupResolver and the validation schema
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/reset-password/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.success === false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          navigate("/otp-verification");
        }
      } else {
        toast.error("Failed to send the request.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="login-page" style={{ paddingTop: "120px" }}>
        <Container
          component="main"
          sx={{
            backgroundColor: "white",
            marginTop: "0px",
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
            <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
              Reset Password
            </Typography>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <Grid sx={{ marginTop: 3 }}>
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
                        value={email}
                        onChange={(e) => {
                          field.onChange(e);
                          setEmail(e.target.value);
                        }}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
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
                Send
              </Button>
            </form>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default PasswordReset;
