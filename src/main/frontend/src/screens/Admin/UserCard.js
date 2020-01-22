import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { editUserSecurityProfile } from "../../services/common";
import { CardStyled, CardHeaderStyled } from "../index.styled";

const UserCard = ({ user, securityProfiles, setFilteredSecurityProfile }) => {
  const [selectedSecurityProfile, setSelectedSecurityProfile] = useState(
    user.securityProfile.securityProfileId
  );
  const [areClaimsDisplayed, setAreClaimsDisplayed] = useState(false);

  const handleSaveChanges = () => {
    const userNewSecurityProfile = securityProfiles.find(
      sp => sp.securityProfileId === Number(selectedSecurityProfile)
    );
    editUserSecurityProfile(user, userNewSecurityProfile).then(() => {
      setFilteredSecurityProfile(user.securityProfile.securityProfileId);
    });
  };

  const toggleClaims = () => {
    setAreClaimsDisplayed(!areClaimsDisplayed);
  };

  return (
    <>
      <CardStyled>
        <CardHeaderStyled>
          <div>
            <h2>Email:</h2>
            <h2>{user.email}</h2>
          </div>
          <div>
            <h2>First name:</h2>
            <h2>{user.firstName}</h2>
          </div>
          <div>
            <h2>Last name:</h2>
            <h2>{user.lastName}</h2>
          </div>
        </CardHeaderStyled>
        <Form>
          <Form.Label>Security profile</Form.Label>
          <Form.Control
            as="select"
            value={selectedSecurityProfile}
            onChange={e => {
              setSelectedSecurityProfile(e.target.value);
            }}
          >
            {securityProfiles.map((securityProfile, index) => (
              <option key={index} value={securityProfile.securityProfileId}>
                {securityProfile.name}
              </option>
            ))}
          </Form.Control>
        </Form>
        <div>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save
          </Button>
          <Button variant="info" onClick={toggleClaims}>
            Claims {areClaimsDisplayed ? "ᐯ" : "ᐱ"}
          </Button>
        </div>
      </CardStyled>
    </>
  );
};

export default UserCard;
