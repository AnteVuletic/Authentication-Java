import React, { useState } from "react";
import { getFilteredUsers } from "../../services/common";
import { ScreenContainer } from "../index.styled";
import { Table, Button } from "react-bootstrap";
import { useEffect } from "react";

const UserList = ({ usersToAdd, users, updateUsersToAdd }) => {
  const [filterEmail, setFilterEmail] = useState("");
  const [filterFirstName, setFilterFirstName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");
  const [usersFiltered, setUsersFiltered] = useState([]);

  useEffect(() => {
    getFilteredUsers({
      email: "",
      firstName: "",
      lastName: ""
    }).then(({ data }) =>
      setUsersFiltered(
        data.map(user => {
          return {
            ...user,
            checked: users.some(u => u.userId === user.userId)
          };
        })
      )
    );
  }, [users]);

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      getFilteredUsers({
        email: filterEmail,
        firstName: filterFirstName,
        lastName: filterLastName
      }).then(({ data }) =>
        setUsersFiltered(
          data.map(user => {
            return {
              ...user,
              checked: usersToAdd.some(u => u.userId === user.userId)
            };
          })
        )
      );
    }
  };

  const handleCheckUser = (value, userId) => {
    const userToAdd = usersToAdd.find(user => user.userId === userId);
    const filteredUser = usersFiltered.find(user => user.userId === userId);

    if (!userToAdd) {
      updateUsersToAdd([
        ...usersToAdd,
        { ...filteredUser, checked: !filteredUser.checked }
      ]);
    } else {
      updateUsersToAdd(
        usersToAdd.map(user => {
          if (user.userId === userToAdd.userId) {
            return {
              ...user,
              checked: !value
            };
          }
          return user;
        })
      );
    }

    setUsersFiltered(prev => {
      const newUsersFiltered = prev.filter(user => user.userId !== userId);

      return [...newUsersFiltered, { ...filteredUser, checked: !value }];
    });
  };

  return (
    <ScreenContainer>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>email</th>
            <th>first name</th>
            <th>last name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                placeholder="email"
                onKeyPress={handleKeyPress}
                value={filterEmail}
                onChange={e => setFilterEmail(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                type="text"
                placeholder="first name"
                onKeyPress={handleKeyPress}
                value={filterFirstName}
                onChange={e => setFilterFirstName(e.target.value)}
              ></input>
            </td>
            <td>
              <input
                type="text"
                placeholder="last name"
                onKeyPress={handleKeyPress}
                value={filterLastName}
                onChange={e => setFilterLastName(e.target.value)}
              ></input>
            </td>
          </tr>
          {usersFiltered.map((user, index) => (
            <tr key={index}>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleCheckUser(user.checked, user.userId)}
                >
                  {user.checked ? "-" : "+"}
                </Button>
              </td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScreenContainer>
  );
};

export default UserList;
