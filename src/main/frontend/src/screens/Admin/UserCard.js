import React, { useState, useEffect } from "react";

import { getAllUserClaims, getAllClaims } from "../../services/common";

import { Modal, Button } from "react-bootstrap";

import { ModalContainer, ClaimSpacer, ClaimItem } from "../index.styled";

const UserModal = ({ user, userClaims, handleClose }) => {
  const [newClaims, setNewClaims] = useState(userClaims);
  const [availableClaims, setAvailableClaims] = useState([]);

  useEffect(() => {
    const allClaims = getAllClaims(); //TODO Edit

    const available = allClaims.filter(
      claim => !newClaims.some(c => c.claimId === claim.claimId)
    );

    setAvailableClaims(available);
  }, [newClaims]);

  const addClaim = e => {
    const newClaimId = +e.target.value;

    if (newClaimId === "none") {
      return;
    }

    const claimToAdd = availableClaims.find(
      claim => claim.claimId === newClaimId
    );

    setNewClaims(prev => {
      return [...prev, claimToAdd];
    });
  };

  const removeClaim = claimId => {
    setNewClaims(prev => prev.filter(claim => claim.claimId !== claimId));
  };

  const updateUserClaims = () => {
    console.log("update", user.email);
    console.log(newClaims);
  };

  return (
    <ModalContainer>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{user.email}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul>
            <ClaimSpacer>Claims</ClaimSpacer>
            {newClaims.map((claim, index) => (
              <ClaimItem key={index}>
                <Button
                  variant="danger"
                  onClick={() => removeClaim(claim.claimId)}
                >
                  X
                </Button>
                <p>{claim.name}</p>
              </ClaimItem>
            ))}
            <select onChange={addClaim}>
              <option value="none" selected>
                Add claim
              </option>
              {availableClaims.map(claim => (
                <option key={claim.claimId} value={claim.claimId}>
                  {claim.name}
                </option>
              ))}
            </select>
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
          <Button variant="primary" onClick={updateUserClaims}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </ModalContainer>
  );
};

const UserCard = ({ user }) => {
  const [areClaimsDisplayed, setAreClaimsDisplayed] = useState(false);
  const [userClaims, setUserClaims] = useState([]);

  // const refreshUserClaims = useCallback(() => {
  //   getAllUserClaims({ userId: user.userId }).then(({ data }) =>
  //     setUserClaims(data)
  //   );
  // }, [user.userId]);

  useEffect(() => {
    getAllUserClaims({ userId: user.userId }).then(({ data }) =>
      setUserClaims(data)
    );
  }, [user.userId]);

  const toggleClaims = () => {
    setAreClaimsDisplayed(!areClaimsDisplayed);
  };

  return (
    <>
      {areClaimsDisplayed && (
        <UserModal
          user={user}
          userClaims={userClaims}
          handleClose={toggleClaims}
        />
      )}
      <tr>
        <td>{user.email}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.securityProfile.name}</td>
        <td>
          <Button variant="secondary" onClick={toggleClaims}>
            Claims
          </Button>
        </td>
      </tr>
    </>
  );
};

export default UserCard;
