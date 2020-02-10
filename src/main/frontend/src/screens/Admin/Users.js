import React, { useState, useEffect } from "react";
import {
  getAllSecurityProfiles,
  getAllUsersBySecurityProfileId,
  getFilteredUsers
} from "../../services/common";
import { ScreenContainer } from "../index.styled";
import { Form, Table } from "react-bootstrap";

import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredSecurityProfile, _setFilteredSecurityProfile] = useState(
    "all"
  );
  const [securityProfiles, setSecurityProfiles] = useState([]);
  const [filterEmail, setFilterEmail] = useState("");
  const [filterFirstName, setFilterFirstName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");

  useEffect(() => {
    getAllSecurityProfiles().then(({ data }) => {
      setSecurityProfiles(data);
    });
  }, []);

  useEffect(() => {
    if (filteredSecurityProfile === "all") {
      getAllUsers();
    }
  }, [filteredSecurityProfile]);

  const getAllUsers = async () => {
    const { data } = await getAllSecurityProfiles();

    const allUsers = await Promise.all(
      data.map(async securityProfile => {
        const users = await getAllUsersBySecurityProfileId(
          securityProfile.securityProfileId
        );

        return users.data;
      })
    );

    setUsers(allUsers.flat());
  };

  const refreshUsersBySecurityProfileId = id => {
    setFilterEmail("");
    setFilterFirstName("");
    setFilterLastName("");

    id !== "all" &&
      getAllUsersBySecurityProfileId(id).then(({ data }) => {
        setUsers(data);
      });
  };

  const setFilteredSecurityProfile = id => {
    _setFilteredSecurityProfile(id);
    refreshUsersBySecurityProfileId(id);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      getFilteredUsers({
        email: filterEmail,
        firstName: filterFirstName,
        lastName: filterLastName
      }).then(res => setUsers(res.data));
    }
  };

  return (
    <ScreenContainer>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>email</th>
            <th>first name</th>
            <th>last name</th>
            <th>security profile</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="email"
                onKeyPress={handleKeyPress}
                value={filterEmail}
                onChange={e => setFilterEmail(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                type="text"
                placeholder="first name"
                onKeyPress={handleKeyPress}
                value={filterFirstName}
                onChange={e => setFilterFirstName(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                type="text"
                placeholder="last name"
                onKeyPress={handleKeyPress}
                value={filterLastName}
                onChange={e => setFilterLastName(e.target.value)}
              ></input>
            </td>
            <td>
              <Form.Control
                as="select"
                value={filteredSecurityProfile}
                onChange={e => {
                  setFilteredSecurityProfile(e.target.value);
                }}
              >
                <option value="all">all users</option>
                {securityProfiles.map((securityProfile, index) => (
                  <option key={index} value={securityProfile.securityProfileId}>
                    {securityProfile.name}
                  </option>
                ))}
              </Form.Control>
            </td>
          </tr>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </tbody>
      </Table>
    </ScreenContainer>
  );
};

export default Users;
