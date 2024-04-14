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
import { useTheme } from "@mui/material/styles";
import { Button, Grid, Popover, Tooltip } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ExitToApp from "@mui/icons-material/ExitToApp";
import QuizIcon from "@mui/icons-material/Quiz";
import WorkIcon from "@mui/icons-material/Work";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

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
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/send-notification/receive-notifications/${auth.email}`
      ); // Replace with your actual API endpoint
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:5000/send-notification/notifications/${notificationId}`
      );

      // Update the UI to mark the notification as read and remove it from the list
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

      // Close the notification bar immediately
      setAnchorEl(null);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const checkData = sessionStorage.getItem("auth");
    if (!checkData) {
      navigate("/signin");
    }
  }, [auth.token, navigate, setAuth]);

  const handleNotificationIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openPopover = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
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
                <IconButton onClick={handleNotificationIconClick}>
                  <Badge
                    badgeContent={unreadNotificationsCount}
                    color="error"
                    size="large"
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
                  </Badge>
                </IconButton>
                <Popover
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      width: 600,
                      padding: "15px 15px 15px 15px",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      marginBottom: 2,
                      fontWeight: "bold",
                      fontFamily: "Nunito",
                    }}
                  >
                    Notifications
                  </Typography>
                  <Divider sx={{ borderTop: "1px solid #000" }} />
                  <div>
                    <List>
                      {notifications.map((notification) => (
                        <React.Fragment key={notification._id}>
                          <ListItem
                            button
                            onClick={() =>
                              handleNotificationClick(notification._id)
                            }
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <ListItemIcon>
                              <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <strong>{notification.subject}</strong>
                                  <br />
                                  {notification.message}
                                </Typography>
                              }
                            />
                          </ListItem>
                          <Divider sx={{ borderTop: "1px solid #000" }} />
                        </React.Fragment>
                      ))}
                    </List>

                    <Button
                      component={Link}
                      to="/student-notifications" // Update with the correct path
                      variant="outlined"
                      sx={{
                        width: "100%",
                        marginTop: 2,
                        border: "none",
                      }}
                    >
                      View All
                    </Button>
                  </div>
                </Popover>

                <div
                  className="avatar-menu"
                  style={{ marginRight: "5px", marginLeft: "30px" }}
                >
                  <Avatar sx={{ bgcolor: deepOrange[500] }} className="avatar">
                    {auth.name.slice(0, 1)}
                  </Avatar>
                </div>
                {auth.name ? <Logout varient="primary" /> : ""}
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
            <NavLink to="/studenthome" className="nav-link">
              <Tooltip title="Dashboard" arrow placement="right">
                <ListItemButton>
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

            <NavLink to="/stud-update-profile" className="nav-link">
              <Tooltip title="Profile Settings" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile Settings"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/student-notifications" className="nav-link">
              <Tooltip title="Notifications" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <NotificationsActiveIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/ats-checker" className="nav-link">
              <Tooltip title="ATS Checker" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <ScoreboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="ATS Checker"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink
              to="/notes-material"
              className="nav-link"
              name="nav-link-materials"
            >
              <Tooltip title="Career Resources" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Career Resources"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/student-workshop-list" className="nav-link">
              <Tooltip title="Workshop Facilitation" arrow placement="right">
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

            <NavLink to="/student-exam-list" className="nav-link">
              <Tooltip title="Aptitude Exam" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <QuizIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Aptitude Exam"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            {/* <ListItemButton>
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
            </ListItemButton> */}

            <NavLink to="/student-chat-room" className="nav-link">
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
            
            <NavLink to="/job-post" className="nav-link">
              <Tooltip title="Jobs" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Jobs"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/student-placement-prediction" className="nav-link">
              <Tooltip title="Prediction" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <PublishedWithChangesIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Prediction"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

            <NavLink to="/student-feedback-form" className="nav-link">
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

            <NavLink to="" className="nav-link">
              <Tooltip title="Log Out" arrow placement="right">
                <ListItemButton>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </Tooltip>
            </NavLink>

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
  );
}
