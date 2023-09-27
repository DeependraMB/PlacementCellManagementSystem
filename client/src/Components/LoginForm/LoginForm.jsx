// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import "./LoginForm.css";
// import { useState } from "react";



// function LoginForm() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const formData ={
//     email: email,
//     password: password,
//   };

//   function handleSubmit(e) {
//     e.preventDefault();

//     console.log("handlesubmit Login Called");
  
//       axios.post("http://localhost:5001/signin/login", formData)
          
  

//   return (
//     <div >
//       <div className="login-page" style={{paddingTop:"120px"}} >
//         <Container
//           component="main"
          
//           sx={{
//             backgroundColor: "white",
//             margin: "0 0 0 auto",
//             marginTop: "0px",
//             marginRight: "140px",
//             width:"330px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding:"40px",
//             borderRadius: "10px",
//           }}
//         >
//           <CssBaseline />
          
//           <Box
//             sx={{
//               marginTop: 5,
//               marginBottom: 5,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
              
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign In
//             </Typography>
//             <Box component="form" sx={{ mt: 3 }}>
//               <Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="email"
//                     label="Email Adress"
//                     type="email"
//                     id="email"
//                     autoComplete="email"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                   />
//                 </Grid>
//                 <br />
//                 <Grid item xs={12} className="grid-pass">
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//               <Grid container justifyContent="center">
//                 <Grid item className="already">
//                   <Link
//                     to="/home"
//                     sx={{ color: "black", textDecoration: "none" }}
//                   >
//                     Don't have an account?<span> Sign Up </span>
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
