import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { getAllSecurityProfiles, getAllUsersBySecurityProfileId } from "../../services/common";
import { ScreenContainer } from "../index.styled";
import { Form } from "react-bootstrap";

import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredSecurityProfile, _setFilteredSecurityProfile] = useState(1);
  const [securityProfiles, setSecurityProfiles] = useState([]);

  useEffect(() => {
    getAllSecurityProfiles().then(({ data }) => {
      setSecurityProfiles(data);
      const securityProfile = data.find(
        sp => sp.name === "UserNotOwner"
      );
      setFilteredSecurityProfile(securityProfile.securityProfileId);
    });
  }, []);

  const setFilteredSecurityProfile = id => {
    _setFilteredSecurityProfile(id);
    getAllUsersBySecurityProfileId(id).then(({ data }) => {
      setUsers(data);
    })
  }

  return (
    <ScreenContainer>
      <Form>
        <Form.Label>Security profile</Form.Label>
        <Form.Control
          as="select"
          value={filteredSecurityProfile}
          onChange={e => {
            setFilteredSecurityProfile(e.target.value);
          }}
        >
          {securityProfiles.map((securityProfile, index) => (
            <option key={index} value={securityProfile.securityProfileId}>
              {securityProfile.name}
            </option>
          ))}
        </Form.Control>
      </Form>
      <Accordion>
        {users.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            securityProfiles={securityProfiles}
          />
        ))}
      </Accordion>
    </ScreenContainer>
  );
};

export default Users;
