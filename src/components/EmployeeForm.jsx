import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/employeeForm/useForm";

const initialFValues = {
  // firstName: "",
  // lastName: "",
  // emailId: "",
  // mobile: "",
  // city: "",
  // salary: "",
  // designation: "",
  emailId: "",
  firstName: "",
  lastName: "",
  address: "",
  emergency_contact:"",
  role: "",
  type: "",
  billing_amount: "",
  address: "",
  mobile: "",
  membership_startdate:"",
  membership_enddate: "",
  body_weight: "",
  body_goal_type: "",
};

/**
 * @description Employee functional component to return Employee form Page
 * @param handlechange when the values changes in the form
 * @return Employee form page component
 */
export default function EmployeeForm(props) {
  const { addOrEdit, recordForEdit } = props;

  /**
   * @description Validates the form
   * @return Error if values have any error
   */
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    if ("emailId" in fieldValues)
      temp.emailId = /$^|.+@.+..+/.test(fieldValues.emailId)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile = /^[0-9]{10}$/.test(fieldValues.mobile) ? "" : "Exactly 10 numbers required.";
    if ("salary" in fieldValues)
      temp.salary =
      /^[0-9]{4,}$/.test(fieldValues.salary) ? "" : "Minimum Salary should be 1000.";
    if ("company" in fieldValues)
      temp.company = fieldValues.company ? "" : "This field is required.";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "This field is required.";
    if ("designation" in fieldValues)
      temp.designation = fieldValues.designation ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  /**
   * @description hadling on successful submit Employee form
   * @param e event
   * @return Employee data to Dashboard
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let employeeData = {
        firstName: values.firstName,
        lastName: values.lastName,
        emailId: values.emailId,
        company: values.company,
        mobile: values.mobile,
        designation: values.designation,
        salary: values.salary,
        city: values.city,
      };
      addOrEdit(employeeData, resetForm);
    }
  };

  /**
   * @description useEffect function used set values of employee
   */
  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      }); // eslint-disable-next-line
  }, [recordForEdit]);

  return (
    <Form data-testid="Form" onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            data-testid="FirstName"
          />
          <Controls.Input
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            data-testid="LastName"
          />
          <Controls.Input
            label="Email"
            name="emailId"
            value={values.emailId}
            onChange={handleInputChange}
            error={errors.emailId}
            data-testid="EmailID"
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
            data-testid="Mobile"
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
            data-testid="Address"
          />
          <Controls.Input
            label="Role"
            name="role"
            value={values.role}
            onChange={handleInputChange}
            data-testid="Role"
          />
          <Controls.Input
            name="Type"
            label="type"
            value={values.type}
            onChange={handleInputChange}
            error={errors.type}
            data-testid="Type"
          />
          <Controls.Input
            name="Billing_Amount"
            label="billing_amount"
            value={values.billing_amount}
            onChange={handleInputChange}
            error={errors.billing_amount}
            data-testid="Billing_Amount"
          />
          <div>
            <Controls.Button data-testid="Submit" type="submit" text="Submit" />
            <Controls.Button data-testid="Reset" text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
