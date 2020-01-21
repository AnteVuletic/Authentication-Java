import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

const UserCard = ({ user, securityProfiles }) => {
  const [selectedSecurityProfile, setSelectedSecurityProfile] = useState(
    user.securityProfile.securityProfileId
  );
  const [areClaimsDisplayed, setAreClaimsDisplayed] = useState(false);

  const handleSaveChanges = () => {
    console.log(selectedSecurityProfile);
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
