import React, { Component, Fragment } from 'react';
import InfoForm from './components/InfoForm'
import PayrollTable from './components/PayrollTable'
import { Provider } from 'react-redux';
import {BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
class PayRoll extends Component {
  

  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
      <Route path = '/' exact component = {InfoForm}></Route>
      <Route path = '/payslip' exact component = {PayrollTable}></Route>
      </BrowserRouter>
      </Provider>

    );
  }
}

export default PayRoll


