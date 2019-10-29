import * as constants from './constants';
import NP from 'number-precision'
import { fromJS } from 'immutable';
const defaultState = fromJS({
    formData: {
        firstName: "",
        lastName: "",
        salary: "",
        superRate: "",
        date: ""
    },
    tableData: {
        firstName:{
            name: 'First Name',
            Value:''
        },
        lastName:{
            name: 'Last Name',
            value: ''
        },
        payPeriod:{
            name: 'Pay Period',
            value: ''
        } ,
        payFrequency: {
            name: 'Pay Frequency',
            value: 'Monthly'
        } ,
        annualIncome: {
            name: 'Annual Income',
            value: ''
        } ,
        grossIncome: {
            name: 'Gross Income',
            value: ''
        } ,
        incomeTax: {
            name: 'Income Tax',
            value: ''
        } ,
        netIncome: {
            name: 'Net Income',
            value: ''
        } ,
        super: {
            name: 'super',
            value: ''
        },
        pay: {
            name: 'Pay',
            value: ''
        } ,
    },
    validated: false,
    Complete: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case ('formValidate'):
            return state.set('validated', true)
        case ('changeInputValue'):
            return state.setIn(['formData', action.key], action.value)
        case ('validateComplete'):
            return state.set("Complete", true)
        case ('validateIncomplete'):
            return state.set("Complete", false)
        case ('triggerBack'):
            return state.set("Complete", false)
        case ('formSubmit'):
            let Salary = Number(action.formData.get('salary'));
            let SuperRate = Number(action.formData.get('superRate'));
            const TaxCalculation = (Salary) => {
                let tax;
                if (Salary <= 18200) {
                    tax = 0;
                    return tax
                } else if (Salary >= 18201 && Salary <= 37000) {
                    tax = NP.round(NP.divide(NP.times(Salary - 18200, 0.19), 12), 0)
                    return tax
                } else if (Salary >= 37001 && Salary <= 87000) {
                    tax = NP.round(NP.divide(3572 + NP.times(Salary - 37000, 0.325), 12), 0)
                    return tax
                } else if (Salary >= 87001 && Salary <= 180000) {
                    tax = NP.round(NP.divide(19822 + NP.times(Salary - 87000, 0.37), 12), 0)
                    return tax
                } else if (Salary >= 180001) {
                    tax = NP.round(NP.divide(54232 + NP.times(Salary - 180000, 0.45), 12), 0)
                    return tax
                }
            }
            //         switch (Salary, tax) {
            //             case (Salary <= 18200):
            //                 tax = 0;
            //                 return tax
            //             case (Salary >= 18201 && Salary <= 37000):
            //                 tax = NP.round(NP.divide(NP.times(Salary - 18200, 0.19), 12), 0)
            //                 return tax
            //             case (Salary >= 37001 && Salary <= 87000):
            //                 tax = NP.round(NP.divide(3572 + NP.times(Salary - 37000, 0.325), 12), 0)
            //                 return tax
            //             case (Salary >= 87001 && Salary <= 180000):
            //                 tax = NP.round(NP.divide(19822 + NP.times(Salary - 87000, 0.37), 12), 0)
            //                 return tax
            //             case (Salary >= 180001):
            //                 tax = NP.round(NP.divide(54232 + NP.times(Salary - 180000, 0.45), 12), 0)
            //                 return tax
            //         }
            // }
            let GrossIncome = fromJS(NP.round(Salary / 12, 0))
            let Tax = fromJS(TaxCalculation(Salary))
            let NetIncome = fromJS(GrossIncome - Tax)
            let Super = fromJS(NP.round(NP.times(GrossIncome, NP.times(SuperRate, 0.01)), 0))
            let Pay = fromJS(NP.minus(NetIncome, Super))

            return (
                state.setIn(['tableData', 'firstName', 'value'], action.formData.get('firstName'))
                    .setIn(['tableData', 'lastName', 'value'], action.formData.get('lastName'))
                    .setIn(['tableData', 'annualIncome', 'value'], action.formData.get('salary'))
                    .setIn(['tableData', 'payPeriod','value'], action.formData.get('date'))
                    .setIn(['tableData', 'grossIncome', 'value'], GrossIncome)
                    .setIn(['tableData', 'incomeTax', 'value'], Tax)
                    .setIn(['tableData', 'netIncome', 'value'], NetIncome)
                    .setIn(['tableData', 'super', 'value'], Super)
                    .setIn(['tableData', 'pay', 'value'], Pay)
            )
        default:
            return state;
    }
}

