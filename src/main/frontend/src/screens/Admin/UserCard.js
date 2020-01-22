import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

import { editUserSecurityProfile } from '../../services/common';

const UserCard = ({ user, securityProfiles, setFilteredSecurityProfile }) => {
  const [selectedSecurityProfile, setSelectedSecurityProfile] = useState(
    user.securityProfile.securityProfileId
  );
  const [areClaimsDisplayed, setAreClaimsDisplayed] = useState(false);

  const handleSaveChanges = () => {
    const userNewSecurityProfile = securityProfiles.find(sp => sp.securityProfileId === Number(selectedSecurityProfile));
    editUserSecurityProfile(user, userNewSecurityProfile)
    .then(() => {
      setFilteredSecurityProfile(user.securityProfile.securityProfileId)
    });
  };

  const toggleClaims = () => {
    setAreClaimsDisplayed(!areClaimsDisplayed);
  };

  return (
    <>
      <Card>
        <Card.Header>{user.email}</Card.Header>
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
        <Button variant="primary" onClick={handleSaveChanges}>
          Save
        </Button>
        <Button variant="info" onClick={toggleClaims}>
          Claims {areClaimsDisplayed ? "ᐯ" : "ᐱ"}
        </Button>
      </Card>
    </>
  );
};

export default UserCard;
