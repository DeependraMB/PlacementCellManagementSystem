import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
import { useTheme } from "@mui/material/styles";
import Logout from "../../Logout/Logout";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BookIcon from "@mui/icons-material/Book";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HelpIcon from "@mui/icons-material/Help";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ForumIcon from "@mui/icons-material/Forum";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SchoolIcon from "@mui/icons-material/School";
import { Grid, Tooltip } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";


const drawerWidth = 270;

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
  shouldForwardProp: (prop) => prop !== "open",
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

export default function AdminDash(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [oopen, setOopen] = React.useState(true);

  const handleClick = () => {
    setOopen(!oopen);
  };

  const [nestedListOpen, setNestedListOpen] = React.useState(false);

  const handleNestedListClick = () => {
    setNestedListOpen(!nestedListOpen);
  };

  useEffect(() => {
    const checkData = sessionStorage.getItem("auth");
    if (!checkData) {
      // If not authenticated and no auth data in session storage, redirect to login
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
                  [theme.breakpoints.down("md")]: {
                    marginLeft: "auto", // Move to the right when screen size is below medium
                  },
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
                    {auth.name.slice(0, 1)}
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
            <NavLink
              to="/adminhome"
              className="nav-link"
              name="nav-link-dashboard"
            >
              <Tooltip title="Dashboard" arrow placement="right">
                <ListItemButton component={Link} href="/adminhome">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            {/* <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Profile Settings"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton> */}
            <NavLink
              to="/notifications"
              className="nav-link"
              name="nav-link-notifications"
            >
              <Tooltip title="Notifications Send" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <NotificationsActiveIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications Send"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink
              to="/student-management"
              className="nav-link"
              name="nav-link-student-management"
            >
              <Tooltip title="Student Management" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Student Management"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink
              to="/teacher-management"
              className="nav-link"
              name="nav-link-teacher-management"
            >
              <Tooltip title="Teachers Management" arrow placement="right">
                <ListItemButton component={Link} href="/teacher-management">
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Teachers Management"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <ListItemButton onClick={handleNestedListClick}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  Add User
                </Typography>
              </ListItemText>
              {nestedListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            {/* Nested List - Add Teacher and Add Alumni */}
            <Collapse in={nestedListOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink
                  to="/add-teacher"
                  className="nav-link"
                  name="nav-link-add-teacher"
                >
                  <Tooltip title="Add Teacher" arrow placement="right">
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant="body2"
                          style={{ fontWeight: "bold" }}
                        >
                          Add Teacher
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Tooltip>
                </NavLink>

                <NavLink
                  to="/add-alumni"
                  className="nav-link"
                  name="nav-link-add-alumni"
                >
                  <Tooltip title="Add Alumni" arrow placement="right">
                    <ListItemButton>
                      <ListItemIcon>
                        <PeopleAltIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant="body2"
                          style={{ fontWeight: "bold" }}
                        >
                          Add Alumni
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </Tooltip>
                </NavLink>
              </List>
            </Collapse>

            <NavLink
              to="/notes-management"
              className="nav-link"
              name="nav-link-notes-management"
            >
              <Tooltip title="Notes Management" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notes Management"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink
              to="/job-management"
              className="nav-link"
              name="nav-link-job-management"
            >
              <Tooltip title="Jobs Management" arrow placement="right">
                <ListItemButton component={Link} href="/jobr-management">
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Jobs Management"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/feedbacks" className="nav-link">
              <Tooltip title="Feedbacks Analysis" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Feedback"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/admin-chat-room" className="nav-link">
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

            <NavLink to="/workshop-list" className="nav-link">
              <Tooltip title="Workshop" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <CastForEducationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Workshop"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <ListItemButton>
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText
                primary="Aptitudetest Manage"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton>

            <Divider />
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
