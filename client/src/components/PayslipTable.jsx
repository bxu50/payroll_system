import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Wrapper from "./shared/Wrapper";
import styled from "styled-components";
import { Table, Button } from "react-bootstrap";
import dateFormat from "dateformat";
import NumberFormat from "react-number-format";
import { actionCreators } from "./store";
const StyledWrapper = styled(Wrapper)`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
text-align: left;
align-items: center;
.heading{
    grid-column-start: 1; 
    grid-column-end: 5; 
}
.back{
    width: 120px
}
.pay{
    grid-column-start: 4; 
    grid-column-end: 5; 
    width: 120px
    align-items: right;
}
`;

class PayrollTable extends Component {
  render() {
    const {
      tableData,
      validateComplete,
      handleOnClick,
      handleBack
    } = this.props;
    if (validateComplete === false) {
      return <Redirect to="/" />;
    }
    return (
      <StyledWrapper>
        <h2 className="heading">Payslip</h2>
        <h3 className="heading">
          {tableData.getIn(["firstName", "value"])}{" "}
          {tableData.getIn(["lastName", "value"])}{" "}
        </h3>
        <Table className="heading" striped bordered hover>
          <tbody>
            <tr>
              <th>{tableData.getIn(["payPeriod", "name"])}</th>
              <td>
                {dateFormat(
                  tableData.getIn(["payPeriod", "value"]),
                  "dd-mmmm-yyyy"
                )}
              </td>
            </tr>
            <tr>
              <th>{tableData.getIn(["payFrequency", "name"])}</th>
              <td> {tableData.getIn(["payFrequency", "value"])}</td>
            </tr>
            <tr>
              <th>{tableData.getIn(["annualIncome", "name"])}</th>
              <td>
                <NumberFormat
                  value={tableData.getIn(["annualIncome", "value"])}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={value => <div>{value}</div>}
                ></NumberFormat>
              </td>
            </tr>
            <tr>
              <th>{tableData.getIn(["grossIncome", "name"])}</th>
              <td>
                <NumberFormat
                  value={tableData.getIn(["grossIncome", "value"])}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={value => <div>{value}</div>}
                ></NumberFormat>
              </td>
            </tr>
            <tr>
              <th>{tableData.getIn(["incomeTax", "name"])}</th>
              <td>
                <NumberFormat
                  value={tableData.getIn(["incomeTax", "value"])}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={value => <div>{value}</div>}
                ></NumberFormat>
              </td>
            </tr>
            <tr>
              <th>{tableData.getIn(["netIncome", "name"])}</th>
              <td>
                <NumberFormat
                  value={tableData.getIn(["netIncome", "value"])}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={value => <div>{value}</div>}
                ></NumberFormat>
              </td>
            </tr>
            <tr>
              <th>{tableData.getIn(["super", "name"])}</th>
              <td>
                <NumberFormat
                  value={tableData.getIn(["super", "value"])}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={value => <div>{value}</div>}
                ></NumberFormat>
              </td>
            </tr>
            <tr>
              <th>{tableData.getIn(["pay", "name"])}</th>
              <td>
                <NumberFormat
                  value={tableData.getIn(["pay", "value"])}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={value => <div>{value}</div>}
                ></NumberFormat>
              </td>
            </tr>
          </tbody>
        </Table>
        <Link to="/">
          <Button className="back" type="submit" onClick={handleBack}>
            Back
          </Button>
        </Link>
        <Link to="/" className="pay">
          <Button
            className="pay"
            type="submit"
            onClick={() => handleOnClick(tableData)}
          >
            Pay
          </Button>
        </Link>
      </StyledWrapper>
    );
  }
}
const mapState = state => ({
  tableData: state.getIn(["form", "tableData"]),
  validateComplete: state.getIn(["form", "Complete"])
});

const mapDispatch = dispatch => ({
  handleOnClick(tableData) {
    window.event.preventDefault();
    dispatch(actionCreators.postTable(tableData));
  },
  handleBack() {
    window.event.preventDefault();
    dispatch(actionCreators.triggerBack());
  }
});

export default connect(
  mapState,
  mapDispatch
)(PayrollTable);
