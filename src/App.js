/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./containers/HomePage/Loadable";
// import NotFoundPage from '../NotFoundPage/Loadable';
// import SignUpPage from '../SignUpPage/Loadable';

import GlobalStyle from "./global-styles";
import StockPage from "./components/Home";
import PatientPage from "./containers/Patient";
import PatientDetailsPage from "./containers/PatientDetails";
// import TestComponent from 'containers/Test';

export default function App(props) {
  const { history } = props;
  return (
    <div>
      <Routes>
        {/* <Route
           exact
           path="/signup"
           component={() => (
             <StockPage component={SignUpPage} history={history} />
           )}
         /> */}
        <Route
          exact
          path="/"
          element={<StockPage component={HomePage} history={history} />}
          // element={() => }
        />
        <Route
          exact
          path="/patient"
          element={<StockPage component={PatientPage} history={history} />}
          // element={() => }
        />

        <Route
          exact
          path="/patientDetails/:id"
          element={
            <StockPage component={PatientDetailsPage} history={history} />
          }
          // element={() => }
        />

        {/* <Route
           exact
           path="/test"
           component={() => (
             <StockPage component={TestComponent} history={history} />
           )}
         />
         <Route component={NotFoundPage} /> */}
      </Routes>
      <GlobalStyle />
    </div>
  );
}
