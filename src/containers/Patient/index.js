/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from "react";
import {
  getPatientData,
  getSinglePatientDetails,
} from "../../network/api/hapi";
import { DataGrid } from "@mui/x-data-grid";
import { isEmpty } from "lodash";
import LinearProgress from "@mui/material/LinearProgress";

export default function PatientPage() {
  const [patientRawData, setPatientRawData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getSubAuditData = async () => {
    setLoader(true);
    const subAuditData = await getPatientData(
      "2007394,1993690,2435817,2435730"
    );
    // 2378854
    // const subAuditData = await getSinglePatientDetails(2007394);
    console.log("avadvasv", subAuditData);
    if (subAuditData.data) {
      setPatientRawData(subAuditData.data);
    }

    setLoader(false);
  };

  useEffect(() => {
    getSubAuditData();
  }, []);

  useEffect(() => {
    console.log("patientRawData", patientRawData);
    let pdata = patientRawData?.entry;
    console.log("pdata", pdata);
    let paylaod = [];
    if (!isEmpty(pdata)) {
      pdata.map((ele) => {
        paylaod.push({ ...ele, id: ele.resource.id });
      });
    }
    console.log("paylaod", paylaod);
    setPatientData(paylaod);
  }, [patientRawData]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      width: 120,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      valueGetter: (params) => {
        console.log("params", params.row);
        let patientDemographics = params?.row?.resource?.name?.[0];

        return `${patientDemographics?.given} ${patientDemographics?.family}`;
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      valueGetter: (params) => {
        let gender = params?.row?.resource?.gender;

        return `${gender ? gender : "Unknown"}`;
      },
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 130,
      valueGetter: (params) => {
        let birthDate = params?.row?.resource?.birthDate;

        return `${birthDate ? birthDate : "Unknown"}`;
      },
    },
    {
      field: "adddress",
      headerName: "Address",
      width: 400,
      valueGetter: (params) => {
        let address = params?.row?.resource.address?.[0];
        console.log("address", address);
        if (address) {
          return (
            address?.line +
            ", " +
            address?.city +
            ", " +
            address?.state +
            ", " +
            address?.country +
            ", " +
            address?.postalCode
          );
        } else return "Unknown";
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 150,
      valueGetter: (params) => {
        let telecom = params?.row?.resource?.telecom?.[0];
        return telecom?.value ? telecom?.value : "Unknown";
      },
    },
    {
      field: "details",
      headerName: "Details",
      renderCell: (params) => (
        <a href={`patientDetails/${params?.row?.id}`}>Click here</a>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <h1>Patients</h1>
        </div>
        {loader && (
          <div style={{ width: "50%", marginBottom: "25px" }}>
            <LinearProgress />
          </div>
        )}
      </div>

      <DataGrid
        rows={patientData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        key="fullUrl"
      />
    </div>
  );
}
