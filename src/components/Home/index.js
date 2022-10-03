/**
 *
 * StockPage
 *
 */

import React, { useState } from "react";

// import {
//   makeSelectVerifyAuth,
//   makeSelectNurseSignin,
// } from 'containers/App/selectors';

import classNames from "classnames";

// import { useSnackbar } from "notistack";

import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

// import Header from "../components/Header";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      minHeight: `60px`,
    },
    [theme.breakpoints.up("sm")]: {
      minHeight: `44px`,
    },
  },
  drawerHeaderSmall: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      minHeight: `59px`,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(8),
    },
    paddingBottom: theme.spacing(8),
  },
  contentWide: {
    flexGrow: 1,
    padding: "1px",

    paddingBottom: theme.spacing(8),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  },
}));

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export function StockPage(props) {
  const [toggle, setToggle] = useState(false);
  const classes = useStyles();
  // const { enqueueSnackbar } = useSnackbar();
  const { fullScreen, ...rest } = props;
  const width = "100px";

  const onToggleMenu = () => {
    setToggle(!toggle);
  };

  const { component: Component, history } = props;

  const renderFooter = () => {
    return <Footer width={width} />;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        {...rest}
        toggle={toggle}
        onToggle={onToggleMenu}
        // isAuthenticated={isAuthenticated}
      />
      <main
        className={classNames(
          fullScreen ? classes.contentWide : classes.content
        )}
      >
        <div
          className={
            fullScreen ? classes.drawerHeaderSmall : classes.drawerHeader
          }
        />
        {Component && (
          <Component
            {...rest}
            // enqueueSnackbar={enqueueSnackbar}
            width={width}
            history={history}
          />
        )}
      </main>
      {renderFooter()}
    </div>
  );
}

export default StockPage;
