import React, { useState, useEffect } from "react";
import {
  getAllSecurityProfiles,
  getAllUsersBySecurityProfileId
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
    id !== "all" &&
      getAllUsersBySecurityProfileId(id).then(({ data }) => {
        setUsers(data);
      });
  };

  const setFilteredSecurityProfile = id => {
    _setFilteredSecurityProfile(id);
    refreshUsersBySecurityProfileId(id);
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
            <td colSpan="3">
              <input type="text" placeholder="search"></input>
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
            <UserCard
              key={index}
              user={user}
              securityProfiles={securityProfiles}
              setFilteredSecurityProfile={setFilteredSecurityProfile}
            />
          ))}
        </tbody>
      </Table>
    </ScreenContainer>
  );
};

export default Users;
