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
import "./TeacherDash.css";
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

export default function TeacherDash(props) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = React.useState(false);
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            <div className="" style={{ paddingLeft: "162px" }}>
              <List
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "5px",
                  color: "black",
                }}
              >
                <ListItem button component={Link} href="/">
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} href="/">
                  <ListItemText primary="Recruiters" />
                </ListItem>
                <ListItem button component={Link} href="/">
                  <ListItemText primary="Facilities" />
                </ListItem>
                <ListItem button component={Link} href="/">
                  <ListItemText primary="Announcements" />
                </ListItem>
                <ListItem button component={Link} href="/">
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={Link} href="/">
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </div>
            {/* <div>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
            </div> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "45px",
                justifyContent: "space-between",
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
                <Avatar className="avatar">{auth.name.slice(0, 1)}</Avatar>
              </div>
              {auth.name ? <Logout varient="primary" /> : ""}
            </div>
          </Box>
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
            <NavLink to="/student-assistance" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIndIcon />{" "}
                  {/* You can use the appropriate Material-UI icon */}
                </ListItemIcon>
                <ListItemText primary="Student Assistance" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/mock-aptitude-conduct" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <RecordVoiceOverIcon /> {/* Use the appropriate icon */}
                </ListItemIcon>
                <ListItemText primary="Mock Aptitude Conduct" />
              </ListItemButton>
            </NavLink>

            {/* <NavLink to="/support-and-training" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Support and Training" />
              </ListItemButton>
            </NavLink> */}

            <NavLink to="/review-aptitude-tests" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <AssessmentIcon /> {/* Use the appropriate icon */}
                </ListItemIcon>
                <ListItemText primary="Review Aptitude Tests" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/placement-workshop-facilitation" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <WorkIcon /> {/* Use the appropriate icon */}
                </ListItemIcon>
                <ListItemText primary="Workshop Facilitation" />
              </ListItemButton>
            </NavLink>

            <NavLink to="/notes-share" className="nav-link">
              <ListItemButton>
                <ListItemIcon>
                  <LibraryBooksIcon /> {/* Use the appropriate icon */}
                </ListItemIcon>
                <ListItemText primary="Notes Share" />
              </ListItemButton>
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
