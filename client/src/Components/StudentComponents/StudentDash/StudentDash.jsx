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
import "./StudentDash.css";
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

export default function StudentDash(props) {
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
            <NavLink to="/studenthome">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                />
              </ListItemButton>
            </NavLink>

            <NavLink to="/stud-update-profile">
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Profile Settings"
                  sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                />
              </ListItemButton>
            </NavLink>

            <ListItemButton>
              <ListItemIcon>
                <NotificationsActiveIcon />
              </ListItemIcon>
              <ListItemText
                primary="Notifications"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText
                primary="Career Resources"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText
                primary="Feedback"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText
                primary="Help and Support"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText
                primary="Forums"
                sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText
                primary="Contact"
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
