/**
 *
 * Header
 *
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { useNavigate } from "react-router-dom";
import DatasetIcon from "@mui/icons-material/Dataset";
import HomeIcon from "@mui/icons-material/Home";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(to right, #55bcbe 0%,#85c3a6 100%) !important",

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: drawerWidth,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down("md")]: {
      marginRight: 0,
    },
  },
  hide: {
    display: "none",
  },

  title: {
    display: "inline !important",
    marginLeft: "1rem",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  link: {
    color: theme.palette.secondary.main,
  },
}));
function Header({ toggle }) {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: toggle,
      })}
    >
      <Toolbar
        disableGutters={!toggle}
        className={classNames(classes.menuButton)}
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }}>
          <Tooltip title="Dashboard">
            <IconButton
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon style={{ fill: "#fff" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <h2>Patient demographics</h2>
        </div>
        <div>
          <Tooltip title="Patients">
            <IconButton
              onClick={() => {
                navigate("/patient");
              }}
            >
              <RecentActorsIcon style={{ fill: "#fff" }} />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
