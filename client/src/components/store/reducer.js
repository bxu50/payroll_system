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
      let Salary = Number(action.formData.get("salary"));
      let SuperRate = Number(action.formData.get("superRate"));
      let GrossIncome = fromJS(NP.round(Salary / 12, 0));
      let Tax = fromJS(FindTax(Salary));
      let NetIncome = fromJS(GrossIncome - Tax);
      let Super = fromJS(
        NP.round(NP.times(GrossIncome, NP.times(SuperRate, 0.01)), 0)
      );
      let Pay = fromJS(NP.minus(NetIncome, Super));
      return state
        .setIn(["tableData", "payPeriod", "value"], moment().date(28))
        .setIn(["tableData", "grossIncome", "value"], GrossIncome)
        .setIn(["tableData", "incomeTax", "value"], Tax)
        .setIn(["tableData", "netIncome", "value"], NetIncome)
        .setIn(["tableData", "super", "value"], Super)
        .setIn(["tableData", "pay", "value"], Pay);
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
const taxRate = [
  {
    min: 0,
    max: 18200,
    rate: 0,
    baseAmount: 0
  },
  {
    min: 18200,
    max: 37000,
    rate: 0.19,
    baseAmount: 0
  },
  {
    min: 37000,
    max: 87000,
    rate: 0.325,
    baseAmount: 3572
  },
  {
    min: 87000,
    max: 180000,
    rate: 0.37,
    baseAmount: 19822
  },
  {
    min: 180000,
    max: null,
    rate: 0.45,
    baseAmount: 54232
  }
];
const FindTax = Salary => {
  const taxList = taxRate.map(item => {
    let tax;
    if (Salary > item.min && Salary < item.max) {
      tax = NP.round(
        NP.divide(item.baseAmount + NP.times(Salary - item.min, item.rate), 12),
        0
      );
      return tax;
    }
  });
  return taxList.find(item => item !== undefined);
};
