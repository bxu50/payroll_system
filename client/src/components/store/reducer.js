import * as constants from "./constants";
import NP from "number-precision";
import { fromJS } from "immutable";
import moment from "moment";
const defaultState = fromJS({
  formData: {
    firstName: "",
    lastName: "",
    salary: "",
    superRate: ""
  },
  tableData: {
    firstName: {
      name: "First Name",
      value: ""
    },
    lastName: {
      name: "Last Name",
      value: ""
    },
    payPeriod: {
      name: "Pay Period",
      value: ""
    },
    payFrequency: {
      name: "Pay Frequency",
      value: "Monthly"
    },
    annualIncome: {
      name: "Annual Income",
      value: ""
    },
    grossIncome: {
      name: "Gross Income",
      value: ""
    },
    incomeTax: {
      name: "Income Tax",
      value: ""
    },
    netIncome: {
      name: "Net Income",
      value: ""
    },
    superRate: {
      name: "superRate",
      value: ""
    },
    super: {
      name: "super",
      value: ""
    },
    pay: {
      name: "Pay",
      value: ""
    }
  },
  validated: false,
  Complete: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.FORM_VALIDATE:
      return state.set("validated", true);
    case constants.CHANGE_INPUT_VALUE:
      return state.setIn(["formData", action.key], action.value);
    case constants.VALIDATE_COMPLETE:
      return state.set("Complete", true);
    case constants.VALIDATE_INCOMPLETE:
      return state.set("Complete", false);
    case constants.TRIGGER_BACK:
      return state.set("Complete", false);
    case constants.CLEAR_FORM_BACK:
      return state
        .set("Complete", false)
        .setIn(["formData", "firstName"], "")
        .setIn(["formData", "lastName"], "")
        .setIn(["formData", "salary"], "")
        .setIn(["formData", "superRate"], "");

    case constants.DATA_CALCULATION:
      return state
        .setIn(["tableData", "payPeriod", "value"], moment().date(28))
        .setIn(["tableData", "grossIncome", "value"], action.GrossIncome)
        .setIn(["tableData", "incomeTax", "value"], action.Tax)
        .setIn(["tableData", "netIncome", "value"], action.NetIncome)
        .setIn(["tableData", "super", "value"], action.Super)
        .setIn(["tableData", "pay", "value"], action.Pay);
    case constants.FORM_SUBMIT:
      return state
        .setIn(
          ["tableData", "firstName", "value"],
          action.formData.get("firstName")
        )
        .setIn(
          ["tableData", "lastName", "value"],
          action.formData.get("lastName")
        )
        .setIn(
          ["tableData", "annualIncome", "value"],
          action.formData.get("salary")
        )
        .setIn(
          ["tableData", "superRate", "value"],
          action.formData.get("superRate")
        );
    default:
      return state;
  }
};
