import * as constants from "./constants";
import { fromJS } from "immutable";
import "react-toastify/dist/ReactToastify.css";
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
  formData
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
