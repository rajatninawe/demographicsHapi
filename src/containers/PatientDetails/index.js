/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPatientClaimDetails,
  getPatientEncDetails,
  getSinglePatientDetails,
} from "../../network/api/hapi";
import { isEmpty } from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LinearProgress from "@mui/material/LinearProgress";

import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

const pages = ["Claims", "Encounters"];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PatientDetailsPage() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [claimData, setClaimData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [claimId, setClaimId] = React.useState(0);

  const [encData, setEncData] = useState([]);
  const [expandedEnc, setExpandedEnc] = React.useState(false);
  const [encId, setEncId] = React.useState(0);

  const handleExpandClick = (id) => {
    setClaimId(id);
    setExpanded(!expanded);
  };

  const handleExpandClickEnc = (id) => {
    setEncId(id);
    setExpandedEnc(!expandedEnc);
  };

  const getSubAuditData = async () => {
    setLoader(true);
    const patientSingleData = await getSinglePatientDetails(id);

    console.log("patientSingleData", patientSingleData);
    if (patientSingleData.data) {
      setPatientData(patientSingleData.data);
    }

    // if (subAuditData.data) {
    //   // setPatientRawData(subAuditData.data);
    // 49006,2007394
    const claimDataRes = await getPatientClaimDetails(id);
    console.log("claimDataRes", claimDataRes);
    if (claimDataRes.data) {
      setClaimData(claimDataRes.data);
    }

    const encDataRes = await getPatientEncDetails(id);
    console.log("encDataRes", encDataRes);
    if (encDataRes.data) {
      setEncData(encDataRes.data);
    }
    setLoader(false);
    // }
  };

  useEffect(() => {
    getSubAuditData();
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState("Claims");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="form">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 style={{ margin: "15px" }}>Patient details</h1>
        </div>
        {loader && (
          <div
            style={{ width: "50%", marginBottom: "25px", marginLeft: "15px" }}
          >
            <LinearProgress />
          </div>
        )}
      </div>

      <Card sx={{ maxWidth: 500 }} style={{ marginLeft: "15px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {patientData?.name?.[0].given?.[0][0]?.toUpperCase()}
              {patientData?.name?.[0].family?.[0][0]?.toUpperCase()}
            </Avatar>
          }
          title={
            !isEmpty(patientData?.name)
              ? `${patientData?.name?.[0].given} ${patientData?.name?.[0].family}`
              : "Unknown"
          }
          subheader={
            !isEmpty(patientData?.id) ? `${patientData?.id}` : "Unknown"
          }
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Gender:&nbsp;
            {!isEmpty(patientData?.gender)
              ? `${patientData?.gender}`
              : "Unknown"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DOB:&nbsp;
            {!isEmpty(patientData?.birthDate)
              ? `${patientData?.birthDate}`
              : "Unknown"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Address:&nbsp;
            {!isEmpty(patientData?.address?.[0])
              ? `${patientData?.address?.[0]?.line}
          ${patientData?.address?.[0]?.city}, ${patientData?.address?.[0]?.state}, ${patientData?.address?.[0]?.country}, ${patientData?.address?.[0]?.postalCode}`
              : "Unknown"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact:&nbsp;
            {!isEmpty(patientData?.telecom?.[0])
              ? `${patientData?.telecom?.[0]?.value}`
              : "Unknown"}
          </Typography>
        </CardContent>
        {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions> */}
      </Card>
      <div>
        <AppBar
          position="fixed"
          style={{
            width: "20%",
            marginTop: "70px",
            backgroundColor: "#25406B",
            borderRadius: "10px 0px 0px 10px",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu();
                        setAnchorElUser(page);
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      setAnchorElUser(page);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <h1 style={{ margin: "15px" }}>{anchorElUser}</h1>
          </div>
        </div>
        {anchorElUser == "Claims" && isEmpty(claimData?.entry) && (
          <div>
            <h4 style={{ margin: "15px" }}>No claims found</h4>
          </div>
        )}
        {anchorElUser == "Claims" &&
          !isEmpty(claimData?.entry) &&
          claimData?.entry?.map((ele, index) => {
            return (
              <div style={{ margin: "15px" }} key={index}>
                <Card sx={{ maxWidth: 1000 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ele?.resource?.provider?.display} ({ele?.resource?.id})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created: {ele?.resource?.created}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Billable period: {ele?.resource?.billablePeriod?.start}{" "}
                      -&nbsp;
                      {ele?.resource?.billablePeriod?.end}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {ele?.resource?.status}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Amount: {ele?.resource?.total?.currency}{" "}
                      {ele?.resource?.total?.value}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <ExpandMore
                      expand={expanded && claimId == ele?.resource?.id}
                      onClick={() => handleExpandClick(ele?.resource?.id)}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expanded && claimId == ele?.resource?.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent
                      style={{ backgroundColor: "#222", color: "yellow" }}
                    >
                      <Typography paragraph>JSON:</Typography>
                      <pre> {JSON.stringify(ele, undefined, 2)}</pre>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            );
          })}
        {anchorElUser == "Encounters" && isEmpty(encData?.entry) && (
          <div>
            <h4 style={{ margin: "15px" }}>No encounters found</h4>
          </div>
        )}
        {anchorElUser == "Encounters" &&
          !isEmpty(encData?.entry) &&
          encData?.entry?.map((ele, index) => {
            return (
              <div style={{ margin: "15px" }} key={index}>
                <Card sx={{ maxWidth: 1000 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ele?.resource?.serviceProvider?.display} (
                      {ele?.resource?.id})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start date: {ele?.resource?.period?.start}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      End date: {ele?.resource?.period?.end}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Class: {ele?.resource?.class?.code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {ele?.resource?.status}
                    </Typography>
                    {!isEmpty(ele?.resource?.participant) && (
                      <Typography variant="h7" style={{ fontWeight: 700 }}>
                        PARTICIPANTS
                      </Typography>
                    )}

                    <table style={{ width: "100%", textAlign: "left" }}>
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Name</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isEmpty(ele?.resource?.participant) &&
                          ele?.resource?.participant.map((parp, ind) => {
                            return (
                              <tr key={ind}>
                                <td>{parp?.type?.[0]?.text || "--"}</td>
                                <td>{parp?.individual?.display || "--"}</td>
                                {parp?.period ? (
                                  <td>
                                    {parp?.period?.start} - {parp?.period?.end}
                                  </td>
                                ) : (
                                  "--"
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </CardContent>
                  <CardActions disableSpacing>
                    <ExpandMore
                      expand={expandedEnc && encId == ele?.resource?.id}
                      onClick={() => handleExpandClickEnc(ele?.resource?.id)}
                      aria-expanded={expandedEnc}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expandedEnc && encId == ele?.resource?.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent
                      style={{ backgroundColor: "#222", color: "yellow" }}
                    >
                      <Typography paragraph>JSON:</Typography>
                      <pre> {JSON.stringify(ele, undefined, 2)}</pre>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}
