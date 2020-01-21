import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { getAllSecurityProfiles } from "../../services/common";
import { ScreenContainer } from "../index.styled";

import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([
    {
      email: "test@test.com",
      securityProfile: { securityProfileId: 2, name: "test2" }
    }
  ]);
  const [securityProfiles, setSecurityProfiles] = useState([
    { securityProfileId: 1, name: "test" },
    { securityProfileId: 2, name: "test2" },
    { securityProfileId: 3, name: "test3" }
  ]);

  useEffect(() => {});
  useEffect(() => {});

  return (
    <ScreenContainer>
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
