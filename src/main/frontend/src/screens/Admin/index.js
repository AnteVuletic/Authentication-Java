import React, { useEffect } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import { NavItem } from "../index.styled";
import { signout } from "../../utils/signout";
import Users from "./Users";
import Profiles from "./Profiles";
import Claims from "./Claims";

const AdminScene = ({ children, screenOnly }) => {
  const currentRoute = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  return (
    <div>
      <AdminNavbar />
      {!screenOnly && children}
    </div>
  );
};

const AdminNavbar = () => {
  return (
    <Navbar>
      <NavItem>
        <Link to="/admin/users">Users</Link>
      </NavItem>
      <NavItem>
        <Link to="/admin/profiles">Profiles</Link>
      </NavItem>
      <NavItem>
        <Link to="/admin/claims">Claims</Link>
      </NavItem>
      <NavItem>
        <Link to="/profile">Profile</Link>
      </NavItem>
      <NavItem onClick={signout}>
        <Button variant="primary">Sign out</Button>
      </NavItem>
    </Navbar>
  );
};

const isAdmin = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && token.length !== 0 && role && role === "SuperAdmin";
};

const Admin = () => {
  if (!isAdmin()) {
    return <Redirect to="/" />;
  }

  return (
    <Switch>
      <Route path="/admin/users">
        <AdminScene>
          <Users />
        </AdminScene>
      </Route>
      <Route path="/admin/profiles">
        <AdminScene>
          <Profiles />
        </AdminScene>
      </Route>
      <Route path="/admin/claims">
        <AdminScene>
          <Claims />
        </AdminScene>
      </Route>
      <Redirect to="/admin/users" />
    </Switch>
  );
};

export default Admin;
