import React, { useState, useEffect } from "react";
import {
  getAllSecurityProfiles,
  getAllUsersBySecurityProfileId
} from "../../services/common";
import { ScreenContainer, UsersWrapper } from "../index.styled";
import { Form } from "react-bootstrap";

import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredSecurityProfile, _setFilteredSecurityProfile] = useState(1);
  const [securityProfiles, setSecurityProfiles] = useState([]);

  useEffect(() => {
    getAllSecurityProfiles().then(({ data }) => {
      setSecurityProfiles(data);
      const securityProfile = data.find(sp => sp.name === "UserNotOwner");
      refreshUsersBySecurityProfileId(securityProfile.securityProfileId);
      _setFilteredSecurityProfile(securityProfile.securityProfileId);
    });
  }, []);

  const refreshUsersBySecurityProfileId = id => {
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
      <UsersWrapper>
        {users.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            securityProfiles={securityProfiles}
            setFilteredSecurityProfile={setFilteredSecurityProfile}
          />
        ))}
      </UsersWrapper>
    </ScreenContainer>
  );
};

export default Users;
