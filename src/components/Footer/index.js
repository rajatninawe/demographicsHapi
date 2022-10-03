import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    zIndex: theme.zIndex.drawer + 1,
    position: "fixed",
    padding: "5px 15px",
    display: "flex",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#25406B",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
function Footer({ width }) {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div>Patient demographics </div>
    </div>
  );
}

Footer.propTypes = {
  width: PropTypes.string,
};

export default Footer;
