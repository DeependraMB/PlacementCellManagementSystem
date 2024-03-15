import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logo from "../../Logo/Logo";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Avatar from "@mui/material/Avatar";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./AlumniDash.css";
import Logout from "../../Logout/Logout";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WorkIcon from "@mui/icons-material/Work";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { deepPurple } from "@mui/material/colors";
import { Grid, Tooltip } from "@mui/material";
import { useTheme } from "@emotion/react";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ForumIcon from "@mui/icons-material/Forum";


const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "close",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function AlumniDash(props) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const checkData = sessionStorage.getItem("auth");
    if (!checkData) {
      navigate("/signin");
    }
  }, [auth.token, navigate, setAuth]);

  return (
    //<ThemeProvider theme={theme}>

    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="absolute" open={open} className="bg-white ">
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  edge="start"
                  color="dark"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Logo />
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // [theme.breakpoints.down("md")]: {
                  //   marginLeft: "auto", // Move to the right when screen size is below medium
                  // },
                }}
              >
                <NotificationsIcon
                  sx={{
                    color: "black",
                    width: 35,
                    height: 35,
                    "& .css-110b6rr-MuiSvgIcon-root": {
                      fontSize: "30 ",
                      justifyContent: "space-around",
                    },
                  }}
                />
                <div
                  className="avatar-menu"
                  style={{ marginRight: "5px", marginLeft: "5px" }}
                >
                  <Avatar sx={{ bgcolor: deepPurple[500] }} className="avatar">
                    {auth.name}
                  </Avatar>
                </div>
                {auth.name ? <Logout varient="dark" /> : ""}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",

            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Scrollbar style={{ height: "90vh", overflowX: "hidden" }}>
          <List component="nav">
            <NavLink to="/alumnihome" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/jobsharing" className="nav-link" name="nav-link-share-jobs">
              <ListItemButton>
                <ListItemIcon>
                  <HomeRepairServiceIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Share Jobs" />
              </ListItemButton>
            </NavLink>

            {/* <NavLink to="/teacher-exam-list" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                 
                </ListItemIcon>
                <ListItemText primary="Mock Aptitude Conduct" />
              </ListItemButton>
            </NavLink> */}

            {/* <NavLink to="/teacher-view-profile" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <RecordVoiceOverIcon />
                </ListItemIcon>
                <ListItemText primary="Profile Setting" />
              </ListItemButton>
            </NavLink> */}

            <NavLink
              to="/teacher-change-password"
              className="nav-link"
              name="nav-link-change-password"
            >
              <ListItemButton>
                <ListItemIcon>
                  <LockOutlined />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/alumni-feedback-form" className="nav-link">
              <Tooltip title="Feedback" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Feedback"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            {/* <NavLink to="/review-aptitude-tests" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Review Aptitude Tests" />
              </ListItemButton>
            </NavLink> */}

            <NavLink to="/shared-jobs" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Shared Jobs" />
              </ListItemButton>
            </NavLink>

            <NavLink
              to="/notes-shared"
              className="nav-link"
              name="nav-link-upload-notes"
            >
              <ListItemButton>
                <ListItemIcon>
                  <LibraryBooksIcon /> {/* Use the appropriate icon */}
                </ListItemIcon>
                <ListItemText primary="Notes Share" />
              </ListItemButton>
            </NavLink>

            {/* <NavLink to="/notes-share" className="nav-link" name="nav-link-upload-notes">
              <ListItemButton>
                <ListItemIcon>
                  <LibraryBooksIcon /> 
                </ListItemIcon>
                <ListItemText primary="Notes Share" />
              </ListItemButton>
            </NavLink> */}

            <NavLink to="/alumni-chat-room" className="nav-link">
              <Tooltip title="Chatroom" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <ForumIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Chatroom"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>
          </List>
        </Scrollbar>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
    //</ThemeProvider>
  );
}
