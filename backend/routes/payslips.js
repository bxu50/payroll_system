var express = require('express');
var router = express.Router();
var Payslip = require('../models/payslip')
var moment = require('moment')
router.get('/api', function (req, res, next) {
  res.render('index', { title: 'Payslip' });
});
router.get('/get', async function (req, res, next) {
  // if(await Payslip.exists({$and: [{firstName: "Wenhao"}, {lastName: "Lin"}]})){
  //   console.log(moment(2019-10-03, "YYYY-MM-DD").date(30))
  // }

  res.send('hello')
});

router.post('/post', async function (req, res) {

  var payload = req.body.tableData

  let valueMatch = await Payslip.exists({ $and: [{ firstName: payload.firstName.value }, { lastName: payload.lastName.value }, {payPeriod: moment(payload.payPeriod.value, "YYYY-MM-DD").date(28) }] })
  if (!valueMatch) {
      var payslip = new Payslip({
        firstName: payload.firstName.value,
        lastName: payload.lastName.value,
        payPeriod: moment(payload.payPeriod.value, "YYYY-MM-DD").date(28),
        payFrequency: payload.payFrequency.value,
        annualIncome: payload.annualIncome.value,
        grossIncome: payload.grossIncome.value,
        incomeTax: payload.incomeTax.value,
        netIncome: payload.netIncome.value,
        super: payload.super.value,
        pay: payload.pay.value
      });

    payslip.save(err => {
      if (err) {
        console.log(err);
        res.status(400).send('cannot create payslip')
      }
      res.status(200).send('payslip added')
    })
  } else {
    res.status(400).send('This person is already paid in this month')
  }

}
)
module.exports = router;
