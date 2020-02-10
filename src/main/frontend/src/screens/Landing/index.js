import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Button } from "react-bootstrap";
import { loginRegisterTest } from '../../utils/loginRegisterTest'
import { signout } from '../../utils/signout';

const Landing = () => {
  const [shouldShowLoginOrRegister] = useState(loginRegisterTest())

  return (
    <div>
      <Navbar bg="light">
        {!shouldShowLoginOrRegister && (
          <>
            <NavItem>
              <Link to="./login">Login</Link>
            </NavItem>
            <NavItem>
              <Link to="./register" style={{marginLeft: '10px'}}>Register</Link>
            </NavItem>
          </>
        )}
        {shouldShowLoginOrRegister && (
          <NavItem onClick={signout}>
            <Button variant="primary">Sign out</Button>
          </NavItem>
        )}
      </Navbar>
    </div>
  );
};

export default Landing;
