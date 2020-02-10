import React, { useEffect, useState } from 'react';
import { ScreenContainer, ModalContainer } from '../index.styled';
import { Modal, Button, Table } from "react-bootstrap";
import { getUserData } from "../../services/common";

const Profile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [userClaims, setUserClaims] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState('');

  useEffect(() => {
    getUserData().then(response => {
      console.log(response);
    })
  }, [])

  const confirmChanges = () => {
    //edit proper user request
  }

  const confirmChangedPassword = () => {
    //change password request
  }

  return (
    <ScreenContainer>
      <Table>
        <tbody>
          <tr>
            <td>
              <input type="text" value={email} onChange={e => { setEmail(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" value={firstName} onChange={e => { setFirstName(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" value={lastName} onChange={e => { setLastName(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td>
              <Button onClick={() => confirmChanges}>Confirm changes</Button>
            </td>
            <td>
              <Button onClick={() => setIsModalOpen(true)}>Change password</Button>
            </td>
          </tr>
          <tr><td>Claims</td></tr>
          {userClaims.map((claim, index) => (
            <tr key={index}>
              <td>
                <span>{claim.name}</span>
                <p>{claim.description}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isModalOpen && <ModalContainer>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Change password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <tr>
              <td>
                Current password:
              </td>
            </tr>
            <tr>
              <td>
                <input type="password" onChange={e => { setOldPassword(e.target.value) }} />
              </td>
            </tr>
            <tr>
              <td>
                New password:
              </td>
            </tr>
            <tr>
              <td>
                <input type="password" onChange={e => { setNewPassword(e.target.value) }} />
              </td>
            </tr>
            <tr>
              <td>
                Repeat new password:
              </td>
            </tr>
            <tr>
              <td>
                <input type="password" onChange={e => { setRepeatedPassword(e.target.value) }} />
              </td>
            </tr>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">
              Close
          </Button>
            <Button variant="primary" onClick={() => confirmChangedPassword()}>
              Save
          </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </ModalContainer>}
    </ScreenContainer>
  );
}

export default Profile;