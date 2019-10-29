const mongoose = require('mongoose'),
Schema = mongoose.Schema

const payslipSchema = new Schema({
    firstName: String,
    lastName: String,
    payPeriod: String,
    payFrequency: String,
    annualIncome: Number,
    grossIncome: Number,
    incomeTax: Number,
    netIncome: Number,
    super: Number,
    pay: Number
});

const payslipModel = mongoose.model('Payslip', payslipSchema);

module.exports = payslipModel