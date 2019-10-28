import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Wrapper from "./shared/Wrapper";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { Form, Col, InputGroup, Button } from "react-bootstrap";

const StyledInfoForm = styled(Wrapper)`
    padding: 2rem 3rem;
    border-radius: 1rem;
    text-align: center;
    margin-top: 100px
    display: grid;
    align-items: center;
    justify-content: center;
`;
class InfoForm extends Component {
  render() {
    const {
      validate,
      formData,
      validateComplete,
      handleValidate,
      handleSubmit,
      handleInputChange
    } = this.props;
    {
      if (validateComplete) {
        return <Redirect to="payslip" />;
      }
    }
    return (
      <StyledInfoForm>
        <h1>Customer Information</h1>
        <Form
          noValidate
          validated={validate}
          onSubmit={event => {
            handleValidate(event);
            handleSubmit(formData);
          }}
        >
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                onChange={handleInputChange("firstName")}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid firstname！
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                onChange={handleInputChange("lastName")}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid lastname!
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Salary</Form.Label>
              <InputGroup onChange={handleInputChange("salary")}>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>

                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Salary"
                  aria-describedby="inputGroupPrepend"
                  aria-describedby="inputGroupApend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid salary.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Super Rate</Form.Label>
              <InputGroup onChange={handleInputChange("superRate")}>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  min="1"
                  max="100"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Super Rate"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid super rate.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom05">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={handleInputChange("date")}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid date.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </StyledInfoForm>
    );
  }
}
const mapState = state => {
  return {
    validate: state.getIn(["form", "validated"]),
    formData: state.getIn(["form", "formData"]),
    validateComplete: state.getIn(["form", "Complete"])
  };
};
const mapDispatch = dispatch => {
  return {
    handleValidate(event) {
      const { currentTarget: form } = event;
      if (form.checkValidity() === false) {
        window.event.preventDefault();
        event.stopPropagation();
        dispatch(actionCreators.formValidate());
        dispatch(actionCreators.validateIncomplete());
      } else {
        dispatch(actionCreators.validateComplete());
      }
    },
    handleSubmit(formData) {
      window.event.preventDefault();
      dispatch(actionCreators.formSubmit(formData));
    },
    handleInputChange(key) {
      return event => {
        const {
          target: { value }
        } = event;
        dispatch(actionCreators.changeInputValue(key, value));
      };
    }
  };
};
export default connect(
  mapState,
  mapDispatch
)(InfoForm);
