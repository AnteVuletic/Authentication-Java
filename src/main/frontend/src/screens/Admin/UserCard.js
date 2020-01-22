import React, { useState, useEffect, useCallback } from "react";
import { Card, Form, Button, ListGroup } from "react-bootstrap";

import {
  editUserSecurityProfile,
  getAllUserClaims,
  addClaim,
  deleteClaim
} from "../../services/common";
import { CardStyled, CardHeaderStyled } from "../index.styled";

const UserCard = ({ user, securityProfiles, setFilteredSecurityProfile }) => {
  const [selectedSecurityProfile, setSelectedSecurityProfile] = useState(
    user.securityProfile.securityProfileId
  );
  const [areClaimsDisplayed, setAreClaimsDisplayed] = useState(false);
  const [userClaims, setUserClaims] = useState([]);
  const [newClaim, setNewClaim] = useState("");

  const refreshUserClaims = useCallback(() => {
    getAllUserClaims({ userId: user.userId }).then(({ data }) =>
      setUserClaims(data)
    );
  }, [user.userId]);

  useEffect(() => {
    refreshUserClaims();
  }, [refreshUserClaims]);

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
    if (areClaimsDisplayed) {
      refreshUserClaims();
    }
  };

  const addNewClaim = () => {
    if (newClaim.length !== 0) {
      addClaim({ resourceId: newClaim }, user).then(() => {
        setNewClaim("");
        refreshUserClaims();
      });
    }
  };

  const deleteClaimOnIndex = index => {
    const claimToDelete = userClaims[index];
    deleteClaim(claimToDelete).then(() => {
      refreshUserClaims();
    });
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
        <Button variant="primary" onClick={handleSaveChanges}>
          Save
        </Button>
        <Button variant="info" onClick={toggleClaims}>
          Claims {areClaimsDisplayed ? "ᐯ" : "ᐱ"}
        </Button>
        {areClaimsDisplayed && (
          <ListGroup as="ul">
            {userClaims.map((claim, index) => (
              <ListGroup.Item as="li" key={index}>
                <span>ResourceId: {claim.resourceId}</span>
                <Button
                  variant="primary"
                  onClick={() => deleteClaimOnIndex(index)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
            <ListGroup.Item as="li">
              <Form.Group>
                <Form.Label>Claim new</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new claim name"
                  value={newClaim}
                  minLength="3"
                  onChange={({ target: { value } }) => setNewClaim(value)}
                />
                <Button variant="primary" onClick={addNewClaim}>
                  Add
                </Button>
              </Form.Group>
            </ListGroup.Item>
          </ListGroup>
        )}
      </CardStyled>
    </>
  );
};

export default UserCard;
