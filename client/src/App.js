import React, { Component } from "react";
import InfoForm from "./components/InfoForm";
import PayslipTable from "./components/PayslipTable";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
class PayRoll extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" exact component={InfoForm}></Route>
          <Route path="/payslip" exact component={PayslipTable}></Route>
        </BrowserRouter>
        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
        />
      </Provider>
    );
  }
}

export default PayRoll;
