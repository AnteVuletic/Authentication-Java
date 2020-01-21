import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { NavItem } from "../index.styled";

import Users from "./Users";
import Profiles from "./Profiles";

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
    </Navbar>
  );
};

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    try {
      console.log("async check is admin");
    } catch (err) {
      console.log(err);
      setIsAdmin(false);
    }
  }, []);

  if (!isAdmin) {
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
      <Redirect to="/admin/users" />
    </Switch>
  );
};

export default Admin;
