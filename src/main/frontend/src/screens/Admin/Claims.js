import React, { useState, useEffect } from "react";
import {
  getAllClaims,
  addClaim,
  getUsersByClaimId,
  addUserClaim,
  deleteUserClaim
} from "../../services/common";
import { ScreenContainer, ModalContainer, AltModal } from "../index.styled";
import { Table, Button, Modal } from "react-bootstrap";
import UserList from "./UserList";

const AddClaimModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddClaim = () => {
    addClaim({ name, description });
    onClose();
    window.location.reload();
  };

  return (
    <ModalContainer>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add claim</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table>
            <tr>
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
              </td>
              <td>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </td>
            </tr>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
          <Button variant="primary" onClick={handleAddClaim}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </ModalContainer>
  );
};

const UsersModal = ({ claim, onClose }) => {
  const [users, setUsers] = useState([]);
  const [usersToAdd, setUsersToAdd] = useState([]);

  useEffect(() => {
    getUsersByClaimId(+claim.claimId).then(({ data }) => {
      setUsers(data);
      setUsersToAdd(data);
    });
  }, [claim.claimId]);

  const handleUpdateUsers = users => {
    setUsersToAdd(users);
  };

  const addUsersToClaim = async () => {
    console.log(users)
    console.log(usersToAdd)
    const usersToRemove = users.filter(user =>
      usersToAdd.some(u => u.userId === user.userId && !u.checked && u.checked !== undefined)
    );
    const toAdd = usersToAdd.filter(
      user => !users.some(u => u.userId === user.userId)
    );

    console.log('remove', usersToRemove)
    console.log('add', toAdd)

    await Promise.all(
      usersToRemove.map(async user => await deleteUserClaim({ claim, user }))
    );

    await Promise.all(
      toAdd.map(async user => await addUserClaim({ claim, user }))
    );

    onClose();
    window.location.reload();
  };

  return (
    <ModalContainer>
      <AltModal>
        <Modal.Header>
          <Modal.Title>Add users to {claim.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UserList
            usersToAdd={usersToAdd}
            users={users}
            updateUsersToAdd={handleUpdateUsers}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
          <Button variant="primary" onClick={addUsersToClaim}>
            Save changes
          </Button>
        </Modal.Footer>
      </AltModal>
    </ModalContainer>
  );
};

const ClaimCard = ({ claim }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => {
    setIsModalActive(prev => !prev);
  };

  return (
    <>
      {isModalActive && <UsersModal claim={claim} onClose={toggleModal} />}
      <tr>
        <td>{claim.name}</td>
        <td>{claim.description}</td>
        <td>
          <Button variant="secondary" onClick={toggleModal}>
            Add users
          </Button>
        </td>
      </tr>
    </>
  );
};

const Claims = () => {
  const [allClaims, setAllClaims] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    getAllClaims().then(({ data }) => {
      setAllClaims(data);
    });
  }, []);

  const toggleModal = () => {
    setIsModalActive(prev => !prev);
  };

  return (
    <>
      {isModalActive && <AddClaimModal onClose={toggleModal} />}
      <ScreenContainer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>
                <Button variant="primary" onClick={toggleModal}>
                  Add claim
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {allClaims.map(claim => (
              <ClaimCard key={claim.claimId} claim={claim} />
            ))}
          </tbody>
        </Table>
      </ScreenContainer>
    </>
  );
};

export default Claims;
