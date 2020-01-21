import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { authenticate } from "../../services/common";

import { ScreenContainer } from "../index.styled";

const initialValues = {
  email: "",
  password: ""
};

const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const handleChange = event => {
    const newValues = { ...values };
    newValues[event.target.name] = event.target.value;
    setValues(newValues);
  };

  const handleLogin = async () => {
    try {
      await authenticate(values);
      setHasLoggedIn(true);
      console.log("success");
    } catch (err) {
      console.log(err);
      window.alert("Invalid credentials");
    }
  };

  if (hasLoggedIn) {
    return <Redirect to="/" />;
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
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form.Group>

        <Form.Group>
          <Form.Label>Don't have an account?</Form.Label>
        </Form.Group>
        <Form.Group>
          <Link to="./register">
            <Button variant="secondary">Register</Button>
          </Link>
        </Form.Group>
      </Form>
    </ScreenContainer>
  );
};

export default Login;
