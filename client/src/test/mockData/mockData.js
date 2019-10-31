import { fromJS } from "immutable";
export const defaultState = fromJS({
  tableData: {
    firstName: {
      name: "First Name",
      Value: ""
    },
    lastName: {
      name: "Last Name",
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
    superRate: {
      name: "superRate",
      value: ""
    }
  }
});

export const formData = fromJS({
  firstName: "Benshuai",
  lastName: "Xu",
  salary: 50000,
  superRate: 9
});
