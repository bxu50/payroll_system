import reducer from "../components/store/reducer";
import * as constents from "../components/store/constants";
import expect from "expect";
import { formData, defaultState } from "./mockData/mockData";

describe("post form", () => {
  it("should return the form data", () => {
    const formSubmit = {
      type: constents.FORM_SUBMIT,
      formData
    };

    expect(reducer(defaultState, formSubmit)).toEqual(
      defaultState
        .setIn(["tableData", "firstName", "value"], formData.get("firstName"))
        .setIn(["tableData", "lastName", "value"], formData.get("lastName"))
        .setIn(["tableData", "annualIncome", "value"], formData.get("salary"))
        .setIn(["tableData", "superRate", "value"], formData.get("superRate"))
    );
  });
});
