import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../services/common";

import { ScreenContainer } from "../index.styled";

const validate = user => {
  const areAnyValuesMissing = Object.values(user).some(
    value => !value && value === ""
  );

  const passwordError = user.password !== user.repeatPassword ? 2 : 0;

  return areAnyValuesMissing ? 1 : passwordError;
};

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  firstName: "",
  lastName: ""
};

const Register = () => {
  const [values, setValues] = useState(initialValues);
  const [hasRegistered, setHasRegistered] = useState(false);

  const handleChange = event => {
    const newValues = { ...values };
    newValues[event.target.name] = event.target.value;
    setValues(newValues);
  };

  const handleSubmit = async () => {
    const validated = validate(values);
    if (validated === 1) {
      window.alert("All fields are required");
      return;
    }
    if (validated === 2) {
      window.alert("Passwords must match");
      return;
    }

    try {
      await register(values);
      setHasRegistered(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (hasRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <ScreenContainer>
      <Form>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Form.Group>

        <Form.Group>
          <Form.Label>Already have an account?</Form.Label>
        </Form.Group>
        <Form.Group>
          <Link to="./login">
            <Button variant="secondary">Login</Button>
          </Link>
        </Form.Group>
      </Form>
    </ScreenContainer>
  );
};

export default Register;
