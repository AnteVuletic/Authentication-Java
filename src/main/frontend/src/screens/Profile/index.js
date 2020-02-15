import React, { useEffect, useState } from 'react';
import { ScreenContainer, ModalContainer } from '../index.styled';
import { Modal, Button, Table } from "react-bootstrap";
import { getUserData, editUserData, changePassword } from "../../services/common";

const Profile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userId, setUserId] = useState('');
  const [lastName, setLastName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [securityProfile, setSecurityProfile] = useState([]);
  const [userClaims, setUserClaims] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserData().then(response => {
      setUserId(response.data.userId);
      setEmail(response.data.email);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setUserClaims(response.data.userClaims);
      setSecurityProfile(response.data.securityProfile)
    })
  }, [])

  const validateResetPassword = () => {
    if (newPassword !== repeatedPassword) {
      return 'Passwords must match';
    }
    return null;
  }

  const confirmChanges = () => {
    editUserData({ userId, email, firstName, lastName, userClaims, securityProfile }).then(response => {
      console.log(response);
    })
  }

  const confirmChangedPassword = () => {
    const errorMessage = validateResetPassword();

    setError(errorMessage)

    !errorMessage && changePassword(userId, oldPassword, newPassword).then(response => {
      setIsModalOpen(false);
    });
  }

  return (
    <ScreenContainer className="w-50 m-auto">
      <Table className="w-100">
        <tbody>
          <tr className="d-flex justify-content-center">
            <td>User details</td>
          </tr>
          <tr>
            <td className="d-flex justify-content-between" >
              <span>Id:</span>
              <span>{userId}</span>
            </td>
          </tr>
          <tr>
            <td className="d-flex justify-content-between">
              <span>email:</span>
              <input type="text" value={email} onChange={e => { setEmail(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td className="d-flex justify-content-between">
              <span>first name:</span>
              <input type="text" value={firstName} onChange={e => { setFirstName(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td className="d-flex justify-content-between">
              <span>last name:</span>
              <input type="text" value={lastName} onChange={e => { setLastName(e.target.value) }} />
            </td>
          </tr>
          <tr>
            <td className="d-flex justify-content-between">
              <Button onClick={() => confirmChanges()}>Confirm changes</Button>
              <Button onClick={() => setIsModalOpen(true)}>Change password</Button>
            </td>
          </tr>
          <tr className="d-flex justify-content-center">
            <td>Claims</td>
          </tr>
          {userClaims && userClaims.map((claim, index) => (
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
          <Modal.Header className="d-flex justify-content-center">
            <Modal.Title>Change password</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-center">
            <Table>
              <tbody>
                <tr>
                  <td>
                    Current password:
                  </td>
                  <td>
                    <input type="password" onChange={e => { setOldPassword(e.target.value) }} />
                  </td>
                </tr>
                <tr>
                  <td>
                    New password:
                  </td>
                  <td>
                    <input type="password" onChange={e => { setNewPassword(e.target.value) }} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Repeat new password:
                  </td>
                  <td>
                    <input type="password" onChange={e => { setRepeatedPassword(e.target.value) }} />
                  </td>
                </tr>
                {error && <tr>
                  <td>
                    {error}
                  </td>
                </tr>}
              </tbody>
            </Table>
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