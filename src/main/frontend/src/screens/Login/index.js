import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authenticate } from "../../services/common";
import { history } from "../../utils/BrowserHistoryWrapper";
import { ScreenContainer } from "../index.styled";
import { loginRegisterTest } from "../../utils/loginRegisterTest";

const initialValues = {
  email: "",
  password: ""
};

const redirect = role => {
  if (role === "SuperAdmin") {
    history.push("/admin");
  } else {
    history.push("/");
  }
};

const Login = () => {
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    const newValues = { ...values };
    newValues[event.target.name] = event.target.value;
    setValues(newValues);
  };

  const handleLogin = async () => {
    try {
      const response = await authenticate(values.email, values.password);
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      localStorage.setItem("role", response.data.role);
      window.location.reload();
    } catch (err) {
      window.alert("Invalid credentials");
    }
  };

  if (loginRegisterTest()) {
    return redirect(localStorage.getItem("role"));
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
