import * as constants from "./constants";
import { fromJS } from "immutable";
import "react-toastify/dist/ReactToastify.css";
import NP from "number-precision";
import axios from "axios";
import { ToastsStore } from "react-toasts";

export const formValidate = () => ({
  type: constants.FORM_VALIDATE
});

export const changeInputValue = (key, value) => ({
  type: constants.CHANGE_INPUT_VALUE,
  key,
  value: fromJS(value)
});

export const formSubmit = formData => ({
  type: constants.FORM_SUBMIT,
  formData
});
export const dataCalculation = formData => ({
  type: constants.DATA_CALCULATION,
  Salary: Number(formData.get("salary")),
  SuperRate: Number(formData.get("superRate")),
  GrossIncome: fromJS(NP.round(formData.get("salary") / 12, 0)),
  Tax: fromJS(FindTax(formData.get("salary"))),
  NetIncome: fromJS(
    NP.round(formData.get("salary") / 12 - FindTax(formData.get("salary")), 0)
  ),
  Super: fromJS(
    NP.round(
      NP.times(
        formData.get("salary") / 12,
        NP.times(formData.get("superRate"), 0.01)
      ),
      0
    )
  ),
  Pay: fromJS(
    NP.round(
      NP.minus(
        formData.get("salary") / 12 - FindTax(formData.get("salary")),
        NP.times(
          formData.get("salary") / 12,
          NP.times(formData.get("superRate"), 0.01)
        )
      ),
      0
    )
  )
});

export const validateComplete = () => ({
  type: constants.VALIDATE_COMPLETE
});

export const validateIncomplete = () => ({
  type: constants.VALIDATE_INCOMPLETE
});

export const triggerBack = () => ({
  type: constants.TRIGGER_BACK
});
const clearFormBack = () => ({
  type: constants.CLEAR_FORM_BACK
});
export const postTable = tableData => {
  return dispatch => {
    axios
      .post("http://localhost:5000/payslip/post", {
        tableData: tableData
      })
      .then(res => {
        ToastsStore.success(res.data);
        dispatch(clearFormBack());
      })
      .catch(err => {
        if (err.response.status === 400) {
          ToastsStore.error(err.response.data);
        }
        if (err.response.status === 500) {
          ToastsStore.error("Database or server is not runing properly");
        }
      });
  };
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
    max: Infinity,
    rate: 0.45,
    baseAmount: 54232
  }
];
const FindTax = Salary => {
  let taxList = taxRate.map(item => {
    let tax;
    if (Salary > item.min && Salary <= item.max) {
      tax = NP.round(
        NP.divide(item.baseAmount + NP.times(Salary - item.min, item.rate), 12),
        0
      );
      return tax;
    }
  });
  return taxList.find(item => item !== undefined);
};
